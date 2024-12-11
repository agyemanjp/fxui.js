import { getIdUnique, mergeDeep, stringify } from "@agyemanjp/standard"

import { createElement, Fragment } from "../.."
import type { Component } from "../../common"
import type { HtmlProps, Icon, LayoutProps } from "../common"
import type { CSSProperties, ButtonHTMLAttributes } from "../../html"
import { StackPanel } from "../panels/_stack"


export const CmdButton: Component<CommandBoxProps> = (props) => {
	const defaultProps = {
		id: getIdUnique(),
		orientation: "horizontal" as Required<CommandBoxProps>["orientation"],
		iconPlacement: "before" as Required<CommandBoxProps>["iconPlacement"],
		style: {
			overflow: "hidden",
			// lineHeight: "1.1em",
			// padding: "0.25em",
			// margin: "0.5em",
			// marginLeft: "0",
			// borderRadius: "0.2em",
			// color: "#444444",
			// backgroundColor: "white",
			// borderWidth: "thin",
			// borderStyle: "solid",
			// cursor: "pointer"
		} as CSSProperties
	} as const satisfies Partial<CommandBoxProps>

	const {
		id,
		orientation,
		iconPlacement,
		icon: Icon,
		style,
		children,
		...htmlProps
	} = mergeDeep()(defaultProps, props)

	// console.log(`RestOfProps for CommandBox: ${stringify(htmlProps)}`)

	return <button {...htmlProps} style={{ ...style }}>
		<StackPanel
			orientation={orientation}
			itemsAlignV="center"
			style={{ height: "100%", padding: "0.1rem", gap: "0.25rem" }}>
			{Icon
				? iconPlacement === "before"
					? <><Icon style={{}} />{children ?? ""}</>
					: <>{children ?? ""}<Icon style={{}} /></>
				: children
			}
		</StackPanel>

	</button>
}

export type CommandBoxProps = Partial<HtmlProps & ButtonHTMLAttributes<unknown>> & {
	icon?: Icon
	iconPlacement?: "before" | "after"
	orientation?: LayoutProps["orientation"]
}

CmdButton.pure = true
