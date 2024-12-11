import { assert, keys, stringify, type Rec } from "@agyemanjp/standard"

import { isIntrinsicElt, isProperElt, isValueElt, type IntrinsicElement, type ValueElement } from "../element/common"
import { attributeConversions, booleanAttributes } from "./_attribs"
import { stringifyStyle } from "./_styles"
import { isEventKey, type EventHandler } from "./_events"
import { svgTags } from "./_tags"

/** Create a shallow DOM element based on the passed intrinsic element or primitive value.
 * @returns A non-text DOM element (without children) when passed an intrinsic element (that possibly has children); 
 * A text DOM element when passed a primitive value
 */
export function createDOMShallow(eltUI: LeafElement): DOMElement | DocumentFragment | Text {
	// console.log(`Starting createDomShallow()`)
	// if (isProperElt(eltUI) && "onClick" in eltUI.props) {
	// 	console.log(`Starting createDomShallow() for ${stringify(eltUI)}`)
	// }

	const domElt = (isIntrinsicElt(eltUI)
		? (() => {
			const domElt = (svgTags.includes(eltUI.type.toUpperCase())
				? document.createElementNS('http://www.w3.org/2000/svg', eltUI.type)
				: eltUI.type === ""
					? document.createDocumentFragment()
					: document.createElement(eltUI.type)
			)

			const props = eltUI.props ?? {}
			if (domElt instanceof DocumentFragment) {
				assert(Object.keys(props).length === 0, `One or more props found for fragment: ${JSON.stringify(Object.keys(props))} `)
			}
			else {
				for (const key of Object.keys(props)) {
					setAttribute({
						domElt,
						attribName: key,
						attribVal: (props as Rec)[key]
					})
				}
			}

			return domElt
		})()

		: document.createTextNode(globalThis.String(eltUI ?? ""))
	)

	// if (isProperElt(eltUI) && "onClick" in eltUI.props) {
	// 	console.log(`Resulting DOM element: ${domElt}, onclick = ${(domElt as HTMLButtonElement).onclick}`)
	// }
	return domElt
}

/** Set a property on a DOM element to a value, in a DOM-idiomatic way. */
export function setAttribute(args: { domElt: DOMElement, attribName: string, attribVal: unknown }) {
	// console.log(`Starting setAttribute(${stringify(args)})`)

	const { domElt, attribName, attribVal } = args
	// if (typeof value === "string" && value.toUpperCase() === "UNDEFINED") console.log(`Setting ${key} to ${value}`)
	try {
		if (attribVal === undefined && !booleanAttributes.includes(attribName.toUpperCase())) {
			// console.warn(`Ignored setting ${attributeName} on <${element.tagName}> to undefined`)
			return
		}

		if (["CLASSNAME", "CLASS"].includes(attribName.toUpperCase())) {
			if (typeof attribVal === "string") {
				// The class attribute is set with setAttribute(). This approach:
				// avoids manipulating classList, which is cumbersome to reset, and not fully supported in all browsers
				// avoids setting className directly, since that works better for SVG elements,
				// avoids a type error, since Typescript (incorrectly) types className as read-only 
				domElt.setAttribute('class', attribVal)
			}
			else {
				console.warn(`Ignored setting class attribute on <${domElt.tagName}> to non-string value ${attribVal}`)
			}
		}
		else if (attribName.toUpperCase() === 'STYLE') {
			if (typeof attribVal === 'object') {
				// The style (replaced with {} if null) is set with setAttribute(). This approach:
				// avoids a type error with setting style directly, since Typescript (incorrectly) types style as a read-only 
				// avoids updating individual style properties directly, since the value argument should entirely replace any previous styles, and it is cumbersome to remove existing syle properties 
				// avoids merging the incoming value with existing styles, since the value argument should entirely replace any previous styles
				domElt.setAttribute('style', stringifyStyle(attribVal ?? {}))
				// console.log(`Style property on <${element.tagName}> set to '${stringifyStyle(value ?? {})}'`)
			}
			else {
				console.trace(`Ignored setting style attribute on <${domElt.tagName}> to non-object value ${attribVal}`)
			}
		}
		else if (typeof attribVal === 'function' && isEventKey(attribName)) {
			// const eventName = eventNames[key.toUpperCase() as keyof typeof eventNames];
			(domElt as any)[attribName.toLowerCase()] = (attribVal as EventHandler)
			// console.log(`Set event property ${attribName.toLowerCase()} on ${domElt} to ${attribVal.name}`)
		}
		else {
			const effectiveVal = (booleanAttributes.includes(attribName.toUpperCase())
				? !([undefined, null, false] as unknown[]).includes(attribVal)
				: attribVal
			)

			if (svgTags.includes(domElt.tagName.toUpperCase()) && !["function", "object"].includes(typeof effectiveVal)) {
				const effectiveKey = (keys(attributeConversions).includes(attribName.toLowerCase())
					? attributeConversions[attribName.toLowerCase()]
					: attribName
				)
				assert(effectiveKey, `effectiveKey does not exist`)
				// if (key.toUpperCase() === "ID") console.log(`Setting ${effectiveKey} to ${effectiveVal}`)
				domElt.setAttribute(effectiveKey, String(effectiveVal))
			}
			else {
				// For string/true values, first use setAttribute, for a few cases not handled properly by the assignment that follows
				if (typeof effectiveVal === "string" || effectiveVal === true) {
					domElt.setAttribute(attribName, String(effectiveVal))
				}

				// The <attribName> property on the element is set directly to <effectiveVal>, except for certain attributes. 
				// This approach works for 'CHECKED', 'VALUE', and 'HTMLFOR' properties, and for null & function values
				// It also avoids incorrectly setting the property to a string form of the value
				// We assume <attribName> has correct case, e.g., preserveAspectRatio, viewBox, fillRule, readOnly, etc.
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				if (!["list"].includes(attribName)) {
					(domElt as any)[attribName] = effectiveVal
				}
			}
		}
	}
	catch (e) {
		console.trace(`Error setting "${attribName}" on <${domElt.tagName}> to "${stringify(attribVal)}:\n${e}`)
	}
}

export const isTextDOM = (node: Node): node is Text => node.nodeType === Node.TEXT_NODE

/** Empty a node of child nodes */
export function emptyContainer(container: Node) {
	container.textContent = ""
}

/** Get ids of peak DOM elements among a list of elements in a tree */
export function getApexElementIds(elementIds: string[]): string[] {
	return elementIds.filter(id => {
		let parent = document.getElementById(id)?.parentElement
		while (parent) {
			if (elementIds.includes(parent.id)) { return false }
			parent = parent.parentElement
		}
		return true
	})
}
/** Get peak DOM elements among a list of elements in a tree */
export function getApexElements(elements: DOMElement[]): DOMElement[] {
	return elements.filter(elt => {
		let parent = elt.parentElement
		while (parent) {
			if (elements.includes(parent)) { return false }
			parent = parent.parentElement
		}
		return true
	})
}

export type LeafElement = IntrinsicElement | ValueElement
export type DOMElement = SVGElement | HTMLElement


// export const isAugmentedDOM = (node: Node): node is DOMAugmented => node.nodeType === Node.ELEMENT_NODE && "renderTrace" in node
