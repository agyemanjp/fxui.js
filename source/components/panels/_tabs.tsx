import { type OmitX, mergeDeep, type RecursivePartial, omit, assert } from "@agyemanjp/standard"

import { createElement } from "../../"
import type { HtmlProps, Icon } from "../common"
import type { Component } from "../../common"
import { normalizeChildren, type ProperElement } from "../../element"
import { defaultViewItemTemplates, ViewSelectable, type ViewSelectableProps } from "../misc"
import { StackPanel } from "./_stack"

export const TabsPanel: Component<Props> = (props, setProps) => {
	const defaultProps = {
		selectedIndex: 0,
		headersInfo: {
			itemStyle: {
				padding: "0rem",
				paddingLeft: "0px",
				marginRight: "0.5em",
				fontVariant: "all-small-caps",
				textDecoration: "underline"
			},
			selectedItemStyle: {
				fontWeight: "bold"
			}
		}
	} satisfies RecursivePartial<Props>

	const {
		headersInfo,
		style,
		selectedIndex,
		children,
		...htmlProps
	} = mergeDeep()(defaultProps, props) as Required<typeof props>

	const normedChildren = normalizeChildren(children)
	const headerElement = <ViewSelectable data-key="headers"
		{...omit(headersInfo, "itemTemplate")}
		itemTemplate={_ => {
			return typeof _.value === "string"
				? defaultViewItemTemplates.forAny(_)
				: defaultViewItemTemplates.forJSX({
					..._,
					value: <StackPanel style={{ gap: "0.25rem" }}>
						{<_.value.icon />}
						{_.value.title}
					</StackPanel>
				})
		}}
		onSelectionChanged={(idx) => { setProps?.({ selectedIndex: idx }) }}
	/> as ProperElement

	return <StackPanel orientation={"vertical"} style={{ gap: "1rem", ...style }} {...htmlProps}>
		{props.headerTemplate
			? props.headerTemplate({ headerElement })
			: headerElement
		}
		<div>{normedChildren[selectedIndex]}</div>
	</StackPanel>
}

export type Props = HtmlProps & {
	headersInfo: OmitX<
		ViewSelectableProps<string | { title: string, icon: Icon }>,
		"selectedIndex" | "onSelectionChanged" | "children"
	>
	headerTemplate?: Component<{ headerElement: ProperElement }>
	selectedIndex?: number
	onSelectionChanged?: (index: number) => void
}


TabsPanel.pure = true

