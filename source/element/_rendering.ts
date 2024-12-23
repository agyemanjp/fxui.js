import { default as morph } from "morphdom"
import { indexed, hasValue, prependIfNotEmpty, assert, deepEquals, type ArgsType, type Rec } from "@agyemanjp/standard"

import type { StdEltProps } from "../common"
import { type DOMElement, createDOMShallow, isTextDOM, stringifyAttributes, selfClosingTags, eventNames } from "../html"
import { type UIElement, isProperElt, getChildren, isIntrinsicElt, type ComponentElement, type IntrinsicElement, type ProperElement, type ValueElement, isFragmentElt } from "./common"
import { type UITreePosition, getCompInstanceId, getEffectiveHtmlId, INITIAL_UI_TREE_POSITION, injectHtmlId, instanceToHtmlId } from "./_identity"
import { getCache, type ComponentInstanceInfo } from "./_cache"

export function mountElement(uiElt: UIElement, domContainerElt: HTMLElement) {
	const domElt = render(uiElt)
	assert(domElt, `Result of render is undefined; should be DOM element`)
	morph(domContainerElt, domElt)
}

/** Renders an UI element to a DOM node */
export function render<T extends StdEltProps>(elt: UIElement<T>, position?: UITreePosition): DOMElement | DocumentFragment | Text | undefined {
	if (elt === undefined) return undefined
	if (typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
		console.warn("render(): Input element with props has undefined type property")
	}

	const pos = position ?? INITIAL_UI_TREE_POSITION
	const leaf = isProperElt(elt) ? getLeaf(elt, pos) : elt
	const dom = createDOMShallow(leaf)

	if (isTextDOM(dom) === false) {
		const children = getChildren(leaf)
		// for (const indexedChild of indexed(filter(children, ["by-typeguard", hasValue]))) {
		for (const indexedChild of indexed(children)) {
			const [idx, child] = indexedChild
			const renderedChild = render(child, {
				parentChildPath: [...pos.parentChildPath, pos.siblingOrdinalIndex],
				siblingOrdinalIndex: idx,
				intrinsificationIndex: 0
			})
			if (renderedChild) dom.appendChild(renderedChild)
		}
	}

	return dom
}

/** Renders an UI element to an html string */
export function renderToString<P extends Rec>(elt: UIElement<P>, position?: UITreePosition): string {
	if (hasValue(elt) && typeof elt === "object" && "props" in elt && "children" in elt && typeof elt.type === "undefined") {
		console.warn("Object appearing to represent proper element has no type member\nThis is likely an error arising from creating an element with an undefined component",)
		return globalThis.String(elt)
	}

	// const pos = position ?? { parentChildPath: [], siblingOrdinalIndex: 0, intrinsificationIndex: 0 }
	const leaf = isProperElt(elt) ? getLeaf(elt, position) : elt

	return (isIntrinsicElt(leaf)
		? (() => {
			const children = getChildren(leaf)
			const attributesHtml = prependIfNotEmpty(stringifyAttributes(leaf.props), " ")
			const childrenHtml = () => children
				.map((child, idx) => renderToString(child, position ? {
					parentChildPath: [...position.parentChildPath, position.siblingOrdinalIndex],
					siblingOrdinalIndex: idx,
					intrinsificationIndex: 0
				} : undefined))
				.join("")

			const coreHTML = (hasValue(leaf.type, "deep")
				? selfClosingTags.includes(leaf.type.toUpperCase()) && children.length === 0
					? `<${leaf.type}${attributesHtml}/>`
					: `<${leaf.type}${attributesHtml}>${childrenHtml()}</${leaf.type}>`
				: `${childrenHtml()}`
			)

			console.assert(typeof coreHTML === "string", `coreHTML is not a string`)
			return coreHTML
		})()

		: globalThis.String(leaf ?? "")
	)
}

/** Get leaf of input element, by recursively executing it as far as possible, and injecting standard attributes.
 * @argument position — Position of input element in UI tree. Always passed (even on server, 
 * for identifying component instances that state changes would later apply to in-browser)
 * @returns An intrinsic or value element that is the leaf of the input element
 */
