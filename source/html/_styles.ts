import { dashCase } from "@agyemanjp/standard"

/** Converts a CSS props object literal to a string */
export function stringifyStyle(style: CSSProperties, important = false): string {
	return (typeof style === "object")
		? Object.keys(style)
			.map((key) => `${dashCase(key)}: ${(style)[key as keyof typeof style]}${important === true ? " !important" : ""}`)
			.join("; ")
		// .concat(";")

		: ""
}

export const colorConstants = {
	"aliceblue": "#f0f8ff",
	"antiquewhite": "#faebd7",
	"aqua": "#00ffff",
	"aquamarine": "#7fffd4",
	"azure": "#f0ffff",
	"beige": "#f5f5dc",
	"bisque": "#ffe4c4",
	"black": "#000000",
	"blanchedalmond": "#ffebcd",
	"blue": "#0000ff",
	"blueviolet": "#8a2be2",
	"brown": "#a52a2a",
	"burlywood": "#deb887",
	"cadetblue": "#5f9ea0",
	"chartreuse": "#7fff00",
	"chocolate": "#d2691e",
	"coral": "#ff7f50",
	"cornflowerblue": "#6495ed",
	"cornsilk": "#fff8dc",
	"crimson": "#dc143c",
	"cyan": "#00ffff",
	"darkblue": "#00008b",
	"darkcyan": "#008b8b",
	"darkgoldenrod": "#b8860b",
	"darkgray": "#a9a9a9",
	"darkgreen": "#006400",
	"darkkhaki": "#bdb76b",
	"darkmagenta": "#8b008b",
	"darkolivegreen": "#556b2f",
	"darkorange": "#ff8c00",
	"darkorchid": "#9932cc",
	"darkred": "#8b0000",
	"darksalmon": "#e9967a",
	"darkseagreen": "#8fbc8f",
	"darkslateblue": "#483d8b",
	"darkslategray": "#2f4f4f",
	"darkturquoise": "#00ced1",
	"darkviolet": "#9400d3",
	"deeppink": "#ff1493",
	"deepskyblue": "#00bfff",
	"dimgray": "#696969",
	"dodgerblue": "#1e90ff",
	"firebrick": "#b22222",
	"floralwhite": "#fffaf0",
	"forestgreen": "#228b22",
	"fuchsia": "#ff00ff",
	"gainsboro": "#dcdcdc",
	"ghostwhite": "#f8f8ff",
	"gold": "#ffd700",
	"goldenrod": "#daa520",
	"gray": "#808080",
	"green": "#008000",
	"greenyellow": "#adff2f",
	"honeydew": "#f0fff0",
	"hotpink": "#ff69b4",
	"indianred ": "#cd5c5c",
	"indigo": "#4b0082",
	"ivory": "#fffff0",
	"khaki": "#f0e68c",
	"lavender": "#e6e6fa",
	"lavenderblush": "#fff0f5",
	"lawngreen": "#7cfc00",
	"lemonchiffon": "#fffacd",
	"lightblue": "#add8e6",
	"lightcoral": "#f08080",
	"lightcyan": "#e0ffff",
	"lightgoldenrodyellow": "#fafad2",
	"lightgrey": "#d3d3d3",
	"lightgreen": "#90ee90",
	"lightpink": "#ffb6c1",
	"lightsalmon": "#ffa07a",
	"lightseagreen": "#20b2aa",
	"lightskyblue": "#87cefa",
	"lightslategray": "#778899",
	"lightsteelblue": "#b0c4de",
	"lightyellow": "#ffffe0",
	"lime": "#00ff00",
	"limegreen": "#32cd32",
	"linen": "#faf0e6",
	"magenta": "#ff00ff",
	"maroon": "#800000",
	"mediumaquamarine": "#66cdaa",
	"mediumblue": "#0000cd",
	"mediumorchid": "#ba55d3",
	"mediumpurple": "#9370d8",
	"mediumseagreen": "#3cb371",
	"mediumslateblue": "#7b68ee",
	"mediumspringgreen": "#00fa9a",
	"mediumturquoise": "#48d1cc",
	"mediumvioletred": "#c71585",
	"midnightblue": "#191970",
	"mintcream": "#f5fffa",
	"mistyrose": "#ffe4e1",
	"moccasin": "#ffe4b5",
	"navajowhite": "#ffdead",
	"navy": "#000080",
	"oldlace": "#fdf5e6",
	"olive": "#808000",
	"olivedrab": "#6b8e23",
	"orange": "#ffa500",
	"orangered": "#ff4500",
	"orchid": "#da70d6",
	"palegoldenrod": "#eee8aa",
	"palegreen": "#98fb98",
	"paleturquoise": "#afeeee",
	"palevioletred": "#d87093",
	"papayawhip": "#ffefd5",
	"peachpuff": "#ffdab9",
	"peru": "#cd853f",
	"pink": "#ffc0cb",
	"plum": "#dda0dd",
	"powderblue": "#b0e0e6",
	"purple": "#800080",
	"rebeccapurple": "#663399",
	"red": "#ff0000",
	"rosybrown": "#bc8f8f",
	"royalblue": "#4169e1",
	"saddlebrown": "#8b4513",
	"salmon": "#fa8072",
	"sandybrown": "#f4a460",
	"seagreen": "#2e8b57",
	"seashell": "#fff5ee",
	"sienna": "#a0522d",
	"silver": "#c0c0c0",
	"skyblue": "#87ceeb",
	"slateblue": "#6a5acd",
	"slategray": "#708090",
	"snow": "#fffafa",
	"springgreen": "#00ff7f",
	"steelblue": "#4682b4",
	"tan": "#d2b48c",
	"teal": "#008080",
	"thistle": "#d8bfd8",
	"tomato": "#ff6347",
	"turquoise": "#40e0d0",
	"violet": "#ee82ee",
	"wheat": "#f5deb3",
	"white": "#ffffff",
	"whitesmoke": "#f5f5f5",
	"yellow": "#ffff00",
	"yellowgreen": "#9acd32"
} satisfies Record<string, string>


