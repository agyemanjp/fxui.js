import type { ArrayRecursive, Rec } from "@agyemanjp/standard"
import type { UIElement } from "./element/common"

export type Component<P extends Rec> = ((args: ComponentArgs<P>, setProps?: (delta: Partial<P>, refreshUI?: boolean) => void) => UIElement) & ComponentOptions<P>
export type ComponentStateless<Props extends Rec> = ((args: ComponentArgs<Props>) => UIElement) & ComponentOptions<Props>

export type ComponentArgs<Props extends Rec> = Props & StdEltProps & { children?: Children }
export type ComponentOptions<P extends Rec> = {
	defaultProps?: Partial<P>,
	stateful?: boolean
	pure?: boolean
}

// export type Fragment = typeof Fragment
export const Fragment = ""

export type Children = UIElement | ArrayRecursive<UIElement> // No generic param since children can be of various types

export type StdEltProps = { id?: string, "data-peer-id"?: string/*, [k: string]: unknown*/ }

// export type SetStateFn<P extends Rec> = (newState: Partial<P>) => void
