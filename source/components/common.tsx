
import { mergeDeep } from "@agyemanjp/standard/object"
import type { Component } from "../common"
import { createElement, isComponentElt, isIntrinsicElt, normalizeChildren, type UIElement } from "../element/common"
import type { CSSProperties, HTMLAttributes, SVGAttributes } from "../html"

export type HtmlProps<E extends HTMLElement = HTMLElement> = Partial<HTMLAttributes<E>>
export type LayoutProps = Partial<{
	itemsAlignH: "start" | "end" | "center" | "stretch" | "uniform" | "dock",
	itemsAlignV: "start" | "end" | "center" | "stretch" | "uniform" | "dock",
	orientation: "vertical" | "horizontal"
}>
export type StyleProps = { style?: CSSProperties }

export type Icon = Component<SVGProps>
export type SVGProps = SVGAttributes<SVGGElement>

export function createIcon(elt: UIElement<SVGProps>): Icon {
	const defaults = {
		preserveAspectRatio: "xMidYMid meet",
		fill: "currentColor",
		style: {
			height: "1em",
		},
	}

	return (props) => {
		if (isIntrinsicElt(elt) || isComponentElt(elt)) {
			const { children, ...svgProps } = mergeDeep()(
				defaults,
				(elt?.props ?? {}),
				props
			)

			return createElement("svg", { ...svgProps }, ...(normalizeChildren(elt?.children)))
		}
		// biome-ignore lint/style/noUselessElse: <explanation>
		else {
			return elt
		}
	}
}


