import { type Rec, isObject, isString, isFunction, flat } from "@agyemanjp/standard"
import type { StdEltProps, Component, Children } from "../common"

/** General UI element type */
export type UIElement<P extends Rec = Rec> = ProperElement<P> | ValueElement /*FragmentElement |*/
export type ProperElement<P extends Rec = Rec> = ComponentElement<P> | IntrinsicElement<P>

/** UI element that is a simple value */
export type ValueElement = string | undefined //| Object | bigint | symbol | boolean

/** UI element that is intrinsic to the engine */
export type IntrinsicElement<P extends StdEltProps = StdEltProps> = UIElementBase<P> & { type: string }

/** UI element that specifies a component invocation 
 * A component element can produce another UI element, recursively,
 * until an intrinsic/value element is obtained, at which point we can generate DOM from it
 */
export type ComponentElement<P extends StdEltProps = StdEltProps> = UIElementBase<P> & { type: Component<P> }

export type UIElementBase<P extends StdEltProps = StdEltProps> = {
	props: P,
	children?: Children
}


/** JSX is transformed into calls of this function */
export function createElement<P extends Rec>(type: string, props: P, ...children: UIElement[]): IntrinsicElement<P>
export function createElement<P extends Rec>(type: Component<P>, props: P, ...children: UIElement[]): ComponentElement<P>
export function createElement<P extends Rec>(type: string | Component<P>, props?: P, ...children: unknown[]) {
	if (typeof type !== "string" && typeof type !== "function") {
		console.trace(`createElement(): Type argument has invalid type ${typeof type}`)
	}
	return typeof type === 'string'
		? { type, props: props ?? {}, children: (children ?? []).flat() } as IntrinsicElement
		: { type, props: props ?? {}, children: (children ?? []).flat() } as ComponentElement<P>
}

/** Gets children of input element as a flat elements array  */
export function getChildren(elt: UIElement): UIElement<Rec<unknown, string>>[] {
	return isProperElt(elt) ? normalizeChildren(elt.children) : []
}
/** Converts input children into a flat array of elements  */
export function normalizeChildren(children?: Children): UIElement<Rec<unknown, string>>[] {
	return children === undefined
		? []
		: Array.isArray(children)
			? [...flat(children)]
			: [children]
}

export const isValueElt = (elt: UIElement): elt is ValueElement => typeof elt === "string" || typeof elt === "undefined"
export const isProperElt = <P extends Rec>(elt?: UIElement<P>): elt is (IntrinsicElement<P> | ComponentElement<P>) => (isObject(elt) && (isString(elt.type) || isFunction(elt.type)))
export const isIntrinsicElt = <P extends Rec>(elt: UIElement<P>): elt is IntrinsicElement<P> => isProperElt(elt) && typeof elt.type === "string"
export const isComponentElt = <P extends Rec>(elt: UIElement<P>): elt is ComponentElement<P> => isProperElt(elt) && typeof elt.type !== "string"

export const isFragmentElt = (elt: UIElement): boolean => isIntrinsicElt(elt) && elt.type === ""