export type CSSProperties = { [k in keyof _CSSProperties]: string /*CSSProperty<_CSSProperties[k]>*/ }
export type CSSProperty<T> = T | "inherit" | "initial" | "revert" | "unset"

interface _CSSProperties {
	alignContent?: (
		| "center"
		| "start"
		| "end"
		| "flex-start"
		| "flex-end"
		| "normal"
		| "baseline"
		| "first baseline"
		| "last baseline"
		| "space-between"
		| "space-around"
		| "space-evenly"
		| "stretch"
		| "safe center"
		| "unsafe center"
	)
	alignItems?: (
		| "normal"
		| "stretch"
		| "center"
		| "start"
		| "end"
		| "flex-start"
		| "flex-end"
		| "baseline"
		| "first baseline"
		| "last baseline"
		| "safe center"
		| "unsafe center"
	)
	alignSelf?: (
		| "auto"
		| "normal"
		| "center"
		| "start"
		| "end"
		| "self-start"
		| "self-end"
		| "flex-start"
		| "flex-end"
		| "baseline"
		| "first baseline"
		| "last baseline"
		| "stretch"
		| "safe center"
		| "unsafe center"
	)
	alignmentBaseline?: (
		| "auto"
		| "baseline"
		| "before-edge"
		| "text-before-edge"
		| "middle"
		| "central"
		| "after-edge"
		| "text-after-edge"
		| "ideographic"
		| "alphabetic"
		| "hanging"
		| "mathematical"
		| "top"
		| "center"
		| "bottom"
	)
	all?: (CSSProperty<"revert-layer">)
	animation?: (
		`${string} ${number} ${(
			| "normal"
			| "reverse"
			| "alternate"
			| "alternate-reverse"
		)} ${(
			| "none"
			| "forward"
			| "backward"
			| "both"
		)} ${(
			| "running"
			| "paused"
		)}`
	)
	animationDelay?: string
	animationDirection?: "normal" | "reverse" | "alternate" | "alternate-reverse"
	animationDuration?: string
	animationFillMode?: "none" | "forward" | "backward" | "both"
	animationIterationCount?: "infinite" | number
	animationName?: string
	animationPlayState?: "running" | "paused"
	animationTimingFunction?: CSSEasingFunction
	backfaceVisibility?: "visible" | "hidden"

	/** Sets all background style properties at once, such as color, image, origin and size, or repeat method.
	 * Component properties not set in the background shorthand property value declaration are set to their default values.
	 */
	background?: string

	backgroundAttachment?: "scroll" | "fixed" | "local"
	backgroundClip?: "border-box" | "padding-box" | "content-box" | "text"
	backgroundColor?: CSSColor
	backgroundImage?: `url(${string})`
	backgroundOrigin?: "border-box" | "padding-box" | "content-box"
	backgroundPosition?: (
		| "top"
		| "right"
		| "bottom"
		| "left"
		| "center"
		| string
	)
	backgroundPositionX?: (
		| "left"
		| "center"
		| "right"
		| CSSLength
		| `${"right" | "left"} ${string}`
	)
	backgroundPositionY?: (
		| "left"
		| "center"
		| "right"
		| CSSLength
		| `${"right" | "left"} ${string}`
	)
	backgroundRepeat?: (
		| "repeat-x"
		| "repeat-y"
		| "repeat"
		| "space"
		| "round"
		| "no-repeat"
	)
	backgroundSize?: (
		| "auto"
		| "cover"
		| "contain"
		| string
	)
	baselineShift?: CSSLength | `${number}%` | "sub" | "super" | "baseline" | "top" | "text-top" | "middle" | "bottom" | "text-bottom"

	border?: CSSBorder
	borderSpacing?: CSSLength
	borderStyle?: CSSBorderStyle
	borderWidth?: CSSLength | CSSWidth
	borderRadius?: CSSLength
	borderCollapse?: "collapse" | "separate"
	borderColor?: CSSColor
	borderImage?: (| `url(${string}) ${number} ${string}` | string)
	borderImageOutset?: number | string
	borderImageRepeat?: "stretch" | "repeat" | "round" | "space"
	borderImageSlice?: string | number | CSSLength
	borderImageSource?: "none" | `url(${string})`
	borderImageWidth?: | number | CSSLength

	borderBottom?: CSSBorder
	borderBottomColor?: CSSColor
	borderBottomLeftRadius?: CSSLength | number
	borderBottomRightRadius?: CSSLength | number
	borderBottomStyle?: CSSBorderStyle
	borderBottomWidth?: CSSLength | CSSWidth

	borderLeft?: CSSBorder
	borderLeftColor?: CSSColor
	borderLeftStyle?: CSSBorderStyle
	borderLeftWidth?: CSSWidth | CSSLength

	borderRight?: CSSBorder
	borderRightColor?: CSSColor
	borderRightStyle?: CSSBorderStyle
	borderRightWidth?: CSSWidth | CSSLength

