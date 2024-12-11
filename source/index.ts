export * from "./element"
export * from "./html"
export * from "./common"
export * from './components'

import type { IntrinsicTags } from "./html"
import type { UIElement } from "./element"

declare global {
	export namespace JSX {
		/** JSX Element */
		type Element = | UIElement //| UIElement[]

		/** Important for type-checking JSX children properly */
		interface ElementChildrenAttribute {
			// biome-ignore lint/complexity/noBannedTypes: <explanation>
			children: {} // specify children name to use
		}

		/** Intrinsic HTML Elements */
		interface IntrinsicElements extends IntrinsicTags { }
	}
}
