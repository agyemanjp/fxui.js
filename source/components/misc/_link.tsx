import { hasValue } from "@agyemanjp/standard"

import type { Component } from "../../common"
import type { HtmlProps, Icon, LayoutProps } from "../common"
import { type UIElement, createElement } from "../../element"
import type { CSSProperties } from "../../html"
import { StackPanel } from "../panels"


export const LinkUI: Component<LinkInfo & HtmlProps> = (args) => {
	const { before, url, anchor, after, orientation, itemsAlignH, itemsAlignV, style, ...htmlProps } = args

	const getEltForContent = (content?: LinkContent): UIElement => {
		if (!hasValue(content))
			return ""
		else if (typeof content === "string")
			return content
		else
			switch (content.type) {
				case "image": return <img src={content.url} style={{ ...content.style }} />
				case "icon": return <content.icon style={{ ...content.style }} />
				case "elt": return content.elt
			}
	}

	return <StackPanel orientation={orientation}
		itemsAlignH={itemsAlignH ?? "center"} itemsAlignV={itemsAlignV ?? "center"}
		style={{ gap: "0.3rem", ...style }} {...htmlProps}>

		{getEltForContent(before)}
		<a href={url}>{getEltForContent(anchor)}</a>
		{getEltForContent(after)}
	</StackPanel>
}

export type LinkInfo = {
	url: string,
	anchor: LinkContent,
	before?: LinkContent
	after?: LinkContent
	orientation?: LayoutProps["orientation"]
	itemsAlignH?: LayoutProps["itemsAlignV"]
	itemsAlignV?: LayoutProps["itemsAlignH"]
}

type LinkContent = string | (
	| { type: "image", url: string, style?: CSSProperties }
	| { type: "icon", icon: Icon, style?: CSSProperties }
	| { type: "elt", elt: JSX.Element }
)