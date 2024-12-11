import type { Component } from "../../common"
import { createElement } from "../../"
import type { LayoutProps, HtmlProps } from "../common"

export type LayersPanelProps = LayoutProps & HtmlProps & {

}

export const LayersPanel: Component<LayersPanelProps> = function (props) {
	const {
		orientation,
		itemsAlignH,
		itemsAlignV,
		children,
		style,
		id,
		...htmlProps
	} = props

	const alignItems = () => {
		switch (orientation === "vertical" ? (itemsAlignH) : (itemsAlignV)) {
			case "start":
				return "flex-start"
			case "end":
				return "flex-end"
			case "center":
				return "center"
			case "stretch":
				return "stretch"
			default:
				return "initial"
		}
	}
	const justifyContent = () => {
		switch (orientation === "vertical" ? (itemsAlignV) : (itemsAlignH)) {
			case "start":
				return "flex-start"
			case "end":
				return "flex-end"
			case "center":
				return "center"
			case "uniform":
				return "space-evenly"
			case "dock":
				return "space-between"
			default:
				return "initial"
		}
	}

	// console.log(`Rendering StackPanel, id = ${id}, props = ${stringify(props)}`)

	return <div
		id={id} {...htmlProps}
		style={{
			...style,
			display: "flex",
			flexDirection: orientation === "vertical" ? "column" : "row",
			justifyContent: justifyContent(),
			alignItems: alignItems()
		}}>

		{children}

	</div>
}

LayersPanel.pure = true


// const elt = createElement(StackPanel, { itemsAlignH: "stretch", x: 1 }, createElement("div", {}))
// const elt1 = createElement(StackPanel, { itemsAlignHX: "stretch" }, createElement("div", {}))

// const x = <div />

// const y = <StackPanel />