	borderTop?: CSSBorder
	borderTopColor?: CSSColor
	borderTopLeftRadius?: string | CSSLength
	borderTopRightRadius?: string | CSSLength
	borderTopStyle?: CSSBorderStyle
	borderTopWidth?: CSSWidth | CSSLength

	bottom?: CSSLength | "auto"
	boxShadow?: string | null
	boxSizing?: "border-box" | "content-box"
	breakAfter?: (
		| "auto"
		| "avoid"
		| "always"
		| "all"
		| "avoid-page"
		| "page"
		| "left"
		| "right"
		| "recto"
		| "verso"
		| "avoid-column"
		| "region"
	)
	breakBefore?: (
		| "auto"
		| "avoid"
		| "always"
		| "all"
		| "avoid-page"
		| "page"
		| "left"
		| "right"
		| "recto"
		| "verso"
		| "avoid-column"
		| "region"
	)
	breakInside?: (
		| "auto"
		| "avoid"
		| "avoid-page"
		| "avoid-column"
		| "avoid-region"
	)
	captionSide?: (
		| "top"
		| "bottom"
		| "block-start"
		| "block-end"
		| "inline-start"
		| "inline-end"
	)
	clear?: (
		| "none"
		| "left"
		| "right"
		| "both"
		| "inline-start"
		| "inline-end"
	)
	clip?: string | null
	clipPath?: (
		| `url(${string})`
		| "margin-box"
		| "border-box"
		| "padding-box"
		| "content-box"
		| "fill-box"
		| "stroke-box"
		| "view-box"
		| `inset(${string} ${string})`
		| `circle(${string} at ${string} ${string})`
	)
	clipRule?: "nonzero" | "evenodd" | "inherit"
	color?: CSSColor
	colorInterpolationFilters?: string | null
	columnCount?: "auto" | number
	columnFill?: "auto" | "balance" | "balance-all"
	columnRule?: CSSBorderStyle | string
	columnRuleColor?: CSSColor | string
	columnRuleStyle?: CSSBorderStyle
	columnRuleWidth?: CSSBorderStyle | CSSLength
	columnSpan?: "none" | "all"
	columnWidth?: "auto" | CSSLength
	columns?: (
		| CSSLength
		| "auto"
		| number
		| string
	)
	content?: string | null
	counterIncrement?: string | "none"
	counterReset?: string | "none"
	cssFloat?: string | null
	float?: (
		| "left"
		| "right"
		| "none"
		| "inline-start"
		| "inline-end"
	)
	cssText?: string
	cursor?: (
		| CSSCursor
		| `url(${string}), ${CSSCursor}`
		| `url(${string}) ${number} ${number}, ${CSSCursor}`
	)
	direction?: "ltr" | "rtl"
	display?: (
		| "block"
		| "inline"
		| "inline-block"
		| "flex"
		| "inline-flex"
		| "grid"
		| "inline-grid"
		| "flow-root"
		| "none"
		| "contents"
		| "block flow"
		| "inline flow"
		| "inline flow-root"
		| "block flex"
		| "inline flex"
		| "block grid"
		| "inline grid"
		| "block flow-root"
		| "table"
		| "table-row"
		| "list-item"
	)
	dominantBaseline?: (
		| "auto"
		| "ideographic"
		| "alphabetic"
		| "hanging"
		| "mathematical"
		| "central"
		| "middle"
		| "text-after-edge"
		| "text-before-edge"
		| "text-top"
	)
	emptyCells?: "show" | "hide"
	enableBackground?: (
		| "accumulate"
		| `new ${number} ${number} ${number} ${number}`
	)
	fill?: CSSColor
	fillOpacity?: number | `${number}` | `${number}%`
	fillRule?: "nonzero" | "evenodd"
	filter?: (
		| `url(${string})`
		| `blur(${CSSLength})`
		| `brightness(${number})`
		| `contrast(${number} %)`
		//| `drop - shadow(${ CSSLength } ${ CSSLength } ${ CSSLength } ${ CSSColor })`
		| `grayscale(${number} %)`
		| `hue - rotate(${number}deg)`
		| `invert(${number} %)`
		| `opacity(${number} %)`
		| `saturate(${number} %)`
		| `sepia(${number} %)`
		| string
		| "none"
	)
	flex?: (
		| "none"
		| "auto"
		| "initial"
		| number
		| CSSLength
		| string
	)
	flexBasis?: (
		| "auto"
		| CSSLength
		| "min-content"
		| "max-content"
		| "fit-content"
		| "content"
	)
	flexDirection?: (
		| "row"
		| "row-reverse"
		| "column"
		| "column-reverse"
	)
	flexFlow?: (
		| "row"
		| "row-reverse"
		| "column"
		| "column-reverse"
		| "nowrap"
		| "wrap"
		| "wrap-reverse"
		//| `${ "row" | "row-reverse" | "column" | "column-reverse" } ${ "nowrap" | "wrap" | "wrap-reverse" } `
	)
	flexGrow?: number | `${number}`
	flexShrink?: number | `${number}`
	flexWrap?: "nowrap" | "wrap" | "wrap-reverse"
	floodColor?: CSSColor
	floodOpacity?: number | `${number}` | `${number}%`

