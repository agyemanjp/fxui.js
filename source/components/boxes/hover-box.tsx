
import { createElement } from "../../"
import { normalizeChildren } from "../../element"
import { getIdUnique, mergeDeep } from "@agyemanjp/standard"
import type { Component, ComponentArgs } from "../../common"
import { type CSSProperties, stringifyStyle } from "../../html"
import type { HtmlProps } from "../common"


export const HoverBox: Component<HoverBoxProps> = (props) => {
	const defaultProps = {
		style: {
			display: "inline-block",
			padding: "0",
			margin: "0"
		} as CSSProperties,
		hoverStyle: {},
		id: getIdUnique()
	} satisfies Partial<HoverBoxProps>

	const className__ = getIdUnique()

	const { id, children, hoverStyle, style, ...htmlProps } = mergeDeep()(defaultProps, props) as ComponentArgs<Required<HoverBoxProps>>
	const child = normalizeChildren(children)[0]

	const styleContent = `.${className__}:hover {${stringifyStyle({ ...hoverStyle }, true)}}`
	// console.log(`style content: ${styleContent}`)

	return <div id={id} style={{ ...style }} {...htmlProps} className={className__}>
		<style>{styleContent}</style>
		{child ?? ""}
	</div>
}
HoverBox.pure = true

export type HoverBoxProps = HtmlProps & {
	hoverStyle?: CSSProperties
}


// // this should succeed type-checking
// const elt1 = <HoverBox />
// const elt2 = <HoverBox><div /></HoverBox>

// // this should fail type-checking because the HoverBox component does not accept multiple children
// const elt3 = <HoverBox><div /><div /></HoverBox>