export function getLeaf<P extends Rec>(elt: ProperElement<P>, position?: UITreePosition): IntrinsicElement | ValueElement {
	assert(isProperElt(elt) !== undefined, `getLeaf(): Input element is not a proper element`)

	const origId = elt.props["id"]
	const htmlId = getEffectiveHtmlId({ elt, position })
	if (origId) assert(htmlId === origId, `Original Id not equal to effective Id`)
	// console.log(`Effective html Id = "${htmlId}"`)

	if (isIntrinsicElt(elt)) {
		const injected = injectHtmlId(elt, htmlId)

		assert(isIntrinsicElt(injected), `Intrinsic element no longer intrinsic after id injection`)
		if (origId) {
			assert("id" in injected.props && injected.props["id"] === origId, `Intrinsic element lost original id after injection`)
		}

		return injected
	}

	const cache = getCache()
	const instanceId = position ? getCompInstanceId({ elt, position }) : undefined
	const entry = instanceId ? cache?.[instanceId] : undefined

	const { intrinsificationIndex, parentChildPath, siblingOrdinalIndex } = position ?? {}
	// if (elt.props.id) assert(elt.props.id === htmlId, `Custom id not preserved in calculating html id`)
	const effElt = {
		...elt,
		props: {
			...elt.type.defaultProps ?? {},
			...entry?.elt.props ?? {},
			...elt.props,
			...htmlId ? { id: htmlId } : {}
		}
	} satisfies ComponentElement<P>
	const getResult = () => executeCompElement(effElt, instanceId)

	if (origId === "core-page-ui") {
		assert("id" in effElt.props && effElt.props.id === "core-page-ui", `Effective elt does not have original id`)
		// console.log(`Returning elt props after id injection: ${stringify(elt.props)}`)
	}

	const isPureComp = effElt.type.pure ?? true
	const isMatchingElts = deepEquals(effElt, entry?.elt)
	const resultElt = (cache && position && instanceId
		? (isPureComp && isMatchingElts && entry?.result)
			? entry?.result!
			: (cache[instanceId] = {
				pos: position,
				elt: effElt satisfies ComponentElement<P> as unknown as ComponentElement,
				result: getResult()
			}, cache[instanceId]?.result!)
		: getResult()
	)

	// Apply getLeaf even if resultElt is intrinsic, since we need to inject id, etc.
	const ret = isProperElt(resultElt)
		? getLeaf(
			injectHtmlId(resultElt, htmlId),
			position && intrinsificationIndex
				? { ...position, intrinsificationIndex: intrinsificationIndex + 1 }
				: undefined
		)

		: resultElt

	if (isProperElt(ret) && !isFragmentElt(ret) && origId) {
		assert("id" in ret.props && ret.props.id === origId, `getLeaf result lost original id`)
	}

	return ret
}

/** Execute component element, with an optional instance id for injecting a setProps argument */
function executeCompElement<P extends StdEltProps>(elt: ComponentElement<P>, compInstanceId?: string) {
	const effectiveSetPropsFunction: ArgsType<typeof elt.type>[1] = (compInstanceId
		? (newPropsDelta, refreshUI) => setProps(compInstanceId, newPropsDelta, refreshUI)
		: undefined
	)
	return elt.type({ ...elt.props, children: elt.children }, effectiveSetPropsFunction)
}

/** Update properties of element referenced by the input instance id with input delta, and optionally refresh UI */
function setProps<P extends Rec>(compInstanceId: string, newPropsDelta: Partial<P>, refreshUI = true) {
	// console.log(`Starting setProps to ${stringify(newPropsDelta)} on ${elt.type.name}`)

	const cache = getCache()
	// console.log(`Comp Instance Cache keys: ${(Object.keys(cache ?? {}))}`)

	const entry = cache?.[compInstanceId] as ComponentInstanceInfo<P> | undefined
	assert(entry, `Cache entry does not exist`)
	// console.log(`Instance cache entry: ${JSON.stringify(entry)}`)

	// Update element props (and thus update cache entry as well)
	const updatedElt = updateProps(entry.elt, newPropsDelta)
	assert(updatedElt !== undefined, `Updated element is undefined`)
	// console.log(`updatedElt = ${stringify(updatedElt)}`)

	// (Re)Render updated (cache entry) element if desired
	if (refreshUI) {
		const htmlId = instanceToHtmlId(compInstanceId)
		const container = (assert(document, `Document object, needed for re-render, not found`), document.getElementById(htmlId))
		assert(container, `Container to target for re-render does not exist`)
		// console.log(`Container target for re-rendering elt for instance id "${compInstanceId}": ${(container)}`)

		const dom = render(updatedElt, entry.pos)
		if (dom) morph(container, dom, {
			onBeforeElUpdated: (fromEl, toEl) => {
				// force event handlers to be transferred from fromEl to toEl
				for (const eventName of eventNames) {
					if (typeof toEl[eventName] === "function") {
						fromEl[eventName] = toEl[eventName] as any
					}
				}
				return true
			}
			// onElUpdated: (_) => { console.log(`${_.tagName} morphed`) }
		})
	}
	else {
		const leaf = getLeaf(updatedElt, entry.pos)
	}
}

/** Merge new partial props over existing props of a proper element */
function updateProps<Elt extends ProperElement<P>, P extends StdEltProps>(elt: Elt, newPropsDelta: Partial<P>): Elt {
	return elt.type !== ""
		? { ...elt, props: { ...elt.props, ...newPropsDelta } }
		: elt
}

/** Merge new partial props over existing props of a proper element */
/*function updateProps<Elt extends ProperElement<P>, P extends StdEltProps>(elt: Elt, newPropsDelta: RecursivePartial<P>): Elt {
	return elt.type !== ""
		? mergeDeep()(elt, newPropsDelta) as Elt //{ ...elt, props: { ...elt.props, ...newPropsDelta } }
		: elt
}*/

/** Re-renders part of the UI represented by input element; For execution on browser only */
/*export function refresh(instanceId: string): void {
	const container = (assert(document, `document does not exist`), document.getElementById(instanceToHtmlId(instanceId)))
	assert(container, `Container does not exist`)

	const entry = getCache()?.[instanceId]
	assert(entry, `Entry does not exist`)

	entry.result = undefined // invalidate cached result, if present
	const dom = render(entry.elt, entry.pos)

	morph(container, dom)
}*/

/*export function hydrate(domElt: DOMElement) {
	// const domElt = render(elt)
	// if (isTextDOM(domElt)) return
	for (const eventName in eventNames) {
		const v = (domElt.removeEventListener())[eventName]
	}
}*/

// entry.result = undefined // invalidate cached result, if present
// entry.elt.props = { ...entry.elt.props, ...newPropsDelta } // update props
