
import { stringify, type ArgsType } from "@agyemanjp/standard"

import { createElement, isProperElt, type UIElement } from "../../"
import type { ComponentArgs, Component } from "../../common"
import type { HtmlProps, LayoutProps } from "../common"
import type { CSSProperties } from "../../html"

import { StackPanel } from "../panels/_stack"


export function View<T>(props: ComponentArgs<ViewProps<T>>) {

	const {
		sourceData,
		orientation,
		itemsAlignV,
		itemsAlignH,
		itemStyle,
		style,
		children, // children will be ignored, should not be passed
		...htmlProps
	} = props
	// console.log(`SOURCE DATA: ${stringify(sourceData)}`)

	const ItemTemplate = props.itemTemplate ?? (_ =>
		<div style={_.style}>{String(_.value ?? "")}</div>
	)
	const Layout = props.layout ?? StackPanel

	return <Layout
		orientation={orientation}
		itemsAlignH={itemsAlignH}
		itemsAlignV={itemsAlignV}
		style={style}
		{...htmlProps}>

		{[...sourceData].map((datum, index) => <ItemTemplate value={datum} index={index}
			style={{ height: "auto", width: "auto", ...itemStyle }}
		/>)}
	</Layout>
}
export type ViewProps<T = unknown> = LayoutProps & {
	sourceData: Iterable<T>
	layout?: Component<LayoutProps & HtmlProps>,
	itemTemplate?: Component<{ value: T, index: number, style?: CSSProperties, children?: never }>
	itemStyle?: CSSProperties,
	style?: CSSProperties
	children?: never
}

export function ViewSelectable<T>(props: ArgsType<Component<ViewSelectableProps<T>>>[0], setProps: ArgsType<Component<ViewSelectableProps<T>>>[1]) {
	const {
		sourceData,
		orientation,
		itemsAlignV,
		itemsAlignH,
		selectedItemStyle,
		itemStyle,
		style,
		children, // children ignored, should not be passed
		...htmlProps
	} = props
	console.log(`htmlProps for ViewSelectable: ${stringify(htmlProps)}`)

	const selectedIndex = props.selectedIndex ?? 0
	const ItemTemplate = props.itemTemplate ?? defaultViewItemTemplates.forAny satisfies (typeof props)["itemTemplate"]
	const Layout = props.layout ?? StackPanel

	return <Layout
		orientation={orientation}
		itemsAlignH={itemsAlignH}
		itemsAlignV={itemsAlignV}
		style={style}
		{...htmlProps}>

		{[...sourceData].map((datum, index) => <ItemTemplate
			value={datum}
			selected={index === selectedIndex}
			onClick={ev => {
				// console.log(`Setting selected index to ${index}`)
				setProps?.({ selectedIndex: index })
				props.onSelectionChanged?.(index)
			}}
			style={{
				cursor: "pointer",
				...itemStyle,
				...index === selectedIndex
					? selectedItemStyle
					: {}
			}}
		/>)}
	</Layout>
}
export type ViewSelectableProps<T = unknown> = LayoutProps & {
	sourceData: Iterable<T>
	selectedIndex?: number
	onSelectionChanged?: (index: number) => void
	layout?: Component<LayoutProps & HtmlProps>,
	itemTemplate?: Component<{
		value: T,
		selected: boolean,
		onClick?: HtmlProps["onClick"],
		style?: CSSProperties,
		children?: never
	}>
	itemStyle?: CSSProperties,
	selectedItemStyle?: CSSProperties,
	style?: CSSProperties
	children?: never
}

export const defaultViewItemTemplates = {
	forAny: function <T>(args: { value: T, onClick?: HtmlProps["onClick"], style?: CSSProperties, selected: boolean }) {
		const { value, onClick, style, selected } = args
		return <div onClick={onClick} style={style}>
			{isProperElt(value as UIElement) ? value as UIElement : String(value ?? "")}
		</div>
	},

	forJSX: function <T>(args: { value: UIElement, onClick?: HtmlProps["onClick"], style?: CSSProperties, selected: boolean }) {
		const { value, onClick, style, selected } = args
		return <div onClick={onClick} style={style}>{value}</div>
	}
}



// this should succeed type-checking
// const elt1 = <View sourceData={[1, 2, 3]} itemsPanel={StackPanel}></View>

// this should fail type-checking because the View component does not accept children
// const elt2 = <View sourceData={[1, 2, 3]} itemsPanel={StackPanel}><div /></View>


