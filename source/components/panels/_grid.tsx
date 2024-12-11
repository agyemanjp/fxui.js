import type { Component } from "../../common"
import { createElement } from "../../"
import type { LayoutProps, HtmlProps } from "../common"
import { StackPanel } from "./_stack"

export const GridPanel: Component<LayoutProps & HtmlProps> = function (props) {
	const { style, children, ...restOfProps } = props
	return <StackPanel {...restOfProps} style={{ ...style, flexWrap: 'wrap' }}>
		{children}
	</StackPanel>
}

GridPanel.pure = true


// type RowOrColumnInfo = CSSLength | "none" | "auto" | "max-content" | "min-content" | "initial" | "inherit"
// const elt = createElement(StackPanel, { itemsAlignH: "stretch", x: 1 }, createElement("div", {}))
// const elt1 = createElement(StackPanel, { itemsAlignHX: "stretch" }, createElement("div", {}))
// const x = <div />
// const y = <StackPanel />