	font?: (
		/* font-size font-family */
		| `${_CSSProperties["fontSize"]} ${_CSSProperties["fontFamily"]} `

		/* font-size/line height font-family */
		| `${_CSSProperties["fontSize"]}/${_CSSProperties["lineHeight"]} ${_CSSProperties["fontFamily"]} `

		/* font-style font-weight font-size font-family */
		| `${_CSSProperties["fontStyle"]} ${_CSSProperties["fontWeight"]} ${_CSSProperties["fontSize"]} ${_CSSProperties["fontFamily"]} `

		/* font-stretch font-variant font-size font-family */
		| `${_CSSProperties["fontStretch"]} ${_CSSProperties["fontVariant"]} ${_CSSProperties["fontSize"]} ${_CSSProperties["fontFamily"]} `

		/* System font */
		| `${CSSSystemFont}`
	)

	/** Specifies a prioritized list of one or more font family names and/or generic family names for the selected element */
	fontFamily?: (
		| `${string}` // specific font name
		| `${string}, ${CSSFontFamilyGeneric}`
		| `${CSSFontFamilyGeneric}`
	)
	fontFeatureSettings?: (
		| "normal"
		| string
		| `${string} ${"on" | "off" | number}`
	)
	fontSize?: (
		| "xx-small"
		| "x-small"
		| "small"
		| "medium"
		| "large"
		| "x-large"
		| "xx-large"
		| "xxx-large"
		| "larger"
		| "smaller"
		| CSSLength
		| "math"
	)
	fontSizeAdjust?: (
		| "none"
		| number
		| `${"ex-height" | "cap-height" | "ch-width" | "ic-width" | "ic-height"} ${number}`
	)
	fontStretch?: (
		| "normal"
		| "ultra-condensed"
		| "extra-condensed"
		| "condensed"
		| "semi-condensed"
		| "semi-expanded"
		| "expanded"
		| "extra-expanded"
		| "ultra-expanded"
		| `${number}%`
	)
	fontStyle?: (
		| "normal"
		| "italic"
		| "oblique"
		| `oblique ${number}deg`
	)
	fontVariant?: (
		| "none"
		| "normal"
		| "small-caps"
		| "all-small-caps"
		| "petite-caps"
		| "all-petite-caps"
		| "unicase"
		| "titling-caps"
		| "lining-nums"
		| "oldstyle-nums"
		| "proportional-nums"
		| "tabular-nums"
		| "diagonal-fractions"
		| "stacked-fractions"
		| "ordinal"
		| "slashed-zero"
		| "jis78"
		| "jis83"
		| "jis90"
		| "jis04"
		| "simplified"
		| "traditional"
		| "full-width"
		| "proportional-width"
		| "ruby"
	)
	fontWeight?: (
		| "normal"
		| "bold"
		| "bolder"
		| "lighter"
		| 100
		| 200
		| 300
		| 400
		| 500
		| 600
		| 700
		| 800
		| 900
	)
	glyphOrientationHorizontal?: `${number} ${"deg" | "grad" | "rad"}`
	glyphOrientationVertical?: `${number} ${"deg" | "grad" | "rad"}`
	height?: (
		| "max-content"
		| "min-content"
		//| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)
	imeMode?: (
		| "auto"
		| "normal"
		| "active"
		| "inactive"
		| "disabled"
	)
	justifyContent?: (
		| "center"
		| "start"
		| "end"
		| "flex-start"
		| "flex-end"
		| "left"
		| "right"
		| "normal"
		| "space-between"
		| "space-around"
		| "space-evenly"
		| "stretch"
		| "safe center"
		| "unsafe center"
	)

	kerning?: "auto" | number | CSSLength
	left?: "auto" | CSSLength
	readonly length?: CSSLength
	letterSpacing?: "normal" | CSSLength
	lightingColor?: CSSColor
	lineHeight?: "normal" | number | CSSLength
	listStyle?: string | null
	listStyleImage?: "none" | `url(${string})`
	listStylePosition?: "inside" | "outside"
	listStyleType?: (
		| "none"
		| string
		| "disc"
		| "circle"
		| "square"
		| "decimal"
		| "cjk-decimal"
		| "decimal-leading-zero"
		| "lower-roman"
		| "upper-roman"
		| "lower-greek"
		| "lower-alpha"
		| "lower-latin"
		| "upper-alpha"
		| "upper-latin"
		| "arabic-indic"
		| "-moz-arabic-indic"
		| "armenian"
		| "bengali"
		| "-moz-bengali"
		| "cambodian"
		| "khmer"
		| "cjk-earthly-branch"
		| "-moz-cjk-earthly-branch"
		| "cjk-heavenly-stem"
		| "-moz-cjk-heavenly-stem"
		| "cjk-ideographic"
		| "devanagari"
		| "-moz-devanagari"
		| "ethiopic-numeric"
		| "georgian"
		| "gujarati"
		| "-moz-gujarati"
		| "gurmukhi"
		| "-moz-gurmukhi"
		| "hebrew"
		| "hiragana"
		| "hiragana-iroha"
		| "japanese-formal"
		| "japanese-informal"
		| "kannada"
		| "-moz-kannada"
		| "katakana"
		| "katakana-iroha"
		| "korean-hangul-formal"
		| "korean-hanja-formal"
		| "korean-hanja-informal"
		| "lao"
		| "-moz-lao"
		| "lower-armenian"
		| "malayalam"
		| "-moz-malayalam"
		| "mongolian"
		| "myanmar"
		| "-moz-myanmar"
		| "oriya"
		| "-moz-oriya"
		| "persian"
		| "-moz-persian"
		| "simp-chinese-formal"
		| "simp-chinese-informal"
		| "tamil"
		| "-moz-tamil"
		| "telugu"
		| "-moz-telugu"
		| "thai"
		| "-moz-thai"
		| "tibetan"
		| "trad-chinese-formal"
		| "trad-chinese-informal"
		| "upper-armenian"
		| "disclosure-open"
		| "disclosure-closed"
	)
	margin?: (
		| number
		| CSSLength
		| string
	)
	marginBottom?: CSSLength | "auto" | `${number}`
	marginLeft?: CSSLength | "auto" | `${number}`
	marginRight?: CSSLength | "auto" | `${number}`
	marginTop?: CSSLength | "auto" | `${number}`
	marker?: string | null
	markerEnd?: string | null
	markerMid?: string | null
	markerStart?: string | null
	mask?: string | null
	maxHeight?: (
		| "max-content"
		| "min-content"
		| `fit-content`
		| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)
	maxWidth?: (
		| "max-content"
		| "min-content"
		| `fit-content`
		| `fit-content`
		| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)
	minHeight?: (
		| "max-content"
		| "min-content"
		| `fit-content`
		| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)
	minWidth?: (
		| "max-content"
		| "min-content"
		| `fit-content`
		| `fit-content(${CSSLength})`
		| "auto"
		| CSSLength
	)
	textSizeAdjust?: string | null
	msTextSizeAdjust?: string | null
	mozTextSizeAdjust?: string | null
	webkitTextSizeAdjust?: string | null

	msContentZoomChaining?: string | null
	msContentZoomLimit?: string | null
	msContentZoomLimitMax?: unknown
	msContentZoomLimitMin?: unknown
	msContentZoomSnap?: string | null
	msContentZoomSnapPoints?: string | null
	msContentZoomSnapType?: string | null
	msContentZooming?: string | null
	msFlowFrom?: string | null
	msFlowInto?: string | null
	msFontFeatureSettings?: string | null
	msGridColumn?: unknown
	msGridColumnAlign?: string | null
	msGridColumnSpan?: unknown
	msGridColumns?: string | null
	msGridRow?: unknown
	msGridRowAlign?: string | null
	msGridRowSpan?: unknown
	msGridRows?: string | null
	msHighContrastAdjust?: string | null
	msHyphenateLimitChars?: string | null
	msHyphenateLimitLines?: unknown
	msHyphenateLimitZone?: unknown
	msHyphens?: string | null
	msImeAlign?: string | null
	msOverflowStyle?: string | null
	msScrollChaining?: string | null
	msScrollLimit?: string | null
	msScrollLimitXMax?: unknown
	msScrollLimitXMin?: unknown
	msScrollLimitYMax?: unknown
	msScrollLimitYMin?: unknown
	msScrollRails?: string | null
	msScrollSnapPointsX?: string | null
	msScrollSnapPointsY?: string | null
	msScrollSnapType?: string | null
	msScrollSnapX?: string | null
	msScrollSnapY?: string | null
	msScrollTranslation?: string | null
	msTextCombineHorizontal?: string | null
	msTouchAction?: string | null
	msTouchSelect?: string | null
	msUserSelect?: string | null
	msWrapFlow?: string
	msWrapMargin?: unknown
	msWrapThrough?: string
	opacity?: number | `${number}` | `${number}%`
	order?: string | null
	orphans?: number
	outline?: CSSBorderStyle | string
	outlineColor?: CSSColor | "invert"
	outlineStyle?: CSSBorderStyle
	outlineWidth?: CSSWidth | CSSLength
	overflow?: (
		| "visible"
		| "hidden"
		| "clip"
		| "scroll"
		| "auto"
	)
	overflowX?: (
		| "visible"
		| "hidden"
		| "clip"
		| "scroll"
		| "auto"
	)
	overflowY?: (
		| "visible"
		| "hidden"
		| "clip"
		| "scroll"
		| "auto"
	)
	padding?: number | CSSLength | string
	paddingBottom?: CSSLength
	paddingLeft?: CSSLength
	paddingRight?: CSSLength
	paddingTop?: CSSLength
	pageBreakAfter?: (
		| "auto"
		| "always"
		| "avoid"
		| "left"
		| "right"
		| "recto"
		| "verso"
	)
	pageBreakBefore?: (
		| "auto"
		| "always"
		| "avoid"
		| "left"
		| "right"
		| "recto"
		| "verso"
	)
	pageBreakInside?: "auto" | "avoid"
	perspective?: "none" | CSSLength
	perspectiveOrigin?: string | null
	pointerEvents?: (
		| "auto"
		| "none"
		| "visiblePainted"
		| "visibleFill"
		| "visibleStroke"
		| "visible"
		| "painted"
		| "fill"
		| "stroke"
		| "all"
	)
	position?: "static" /*default*/ | "fixed" | "absolute" | "relative" | "sticky" | null
	quotes?: (
		| "none"
		| "auto"
		| `${string} ${string}`
		| `${string} ${string} ${string} ${string}`
	)
	right?: "auto" | CSSLength
	rubyAlign?: "start" | "center" | "space-between" | "space-around"
	rubyOverhang?: string | null
	rubyPosition?: "over" | "under" | "alternate" | "inter-character"
	stopColor?: CSSColor
	stopOpacity?: number | `${number}`
	stroke?: string | null
	strokeDasharray?: "none" | "inherit" | string | CSSLength
	strokeDashoffset?: CSSLength
	strokeLinecap?: "butt" | "round" | "square"
	strokeLinejoin?: "miter" | "round" | "bevel" | "arcs" | "miter-clip"
	strokeMiterlimit?: number | `${number}`
	strokeOpacity?: number | `${number}%`
	strokeWidth?: CSSLength | number | `${number}`
	tableLayout?: "auto" | "fixed"
	textAlign?: (
		| "start"
		| "end"
		| "left"
		| "right"
		| "center"
		| "justify"
		| "justify-all"
		| "match-parent"
		| string
	)
	textAlignLast?: (
		| "auto"
		| "start"
		| "end"
		| "left"
		| "right"
		| "center"
		| "justify"
	)
	textAnchor?: "start" | "middle" | "end"

	/** The appearance of decorative lines on text.
	 * It is a shorthand for text-decoration-line, text-decoration-color, text-decoration-style, and
	 * the newer text-decoration-thickness property
	 */
	textDecoration?: (
		| CSSProperties["textDecorationLine"]
		| `${CSSProperties["textDecorationLine"]} ${CSSProperties["textDecorationColor"]}`
		| `${CSSProperties["textDecorationLine"]} ${CSSProperties["textDecorationStyle"]}`
		| `${CSSProperties["textDecorationLine"]} ${CSSProperties["textDecorationStyle"]} ${CSSProperties["textDecorationColor"]}`
		// | `${CSSProperties["textDecorationLine"]} ${CSSProperties["textDecorationStyle"]} ${CSSProperties["textDecorationColor"]} ${CSSProperties["s"]}`
	)

	/** Style of the lines specified by text-decoration-line */
	textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy'

	/** Kind of decoration that is used on text in an element, such as an underline or overline */
	textDecorationLine?: 'none' | 'underline' | 'overline' | 'line-through' | 'underline overline' | 'underline line-through'

	/** Stroke thickness of the decoration line that is used on text in an element, such as a line-through, underline, or overline.
	 * The from-font value means: If the font file includes info about a preferred thickness, use that value;
	 * If not, behave as if auto was set, with the browser choosing an appropriate thickness.
	 */
	textDecorationThickness?: CSSLength | "from-font"

	/** Color of decorations added to text by text-decoration-line. */
	textDecorationColor?: CSSColor

	textIndent?: CSSLength
	textJustify?: (
		| "auto"
		| "none"
		| "inter-word"
		| "inter-character"
	)
	textKashida?: string | null
	textKashidaSpace?: string | null
	textOverflow?: "clip" | "ellipsis"
	textShadow?: string | null
	textTransform?: (
		| "none"
		| "capitalize"
		| "uppercase"
		| "lowercase"
		| "full-width"
		| "full-size-kana"
	)
	textUnderlinePosition?: (
		| "auto"
		| "under"
		| "left"
		| "right"
		| `${"auto" | "under" | "left" | "right"} ${"auto" | "under" | "left" | "right"}`
	)
	top?: "auto" | CSSLength
	touchAction?: (
		| "auto"
		| "none"
		| "pan-x"
		| "pan-left"
		| "pan-right"
		| "pan-y"
		| "pan-up"
		| "pan-down"
		| "pinch-zoom"
		| "manipulation"
	)
	transform?: (
		| "none"
		| string
		| `matrix(${number}, ${number}, ${number}, ${number}, ${number}, ${number})`
		| `matrix3d(${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number}, ${number})`
		| `rotate(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotate3d(${number},${number},${number},${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotateX(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotateY(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `rotateZ(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `scale(${number | `${number}%`}, ${number | `${number}%`})`
		| `scale3d(${number}, ${number},${number})`
		| `scaleX(${number})`
		| `scaleY(${number})`
		| `scaleZ(${number})`
		| `skew(${`${number}${"deg" | "grad" | "rad" | "turn"}` | `${number}${"deg" | "grad" | "rad" | "turn"}, ${number}${"deg" | "grad" | "rad" | "turn"}`})`
		| `skewX(${number}${"deg" | "grad" | "rad" | "turn"})`
		| `skewY(${number}${"deg" | "grad" | "rad" | "turn"})`
	)
	transformOrigin?: (
		| CSSLength
		| "left"
		| "right"
		| "center"
		| "bottom"
		| string
	)
	transformStyle?: "flat" | "preserve-3d"
	transition?: (
		// | `${string} ${CSSTime}`
		// | `${string} ${CSSTime} ${CSSTime}`
		// | `${string} ${CSSTime} ${CSSEasingFunction}`
		// | `${string} ${CSSTime} ${CSSEasingFunction} ${CSSTime}`
		| `all ${CSSTime} ${CSSEasingFunction}`
		| string
	)
	transitionDelay?: CSSTime | string
	transitionDuration?: CSSTime | string
	transitionProperty?: "none" | "all" | string
	transitionTimingFunction?: CSSEasingFunction
	unicodeBidi?: (
		| "normal"
		| "embed"
		| "isolate"
		| "bidi-override"
		| "isolate-override"
		| "plaintext"
	)

	/** Vertical alignment of an inline, inline-block or table-cell box */
	verticalAlign?: (
		| "baseline"
		| "sub"
		| "super"
		| "text-top"
		| "text-bottom"
		| "middle"
		| "top"
		| "bottom"
		| CSSLength
	)
	visibility?: "visible" | "hidden" | "collapse"
	webkitAlignContent?: string | null
	webkitAlignItems?: string | null
	webkitAlignSelf?: string | null
	webkitAnimation?: string | null
	webkitAnimationDelay?: string | null
	webkitAnimationDirection?: string | null
	webkitAnimationDuration?: string | null
	webkitAnimationFillMode?: string | null
	webkitAnimationIterationCount?: string | null
	webkitAnimationName?: string | null
	webkitAnimationPlayState?: string | null
	webkitAnimationTimingFunction?: string | null
	webkitAppearance?: string | null
	webkitBackfaceVisibility?: string | null
	webkitBackgroundClip?: string | null
	webkitBackgroundOrigin?: string | null
	webkitBackgroundSize?: string | null
	webkitBorderBottomLeftRadius?: string | null
	webkitBorderBottomRightRadius?: string | null
	webkitBorderImage?: string | null
	webkitBorderRadius?: string | null
	webkitBorderTopLeftRadius?: CSSLength | number | null
	webkitBorderTopRightRadius?: CSSLength | number | null
	webkitBoxAlign?: string | null
	webkitBoxDirection?: string | null
	webkitBoxFlex?: string | null
	webkitBoxOrdinalGroup?: string | null
	webkitBoxOrient?: string | null
	webkitBoxPack?: string | null
	webkitBoxSizing?: string | null
	webkitColumnBreakAfter?: string | null
	webkitColumnBreakBefore?: string | null
	webkitColumnBreakInside?: string | null
	webkitColumnCount?: unknown
	webkitColumnGap?: unknown
	webkitColumnRule?: string | null
	webkitColumnRuleColor?: unknown
	webkitColumnRuleStyle?: string | null
	webkitColumnRuleWidth?: unknown
	webkitColumnSpan?: string | null
	webkitColumnWidth?: unknown
	webkitColumns?: string | null
	webkitFilter?: string | null
	webkitFlex?: string | null
	webkitFlexBasis?: string | null
	webkitFlexDirection?: string | null
	webkitFlexFlow?: string | null
	webkitFlexGrow?: string | null
	webkitFlexShrink?: string | null
	webkitFlexWrap?: string | null
	webkitJustifyContent?: string | null
	webkitOrder?: string | null
	webkitPerspective?: "none" | CSSLength | null
	webkitPerspectiveOrigin?: string | null
	webkitTapHighlightColor?: string | null
	webkitTextFillColor?: string | null
	webkitTransform?: string | null
	webkitTransformOrigin?: string | null
	webkitTransformStyle?: string | null
	webkitTransition?: string | null
	webkitTransitionDelay?: string | null
	webkitTransitionDuration?: string | null
	webkitTransitionProperty?: string | null
	webkitTransitionTimingFunction?: string | null
	webkitUserModify?: string | null
	webkitUserSelect?: string | null
	webkitWritingMode?: string | null
	whiteSpace?: (
		| "normal"
		| "nowrap"
		| "pre"
		| "pre-wrap"
		| "pre-line"
		| "break-spaces"
	)
	widows?: number
	width?: (
		| "auto"
		| "max-content"
		| "min-content"
		| "fit-content"
		| `fit-content(${CSSLength})`
		| CSSLength
	)
	wordBreak?: "normal" | "break-all" | "keep-all" | "break-word"
	wordSpacing?: "normal" | CSSLength
	/** Applies to inline elements, setting whether the browser should insert line breaks within an otherwise unbreakable string to prevent text from overflowing its line box. */
	overflowWrap?: (
		| "normal"
		| "break-word"
		| "anywhere"
	)
	/** Alias of overflowWrap */
	wordWrap?: (
		| "normal"
		| "break-word"
		| "anywhere"
	)
	/** Controls how text inside an element is wrapped */
	textWrap?: (
		/** Text is wrapped across lines at appropriate characters (for example spaces, in languages like English that use space separators) to minimize overflow.
		 * This is the default value.
		 */
		| "wrap"

		/** Text does not wrap across lines. It will overflow its containing element rather than breaking onto a new line. */
		| "nowrap"

		/** Text is wrapped in a way that best balances the number of characters on each line, enhancing layout quality and legibility. Because counting characters and balancing them across multiple lines is computationally expensive, this value is only supported for blocks of text spanning a limited number of lines (the Chromium implementation uses six wrapped lines or less), meaning that it is useful for cases such as headings or pull quotes. */
		| "balance"
	)
	hyphens?: (| "auto" | "normal" | "none")

	writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr"
	zIndex?: "auto" | number
	zoom?: "normal" | "reset" | `${number}%` | number

	/** Shorthand property for the grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, and the grid-auto-flow properties */
	grid?: string

	/** Either specifies a name for the grid item,  or this property is a shorthand property for the
	 * grid-row-start, grid-column-start, grid-row-end, and grid-column-end properties
	 */
	gridArea?: string

	/** Defines on which row-line a grid item will start */
	gridRowStart?: (
		| "auto" // Default value. The item will be placed following the flow
		| `span ${number}` // the number of rows the item will span
		| number // row line
		| "inherit" | "initial" | "revert" | "unset"
	)
	/** Defines on which column-line a grid item will start. */
	gridColumnStart?: (
		| "auto" // Default value. The item will be placed following the flow
		| `span ${number}` // the number of columns the item will span
		| number // column-line
		| "inherit" | "initial" | "revert" | "unset"
	)
	/** Defines how many rows a grid item will span, or on which row-line the item will end */
	gridRowEnd?: "auto" | number | `span ${number}` | "inherit" | "initial" | "revert" | "unset"

	/** Defines how many columns a grid item will span, or on which column-line the item will end */
	gridColumnEnd?: "auto" | number | `span ${number}` | "inherit" | "initial" | "revert" | "unset"

	/** A shorthand property for the grid-row-start and the grid-row-end properties */
	gridRow?: `${"auto" | number | `span ${number}`} ${"auto" | number | `span ${number}`}`

	/** A shorthand property for the grid-column-start and the grid-column-end properties */
	gridColumn?: `${"auto" | number | `span ${number}`} ${"auto" | number | `span ${number}`}`

	/** Specifies the size of the columns, and how many columns in a grid layout */
	gridTemplateColumns?: string

	/** Specifies the size of the rows in a grid layout */
	gridTemplateRows?: string

	/** A shorthand property for the grid-template-rows, grid-template-columns and grid-areas properties
	 * Default is none
	 */
	gridTemplate?: string | null,

	gridAutoRows?: string
	gridAutoColumns?: string

	/** Specifies the gap between the grid rows */
	rowGap?: CSSLength | null

	/** Specifies the gap between the columns */
	columnGap?: CSSLength | null

	/** A shorthand property for the grid-row-gap and grid-column-gap properties
	 * Either a single CSS length value to both row and column gap
	 * Or two CSS length values specifying the grid-row-gap grid-column-gap
	 */
	gridGap?: CSSLength | null

	/** A shorthand property for the row-gap and the column-gap properties
	 * Either a single CSS length value for both row and column gap
	 * Or two CSS length values specifying the row-gap and column-gap
	 */
	gap?: CSSLength | null

	objectFit?: string
}

export type CSSColor = (
	| keyof typeof colorConstants
	| "none"
	| "currentColor"
	| "transparent"
	| `#${string}`
	| `url(#${string})`
	| `rgb(${number},${number},${number})`
	| `rgba(${number}, ${number}, ${number}, ${number})`
)
export type CSSBorder = (
	| `${CSSWidth}`
	| `${CSSBorderStyle}`
	| `${CSSColor}`
	| `${CSSWidth} ${CSSBorderStyle}`
	| `${CSSBorderStyle} ${CSSColor}`
	| `${CSSWidth} ${CSSBorderStyle} ${CSSColor}`
)
export type CSSBorderStyle = (
	| "none"
	| "hidden"
	| "dotted"
	| "dashed"
	| "solid"
	| "double"
	| "groove"
	| "ridge"
	| "inset"
	| "outset"
)
export type CSSCursor = (
	| "auto"
	| "default"
	| "none"
	| "context-menu"
	| "help"
	| "pointer"
	| "progress"
	| "wait"
	| "cell"
	| "crosshair"
	| "text"
	| "vertical-text"
	| "alias"
	| "copy"
	| "move"
	| "no-drop"
	| "not-allowed"
	| "grab"
	| "grabbing"
	| "all-scroll"
	| "col-resize"
	| "row-resize"
	| "n-resize"
	| "e-resize"
	| "s-resize"
	| "w-resize"
	| "ne-resize"
	| "nw-resize"
	| "se-resize"
	| "sw-resize"
	| "ew-resize"
	| "ns-resize"
	| "nesw-resize"
	| "nwse-resize"
	| "zoom-in"
	| "zoom-out"
	| "inherit"
	| "initial"
	| "revert"
	| "unset"
)
export type CSSEasingFunction = (
	| "linear"
	| `linear(${number | CSSLength})`
	| "ease"
	| "ease-in"
	| "ease-out"
	| "ease-in-out"
	| "step-start"
	| "step-end"
	| `steps(${number} ${"start" | "end" | "jump-start" | "jump-end" | "jump-both" | "jump-none"})`
	| `cubic-bezier(${number},${number},${number},${number})`
)
export type CSSTime = (
	| `${number}${("ms" | "s")}`
)
export type CSSFontFamilyGeneric = (
	| "serif"
	| "sans-serif"
	| "cursive"
	| "fantasy"
	| "monospace"
	| "system-ui"
	| "ui-serif"
	| "ui-sans-serif"
	| "ui-monospace"
	| "ui-rounded"
	| "emoji"
	| "math"
	| "fangsong"
)
export type CSSSystemFont = (
	| "caption"
	| "icon"
	| "menu"
	| "message-box"
	| "small-caption"
	| "status-bar"
)
export type CSSWidth = (
	| CSSLength
	| "thin"
	| "medium"
	| "thick"
)
export type CSSLength = (
	| 0
	| "0"
	| `${number}${CSSLengthUnit}`
	| `calc(${string})`
)
export type CSSLengthUnit = (
	| "%"
	| "px" // Pixels (1px = 1/96th of 1in)
	| "pt" // Points (1pt = 1/72th of 1in)
	| "cm"  // Centimeters
	| "mm" // Millimeters
	| "Q" // Quarter-millimeters
	| "in"  // Inches
	| "pc" // Picas (1pt = 1/72th of 1in)

	| "rem" // Relative to Font size of the root element.
	| "em" // Relative to font size of parent, for typographical properties like font-size, and font size of the
	// element itself, of other properties like width.
	| "ex" // Relative to x-height of the element's font.
	| "ch" // Relative to The advance measure (width) of the glyph "0" of the element's font.
	| "lh" // Relative to Line height of the element.
	| "vw" // 1% of the viewport's width.
	| "vh" // 1% of the viewport's height.
	| "vmin" // 1% of the viewport's smaller dimension.
	| "vmax" // 1% of the viewport's larger dimension.
)
