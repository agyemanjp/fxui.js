import { isFunction, assert } from "@agyemanjp/standard"
import type { StdEltProps } from "../common"
import type { ComponentElement, ProperElement } from "./common"

/** Generates a stable instance id for a component element in a specific position */
export function getCompInstanceId<P extends StdEltProps>(args: { elt: ComponentElement<P>, position: UITreePosition }) {
	const { elt, position } = args
	const effectiveTag = isFunction(elt.type) ? elt.type.name : elt.type
	return `${effectiveTag}-${getEffectiveHtmlId({ elt, position })}-${position.intrinsificationIndex}`
}

/** Generates a stable html id for a proper element in a specific position */
export function getEffectiveHtmlId<P extends StdEltProps>(args: { elt: ProperElement<P>, position?: UITreePosition }) {
	const { elt, position } = args
	const { id: customId, "data-peer-id": peerId } = elt.props
	return customId ?? (position ? `${position.parentChildPath.join(".")}.${peerId ?? position.siblingOrdinalIndex}` : undefined)
}

/** Extracts the HTML element id from a component instance id */
export function instanceToHtmlId(compInstanceId: string) {
	const id = compInstanceId.split("-")[1]
	return (assert(id, `Id does not exist`), id)
}

/** Set html id on a proper element, if passed, and not already set */
export function injectHtmlId<Elt extends ProperElement>(elt: Elt, htmlId?: string): Elt {
	return elt.type !== "" && htmlId ? { ...elt, props: { id: htmlId, ...elt.props } } : elt
}

export const INITIAL_UI_TREE_POSITION = {
	parentChildPath: [],
	siblingOrdinalIndex: 0,
	intrinsificationIndex: 0
} satisfies UITreePosition

export type UITreePosition = {
	/** Array of sibling indexes indicating path from root to parent element in UI tree */
	parentChildPath: number[]

	siblingOrdinalIndex: number
	intrinsificationIndex: number
}