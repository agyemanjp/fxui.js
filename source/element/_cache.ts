import { type Rec, getIdUnique } from "@agyemanjp/standard"
import type { UITreePosition } from "./_identity"
import type { ComponentElement, UIElement } from "./common"
import type { StdEltProps } from "../common"

/** Get component instances cache, used for retaining comp elt state aross renders, and memoizing comp elt invocations.
 * Stored in document object, hence not used on server, since UI is constructed from scratch on each request
 */
export function getCache(): ComponentInstancesCache | undefined {
	return typeof document === "undefined"
		? undefined

		: (() => {
			const _document = document as unknown as Rec
			const cacheId = COMPONENT_INSTANCES_CACHE_ID
			if (_document[cacheId] === undefined) {
				_document[cacheId] = {}
			}
			return _document[cacheId] as ComponentInstancesCache
		})()
}

export const COMPONENT_INSTANCES_CACHE_ID = getIdUnique()

export type ComponentInstancesCache = Rec<ComponentInstanceInfo>

export type ComponentInstanceInfo<P extends StdEltProps = StdEltProps> = {
	/** Position this instance id represents */
	pos: UITreePosition,

	/** Element inhabiting this position */
	elt: ComponentElement<P>,

	/** Last result of executing element */
	result?: UIElement
}
