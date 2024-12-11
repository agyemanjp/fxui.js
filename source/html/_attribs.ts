import { type Rec, assert, isFunction, keys } from "@agyemanjp/standard"

import type { Children } from "../common"
import { encodeHTML } from "./common"
import { type CSSColor, type CSSLength, type CSSProperties, type CSSProperty, stringifyStyle } from "./_styles"
import {
	isEventKey,
	type AnimationEventHandler, type ChangeEventHandler, type ClipboardEventHandler, type CompositionEventHandler,
	type DragEventHandler, type FocusEventHandler, type FormEventHandler, type GeneralEventHandler,
	type KeyboardEventHandler, type MouseEventHandler, type PointerEventHandler, type TouchEventHandler, type TransitionEventHandler,
	type UIEventHandler, type WheelEventHandler
} from "./_events"

/** Converts an attributes property object to a string */
export function stringifyAttributes<E>(props: HTMLAttributes<unknown> & E): string {
	// console.log(`Stringifying ${stringify(props)}`)
	return Object.keys(props)
		.map(key => {
			const effectiveKey = keys(attributeConversions).includes(key.toLowerCase())
				? attributeConversions[key.toLowerCase()]
				: key.toLowerCase()
			assert(effectiveKey, `Effective key does not exist`)

			const htmlKey = encodeHTML(effectiveKey)
			const value = (props as Rec)[key]

			switch (true) {
				case key.toUpperCase() === "STYLE": return (
					`style="${encodeHTML(stringifyStyle(value as CSSProperties))}"`
				)

				case booleanAttributes.includes(key.toUpperCase()): return (
					([false, undefined, null] as unknown[]).includes(value) ? "" : `${encodeHTML(key.toLowerCase())}`
				)

				case isEventKey(key) && isFunction(value): {
					return ""
					// return `${htmlKey}="(${String(handler ?? "")})(event)"`
				}

				case typeof value === "string": return (`${htmlKey}="${encodeHTML(String(value))}"`)
				case typeof value === "number" && !Number.isNaN(value): return (`${htmlKey}="${value}"`)
				case typeof value === "boolean": return (`${htmlKey}="${value}"`)
				default: return ""
			}
		})
		.filter(attrHTML => attrHTML.length > 0)
		.join(" ")
}

/** HTML (boolean) attributes set by their presence irrespective of their value. */
export const booleanAttributes = [
	"REQUIRED",
	"DISABLED",
	"CHECKED",
	"READONLY",
	"AUTOFOCUS",
	"SELECTED"
]

/** Attribute name conversions when passed to DOM setAttribute or rendered as HTML
 * From https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes and https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
 * For directly settign an attribute on a DOM element, we assume the attribute name is already in the proper case 
 * (as specified by the attribute typings) so no conversion is needed.
 */
export const attributeConversions: Rec<string, string> = {
	"autoreverse": "auto-reverse",
	"htmlfor": "for",
	"classname": "class",
	"acceptcharset": "accept-charset",
	"httpequiv": "http-equiv",
	"fillrule": "fill-rule",
	"baselineshift": "baseline-shift",
	"accentheight": "accent-height",
	"alignmentbaseline": "alignment-baseline",
	"arabicform": "arabic-form",
	"capheight": "cap-height",
	"clippath": "clip-path",
	"cliprule": "clip-rule",
	"colorinterpolation": "color-interpolation",
	"colorinterpolationfilters": "color-interpolation-filters",
	"colorprofile": "color-profile",
	"colorrendering": "color-rendering",
	"dominantbaseline": "dominant-baseline",
	"enablebackground": "enable-background",
	"fillopacity": "fill-opacity",
	"fontfamily": "font-family",
	"fontsize": "font-size",
	"fontsizeadjust": "font-size-adjust",
	"fontstretch": "font-stretch",
	"fontstyle": "font-style",
	"fontvariant": "font-variant",
	"fontweight": "font-weight",
	"glyphname": "glyph-name",
	"glyphorientationhorizontal": "glyph-orientation-horizontal",
	"glyphorientationvertical": "glyph-orientation-vertical",
	"horizoriginx": "horiz-origin-x",
	"horizadvx": "horiz-adv-x",
	"imagerendering": "image-rendering",
	"letterspacing": "letter-spacing",
	"lightingcolor": "lighting-color",
	"markerend": "marker-end",
	"markerstart": "marker-start",
	"markermid": "marker-mid",
	"overlineposition": "overline-position",
	"overlinethickness": "overline-thickness",
	"panose1": "panose-1",
	"paintorder": "paint-order",
	"pointerevents": "pointer-events",
	"renderingintent": "rendering-intent",
	"shaperendering": "shape-rendering",
	"stopcolor": "stop-color",
	"stopopacity": "stop-opacity",
	"strikethroughposition": "strikethrough-position",
	"strikethroughthickness": "strikethrough-thickness",
	"strokedasharray": "stroke-dasharray",
	"strokedashoffset": "stroke-dashoffset",
	"strokelinecap": "stroke-linecap",
	"strokelinejoin": "stroke-linejoin",
	"strokemiterlimit": "stroke-miterlimit",
	"strokeopacity": "stroke-opacity",
	"strokewidth": "stroke-width",
	"textanchor": "text-anchor",
	"textdecoration": "text-decoration",
	"textrendering": "text-rendering",
	"transformorigin": "transform-origin",
	"unicodebidi": "unicode-bidi",
	"unicoderange": "unicode-range",
	"unitsperem": "units-per-em",
	"valphabetic": "v-alphabetic",
	"vhanging": "v-hanging",
	"videographic": "v-ideographic",
	"vmathematical": "v-mathematical",
	"vertadvy": "vert-adv-y",
	"vertoriginx": "vert-origin-x",
	"vertoriginy": "vert-origin-y",
	"wordspacing": "word-spacing",
	"writingmode": "writing-mode",
	"xheight": "x-height"
}


//#region Attribute Types
export type Attributes = {
	// key?: string | number | symbol
}
export type ClassAttributes<T> = Attributes & {
}
export type DOMAttributes<T> = Attributes & {
	//childrenx?: Somatic.VNode[];
	// dangerouslySetInnerHTML?: {
	// 	__html: string;
	// }

	// Clipboard Events
	onCopy?: ClipboardEventHandler<T>
	onCopyCapture?: ClipboardEventHandler<T>
	onCut?: ClipboardEventHandler<T>
	onCutCapture?: ClipboardEventHandler<T>
	onPaste?: ClipboardEventHandler<T>
	onPasteCapture?: ClipboardEventHandler<T>

	// Composition Events
	onCompositionEnd?: CompositionEventHandler<T>
	onCompositionEndCapture?: CompositionEventHandler<T>
	onCompositionStart?: CompositionEventHandler<T>
	onCompositionStartCapture?: CompositionEventHandler<T>
	onCompositionUpdate?: CompositionEventHandler<T>
	onCompositionUpdateCapture?: CompositionEventHandler<T>

	// Focus Events
	onFocus?: FocusEventHandler<T>
	onFocusCapture?: FocusEventHandler<T>
	onBlur?: FocusEventHandler<T>
	onBlurCapture?: FocusEventHandler<T>

	// Form Events
	onChange?: ChangeEventHandler<T>
	onChangeCapture?: FormEventHandler<T>
	onInput?: FormEventHandler<T>
	onInputCapture?: FormEventHandler<T>
	onReset?: FormEventHandler<T>
	onResetCapture?: FormEventHandler<T>
	onSubmit?: FormEventHandler<T>
	onSubmitCapture?: FormEventHandler<T>
	onInvalid?: FormEventHandler<T>
	onInvalidCapture?: FormEventHandler<T>

	// Image Events
	onLoad?: GeneralEventHandler<T>
	onLoadCapture?: GeneralEventHandler<T>
	onError?: GeneralEventHandler<T> // also a Media Event
	onErrorCapture?: GeneralEventHandler<T> // also a Media Event

	// Keyboard Events
	onKeyDown?: KeyboardEventHandler<T>
	onKeyDownCapture?: KeyboardEventHandler<T>
	onKeyPress?: KeyboardEventHandler<T>
	onKeyPressCapture?: KeyboardEventHandler<T>
	onKeyUp?: KeyboardEventHandler<T>
	onKeyUpCapture?: KeyboardEventHandler<T>

	// Media Events
	onAbort?: GeneralEventHandler<T>
	onAbortCapture?: GeneralEventHandler<T>
	onCanPlay?: GeneralEventHandler<T>
	onCanPlayCapture?: GeneralEventHandler<T>
	onCanPlayThrough?: GeneralEventHandler<T>
	onCanPlayThroughCapture?: GeneralEventHandler<T>
	onDurationChange?: GeneralEventHandler<T>
	onDurationChangeCapture?: GeneralEventHandler<T>
	onEmptied?: GeneralEventHandler<T>
	onEmptiedCapture?: GeneralEventHandler<T>
	onEncrypted?: GeneralEventHandler<T>
	onEncryptedCapture?: GeneralEventHandler<T>
	onEnded?: GeneralEventHandler<T>
	onEndedCapture?: GeneralEventHandler<T>
	onLoadedData?: GeneralEventHandler<T>
	onLoadedDataCapture?: GeneralEventHandler<T>
	onLoadedMetadata?: GeneralEventHandler<T>
	onLoadedMetadataCapture?: GeneralEventHandler<T>
	onLoadStart?: GeneralEventHandler<T>
	onLoadStartCapture?: GeneralEventHandler<T>
	onPause?: GeneralEventHandler<T>
	onPauseCapture?: GeneralEventHandler<T>
	onPlay?: GeneralEventHandler<T>
	onPlayCapture?: GeneralEventHandler<T>
	onPlaying?: GeneralEventHandler<T>
	onPlayingCapture?: GeneralEventHandler<T>
	onProgress?: GeneralEventHandler<T>
	onProgressCapture?: GeneralEventHandler<T>
	onRateChange?: GeneralEventHandler<T>
	onRateChangeCapture?: GeneralEventHandler<T>
	onSeeked?: GeneralEventHandler<T>
	onSeekedCapture?: GeneralEventHandler<T>
	onSeeking?: GeneralEventHandler<T>
	onSeekingCapture?: GeneralEventHandler<T>
	onStalled?: GeneralEventHandler<T>
	onStalledCapture?: GeneralEventHandler<T>
	onSuspend?: GeneralEventHandler<T>
	onSuspendCapture?: GeneralEventHandler<T>
	onTimeUpdate?: GeneralEventHandler<T>
	onTimeUpdateCapture?: GeneralEventHandler<T>
	onVolumeChange?: GeneralEventHandler<T>
	onVolumeChangeCapture?: GeneralEventHandler<T>
	onWaiting?: GeneralEventHandler<T>
	onWaitingCapture?: GeneralEventHandler<T>

	// MouseEvents
	onClick?: MouseEventHandler<T>
	onClickCapture?: MouseEventHandler<T>
	onContextMenu?: MouseEventHandler<T>
	onContextMenuCapture?: MouseEventHandler<T>
	onDoubleClick?: MouseEventHandler<T>
	onDoubleClickCapture?: MouseEventHandler<T>
	onDrag?: DragEventHandler<T>
	onDragCapture?: DragEventHandler<T>
	onDragEnd?: DragEventHandler<T>
	onDragEndCapture?: DragEventHandler<T>
	onDragEnter?: DragEventHandler<T>
	onDragEnterCapture?: DragEventHandler<T>
	onDragExit?: DragEventHandler<T>
	onDragExitCapture?: DragEventHandler<T>
	onDragLeave?: DragEventHandler<T>
	onDragLeaveCapture?: DragEventHandler<T>
	onDragOver?: DragEventHandler<T>
	onDragOverCapture?: DragEventHandler<T>
	onDragStart?: DragEventHandler<T>
	onDragStartCapture?: DragEventHandler<T>
	onDrop?: DragEventHandler<T>
	onDropCapture?: DragEventHandler<T>
	onMouseDown?: MouseEventHandler<T>
	onMouseDownCapture?: MouseEventHandler<T>
	onMouseEnter?: MouseEventHandler<T>
	onMouseLeave?: MouseEventHandler<T>
	onMouseMove?: MouseEventHandler<T>
	onMouseMoveCapture?: MouseEventHandler<T>
	onMouseOut?: MouseEventHandler<T>
	onMouseOutCapture?: MouseEventHandler<T>
	onMouseOver?: MouseEventHandler<T>
	onMouseOverCapture?: MouseEventHandler<T>
	onMouseUp?: MouseEventHandler<T>
	onMouseUpCapture?: MouseEventHandler<T>

	// Selection Events
	onSelect?: GeneralEventHandler<T>
	onSelectCapture?: GeneralEventHandler<T>

	// Touch Events
	onTouchCancel?: TouchEventHandler<T>
	onTouchCancelCapture?: TouchEventHandler<T>
	onTouchEnd?: TouchEventHandler<T>
	onTouchEndCapture?: TouchEventHandler<T>
	onTouchMove?: TouchEventHandler<T>
	onTouchMoveCapture?: TouchEventHandler<T>
	onTouchStart?: TouchEventHandler<T>
	onTouchStartCapture?: TouchEventHandler<T>

	// Pointer Events
	onPointerDown?: PointerEventHandler<T>
	onPointerDownCapture?: PointerEventHandler<T>
	onPointerMove?: PointerEventHandler<T>
	onPointerMoveCapture?: PointerEventHandler<T>
	onPointerUp?: PointerEventHandler<T>
	onPointerUpCapture?: PointerEventHandler<T>
	onPointerCancel?: PointerEventHandler<T>
	onPointerCancelCapture?: PointerEventHandler<T>
	onPointerEnter?: PointerEventHandler<T>
	onPointerEnterCapture?: PointerEventHandler<T>
	onPointerLeave?: PointerEventHandler<T>
	onPointerLeaveCapture?: PointerEventHandler<T>
	onPointerOver?: PointerEventHandler<T>
	onPointerOverCapture?: PointerEventHandler<T>
	onPointerOut?: PointerEventHandler<T>
	onPointerOutCapture?: PointerEventHandler<T>
	onGotPointerCapture?: PointerEventHandler<T>
	onGotPointerCaptureCapture?: PointerEventHandler<T>
	onLostPointerCapture?: PointerEventHandler<T>
	onLostPointerCaptureCapture?: PointerEventHandler<T>

	// UI Events
	onScroll?: UIEventHandler<T>
	onScrollCapture?: UIEventHandler<T>

	// Wheel Events
	onWheel?: WheelEventHandler<T>
	onWheelCapture?: WheelEventHandler<T>

	// Animation Events
	onAnimationStart?: AnimationEventHandler<T>
	onAnimationStartCapture?: AnimationEventHandler<T>
	onAnimationEnd?: AnimationEventHandler<T>
	onAnimationEndCapture?: AnimationEventHandler<T>
	onAnimationIteration?: AnimationEventHandler<T>
	onAnimationIterationCapture?: AnimationEventHandler<T>

	// Transition Events
	onTransitionEnd?: TransitionEventHandler<T>
	onTransitionEndCapture?: TransitionEventHandler<T>
}
export type HTMLAttributes<T> = DOMAttributes<T> & {
	children?: Children

	//#region Standard
	accessKey?: string
	className?: string
	contentEditable?: boolean
	contextMenu?: string
	dir?: string
	draggable?: boolean
	hidden?: boolean
	id?: string
	lang?: string
	placeholder?: string
	slot?: string
	spellCheck?: boolean
	style?: CSSProperties
	tabIndex?: number | string
	title?: string
	//#endregion

	//#region WAI-ARIA
	role?: string
	//#endregion

	//#region RDFa
	about?: string
	datatype?: string
	inlist?: unknown
	prefix?: string
	property?: string
	resource?: string
	typeof?: string
	vocab?: string
	//#endregion

	//#region Non-standard
	/** Controls whether inputted text is automatically capitalized and, if so, in what manner. */
	autocapitalize?: (
		/** No autocapitalization is applied (all letters default to lowercase) */
		| "off" | "none"
		/** The first letter of each sentence defaults to a capital letter; all other letters default to lowercase */
		| "on" | "sentences"
		/** The first letter of each word defaults to a capital letter; all other letters default to lowercase */
		| "words"
		/** All letters should default to uppercase */
		| "characters"
	)
	autocorrect?: string
	autosave?: string
	color?: string
	itemProp?: string
	itemScope?: boolean
	itemType?: string
	itemID?: string
	itemRef?: string
	results?: number
	security?: string
	unselectable?: 'on' | 'off'
	//#endregion

	//#region React-specific
	defaultChecked?: boolean
	defaultValue?: string | string[]
	suppressContentEditableWarning?: boolean
	suppressHydrationWarning?: boolean
	//#endregion

	// Unknown
	is?: string
	inputMode?: string
	radioGroup?: string // <command>, <menuitem>

}
export type SVGAttributes<T> = { [k in keyof _SVGAttributes<T>]: _SVGAttributes<T>[k] }
export type _SVGAttributes<T> = DOMAttributes<T> & {
	children?: Children

	// Attributes which are also defined in HTMLAttributes
	// See comment in SVGDOMPropertyConfig.js
	className?: string
	color?: string
	id?: string
	lang?: string
	max?: number | string
	media?: string
	method?: string
	min?: number | string
	name?: string
	style?: CSSProperties
	target?: string
	type?: string
	width?: number | `${number}` | CSSLength
	height?: number | `${number}` | CSSLength

	// Other HTML properties supported by SVG elements in browsers
	role?: string
	tabIndex?: number

	// SVG Specific attributes
	accentHeight?: number | string
	accumulate?: "none" | "sum"
	additive?: "replace" | "sum"
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
		| "inherit"
	)
	allowReorder?: "no" | "yes"
	alphabetic?: number | string
	amplitude?: number | string
	arabicForm?: "initial" | "medial" | "terminal" | "isolated"
	ascent?: number | string
	attributeName?: string
	attributeType?: string
	autoReverse?: number | string
	azimuth?: number | string
	baseFrequency?: number | string
	baselineShift?: number | string
	baseProfile?: number | string
	bbox?: number | string
	begin?: number | string
	bias?: number | string
	by?: number | string
	calcMode?: number | string
	capHeight?: number | string
	clip?: number | string
	clipPath?: string
	clipPathUnits?: number | string
	clipRule?: number | string
	colorInterpolation?: number | string
	colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit"
	colorProfile?: number | string
	colorRendering?: number | string
	contentScriptType?: number | string
	contentStyleType?: number | string
	cursor?: number | string
	cx?: number | string
	cy?: number | string
	d?: string
	decelerate?: number | string
	descent?: number | string
	diffuseConstant?: number | string
	direction?: number | string
	display?: number | string
	divisor?: number | string
	dominantBaseline?: number | string
	dur?: number | string
	dx?: number | string
	dy?: number | string

	edgeMode?: "duplicate" | "wrap" | "none"

	/** (For the SVG element <feDistantLight>) Specifies the direction angle for the light source from 
	 * the XY plane towards the Z-axis, in degrees. 
	 * Note that the positive Z-axis points towards the viewer of the content.
	 */
	elevation?: number | `${number}`

	enableBackground?: (
		| "accumulate"
		| `new ${number} ${number} ${number} ${number}`
	)

	/** A semicolon-separated list of values that define an end value for the animation that can constrain the active duration.
	 * You can use this attribute with the following SVG elements: <animate>, <animateMotion>, <animateTransform>, <set>
	 * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/end
	 */
	end?: string

	/** Defines the exponent of the gamma function. You can use this attribute with the following SVG elements: 
	 * <feFuncA>, <feFuncB>, <feFuncG>, <feFuncR>
	 */
	exponent?: number | `${number}`

	/** (Deprecated) specifies whether referenced resources that are not part of the current document are required for 
	 * proper rendering of the given container or graphics element.
	 * @deprecated
	 */
	externalResourcesRequired?: boolean | `${boolean}`

	/** The fill attribute has two different meanings: 
	 * For shapes and text it's a presentation attribute that defines the color (or any SVG paint servers like gradients or patterns) used to paint the element; 
	 * for animation it defines the final state of the animation.
	 */
	fill?: CSSProperty<(
		// For shapes & text:
		| CSSColor

		// For animations
		| "freeze" //(Keep the state of the last animation frame) 
		| "remove" // (Keep the state of the first animation frame)
	)>

	/** Presentation attribute defining the opacity of the paint server (color, gradient, pattern, etc.) applied to a shape.
	 * Default value = 1
	 */
	fillOpacity?: CSSProperty<number | `${number}` | `${number}%`>

	/** Presentation attribute defining the algorithm to use to determine the inside part of a shape. */
	fillRule?: CSSProperty<(| "nonzero" | "evenodd")>

	/** Presentation attribute that specifies the filter effects defined by the <filter> element that shall be applied to its element. */
	filter?: CSSProperty<(
		| "none"
		| `url("${string}")`
		| `${"blur" | "brightness" | "contrast" | "grayscale" | "invert" | "opacity" | "saturate" | "sepia"}(${CSSLength})`
		| `drop-shadow(${string})`
		| `hue-rotate(${number}deg)`
	)>

	/** (Deprecated) Width and height of the intermediate images in pixels of a filter primitive. */
	filterRes?: `${number}` | `${number} ${number}`

	/** Coordinate system for the attributes x, y, width and height. Can be used with the following SVG elements: <filter> */
	filterUnits?: number | `${number}` | string

	/** Color to use to flood the current filter primitive subregion. 
	 * You can use this attribute with the following SVG elements: <feFlood>, <feDropShadow>
	 */
	floodColor?: CSSColor

	/** Opacity value to use across the current filter primitive subregion. 
	 * You can use this attribute with the following SVG elements: <feFlood>, <feDropShadow>
	 */
	floodOpacity?: number | `${number}` | `${number}%`

	focusable?: boolean | `${boolean}`

	/** Font family used to render text, specified as a prioritized list of font family names and/or generic family names. */
	fontFamily?: CSSProperty<string>

	fontSize?: CSSProperty<number | `${number}` | string>
	fontSizeAdjust?: number | string
	fontStretch?: number | string
	fontStyle?: "normal" | "italic" | "oblique"
	fontVariant?: "normal" | "small-caps"
	fontWeight?: number | string
	format?: number | string
	from?: number | string
	fx?: number | string
	fy?: number | string
	g1?: number | string
	g2?: number | string
	glyphName?: number | string
	glyphOrientationHorizontal?: number | string
	glyphOrientationVertical?: number | string
	glyphRef?: number | string
	gradientTransform?: string
	gradientUnits?: string
	hanging?: number | string
	horizAdvX?: number | string
	horizOriginX?: number | string
	href?: string
	ideographic?: number | string
	imageRendering?: number | string
	in2?: number | string
	in?: string
	intercept?: number | string
	k1?: number | string
	k2?: number | string
	k3?: number | string
	k4?: number | string
	k?: number | string
	kernelMatrix?: number | string
	kernelUnitLength?: number | string
	kerning?: number | string
	keyPoints?: number | string
	keySplines?: number | string
	keyTimes?: number | string
	lengthAdjust?: number | string
	letterSpacing?: number | string
	lightingColor?: number | string
	limitingConeAngle?: number | string
	local?: number | string
	markerEnd?: string
	markerHeight?: number | string
	markerMid?: string
	markerStart?: string
	markerUnits?: number | string
	markerWidth?: number | string
	mask?: string
	maskContentUnits?: number | string
	maskUnits?: number | string
	mathematical?: number | string
	mode?: number | string
	numOctaves?: number | string
	offset?: number | string
	opacity?: number | `${number}` | `${number}%`
	operator?: number | `${number}` | string
	order?: number | `${number}` | string
	orient?: number | `${number}` | string
	orientation?: number | `${number}` | string
	origin?: number | `${number}` | string
	overflow?: number | `${number}` | string
	overlinePosition?: number | string
	overlineThickness?: number | string
	paintOrder?: number | string
	panose1?: number | string
	pathLength?: number | string
	patternContentUnits?: string
	patternTransform?: number | string
	patternUnits?: string
	pointerEvents?: number | string
	points?: string
	pointsAtX?: number | string
	pointsAtY?: number | string
	pointsAtZ?: number | string
	preserveAlpha?: number | string
	preserveAspectRatio?: string
	primitiveUnits?: number | string
	r?: number | string
	radius?: number | string
	refX?: number | string
	refY?: number | string
	renderingIntent?: number | string
	repeatCount?: number | string
	repeatDur?: number | string
	requiredExtensions?: number | string
	requiredFeatures?: number | string
	restart?: number | string
	result?: string
	rotate?: number | string
	rx?: number | string
	ry?: number | string
	scale?: number | string
	seed?: number | string
	shapeRendering?: number | string
	slope?: number | string
	spacing?: number | string
	specularConstant?: number | string
	specularExponent?: number | string
	speed?: number | string
	spreadMethod?: string
	startOffset?: number | string
	stdDeviation?: number | string
	stemh?: number | string
	stemv?: number | string
	stitchTiles?: number | string
	stopColor?: string
	stopOpacity?: number | string
	strikethroughPosition?: number | string
	strikethroughThickness?: number | string
	string?: number | string
	stroke?: string
	strokeDasharray?: string | number
	strokeDashoffset?: string | number
	strokeLinecap?: "butt" | "round" | "square" | "inherit"
	strokeLinejoin?: "miter" | "round" | "bevel" | "inherit"
	strokeMiterlimit?: number | string
	strokeOpacity?: number | string
	strokeWidth?: number | string
	surfaceScale?: number | string
	systemLanguage?: number | string
	tableValues?: number | string
	targetX?: number | string
	targetY?: number | string
	textAnchor?: string
	textDecoration?: number | string
	textLength?: number | string
	textRendering?: number | string
	to?: number | string
	transform?: string
	u1?: number | string
	u2?: number | string
	underlinePosition?: number | string
	underlineThickness?: number | string
	unicode?: number | string
	unicodeBidi?: number | string
	unicodeRange?: number | string
	unitsPerEm?: number | string
	vAlphabetic?: number | string
	values?: string
	vectorEffect?: number | string
	version?: string
	vertAdvY?: number | string
	vertOriginX?: number | string
	vertOriginY?: number | string
	vHanging?: number | string
	vIdeographic?: number | string
	viewBox?: string
	viewTarget?: number | string
	visibility?: number | string
	vMathematical?: number | string
	widths?: number | string
	wordSpacing?: number | string
	writingMode?: number | string
	x1?: number | string
	x2?: number | string
	x?: number | string
	xChannelSelector?: string
	xHeight?: number | string
	xlinkActuate?: string
	xlinkArcrole?: string
	xlinkHref?: string
	xlinkRole?: string
	xlinkShow?: string
	xlinkTitle?: string
	xlinkType?: string
	xmlBase?: string
	xmlLang?: string
	xmlns?: string
	xmlnsXlink?: string
	xmlSpace?: string
	y1?: number | string
	y2?: number | string
	y?: number | string
	yChannelSelector?: string
	z?: number | string
	zoomAndPan?: string
}

export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
	download?: unknown
	href?: string
	hrefLang?: string
	media?: string
	rel?: string
	target?: string
	type?: string
}

export interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {
}

export interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
	alt?: string
	coords?: string
	download?: unknown
	href?: string
	hrefLang?: string
	media?: string
	rel?: string
	shape?: string
	target?: string
}

export interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
	href?: string
	target?: string
}

export interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
	cite?: string
}

export type ButtonHTMLAttributes<T> = HTMLAttributes<T> & {
	autofocus?: boolean
	disabled?: boolean
	form?: string
	formAction?: string
	formEncType?: string
	formMethod?: string
	formNoValidate?: boolean
	formTarget?: string
	name?: string
	type?: (
		/** The button submits the form data to the server. This is the default if the attribute is not specified for buttons associated with a <form>, or if the attribute is an empty or invalid value. */
		| "submit"

		/** The button resets all the controls to their initial values, like <input type="reset">. (This behavior tends to annoy users.) */
		| "reset"

		/** The button has no default behavior, and does nothing when pressed by default. It can have client-side scripts listen to the element's events, which are triggered when the events occur. */
		| "button"
	)
	value?: string | string[] | number
}

export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
	height?: number | string
	width?: number | string
}

export interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
	span?: number
	width?: number | string
}

export interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
	span?: number
}

export interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
	open?: boolean
}

export interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
	cite?: string
	dateTime?: string
}

export interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
	open?: boolean
}

export interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
	height?: number | string
	src?: string
	type?: string
	width?: number | string
}

export interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
	disabled?: boolean
	form?: string
	name?: string
}

export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
	/** Space-separated character encodings the server accepts. The browser uses them in the order in which they are listed. 
	 * The default value means the same encoding as the page. 
	 * (In previous versions of HTML, character encodings could also be delimited by commas.)  
	 */
	acceptCharset?: string


	/** Indicates whether input elements can by default have their values automatically completed by the browser. 
	 * autocomplete attributes on form elements override it on a <form>. 
	 */
	autocomplete?: (
		| "off" // The browser may not automatically complete entries. (Browsers tend to ignore this for suspected login forms; see Managing autofill for login fields.)
		| "on" //  The browser may automatically complete entries.	
	)

	/** The URL that processes the form submission. This value can be overridden by a formaction attribute on 
	 * a button, input with type="submit", or input with type="image" element. 
	 * This attribute is ignored when method="dialog" is set. 
	 */
	action?: string

	/** If the value of the method attribute is post, enctype is the MIME type of the form submission. */
	encType?: (
		| "application/x-www-form-urlencoded" // The default value.
		| "multipart/form-data" // Use this if the form contains <input> elements with type=file.
		| "text/plain" // Useful for debugging purposes.
	)

	/** The HTTP method to submit the form with. This value is overridden by formmethod attributes on 
	 * button, input with type="submit", or input with type="image" elements. 
	 */
	method?: (
		| "post" // The POST method; form data is sent as the request body.
		| "get" // (default) The GET method; form data is appended to the action URL with a ? separator. Use this method when the form has no side effects.
		| "dialog" // When the form is inside a <dialog>, closes the dialog and causes a submit event to be fired on submission, without submitting data or clearing the form.
	)

	name?: string

	/** Indicates that the form shouldn't be validated when submitted. If this attribute is not set 
	 * (and therefore the form is validated), it can be overridden by a formnovalidate attribute on 
	 * a <button>, <input type="submit">, or <input type="image"> element belonging to the form. 
	 */
	noValidate?: boolean

	/** Indicates where to display the response after submitting the form. It is a name/keyword for a browsing context (for example, 
	 * tab, window, or iframe).
	 */
	target?: (
		| "_self" // (default): Load into the same browsing context as the current one.
		| "_blank" // Load into a new unnamed browsing context. This provides the same behavior as setting rel="noopener" which does not set window.opener.
		| "_parent" // Load into the parent browsing context of the current one. If no parent, behaves the same as _self.
		| "_top" // Load into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one and has no parent). If no parent, behaves the same as _self.
		| "_unfencedTop" // Load the response from a form inside an embedded fenced frame into the top-level frame (i.e., traversing beyond the root of the fenced frame, unlike other reserved destinations). Only available inside fenced frames.
	)
}

export interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
	manifest?: string
}

export interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
	allow?: string
	allowFullScreen?: boolean
	allowTransparency?: boolean
	frameBorder?: number | string
	height?: number | string
	marginHeight?: number
	marginWidth?: number
	name?: string
	sandbox?: string
	scrolling?: string
	seamless?: boolean
	src?: string
	srcDoc?: string
	width?: number | string
}

export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
	alt?: string
	crossorigin?: "anonymous" | "use-credentials" | ""
	decoding?: "async" | "auto" | "sync"
	height?: number | string
	sizes?: string
	src?: string
	srcSet?: string
	useMap?: string
	width?: number | string
}

export interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
	cite?: string
	dateTime?: string
}

export type InputHTMLAttributes<T> = HTMLAttributes<T> & {
	accept?: string
	alt?: string

	autocomplete?: string
	autofocus?: boolean
	capture?: boolean | string // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
	checked?: boolean
	crossorigin?: string
	disabled?: boolean
	form?: string
	formAction?: string
	formEncType?: string
	formMethod?: string
	formNoValidate?: boolean
	formTarget?: string
	height?: number | string
	list?: string
	max?: number | string
	maxLength?: number
	min?: number | string
	minLength?: number
	multiple?: boolean
	name?: string
	pattern?: string
	placeholder?: string
	readOnly?: boolean
	required?: boolean
	size?: number
	src?: string
	step?: number | string
	type?: (
		/** A push button with no default behavior displaying the value of the value attribute, empty by default. */
		| "button"
		/** A check box allowing single values to be selected/deselected. */
		| "checkbox"
		/** A control for specifying a color; opening a color picker when active in supporting browsers. */
		| "color"
		/** A control for entering a date (year, month, and day, with no time). Opens a date picker or numeric wheels for year, month, day when active in supporting browsers.  */
		| "date"
		/**  A control for entering a date and time, with no time zone. Opens a date picker or numeric wheels for date- and time-components when active in supporting browsers. */
		| "datetime-local"
		/**  A field for editing an email address. Looks like a text input, but has validation parameters and relevant keyboard in supporting browsers and devices with dynamic keyboards. */
		| "email"
		/**  A control that lets the user select a file. Use the accept attribute to define the types of files that the control can select. */
		| "file"
		/**  A control that is not displayed but whose value is submitted to the server. There is an example in the next column, but it's hidden! */
		| "hidden"
		/**  A graphical submit button. Displays an image defined by the src attribute. The alt attribute displays if the image src is missing. */
		| "image"
		/** A control for entering a month and year, with no time zone. */
		| "month"
		/**  A control for entering a number. Displays a spinner and adds default validation. Displays a numeric keypad in some devices with dynamic keypads. */
		| "number"
		/**  A single-line text field whose value is obscured. Will alert user if site is not secure. */
		| "password"
		/** A radio button, allowing a single value to be selected out of multiple choices with the same name value. */
		| "radio"
		/**  A control for entering a number whose exact value is not important. Displays as a range widget defaulting to the middle value. Used in conjunction min and max to define the range of acceptable values. */
		| "range"
		/** A button that resets the contents of the form to default values. Not recommended. */
		| "reset"
		/**  A single-line text field for entering search strings. Line-breaks are automatically removed from the input value. May include a delete icon in supporting browsers that can be used to clear the field. Displays a search icon instead of enter key on some devices with dynamic keypads. */
		| "search"
		/** A button that submits the form.*/
		| "submit"
		/**  A control for entering a telephone number. Displays a telephone keypad in some devices with dynamic keypads. */
		| "tel"
		/**  The default value. A single-line text field. Line-breaks are automatically removed from the input value. */
		| "text"
		/** A control for entering a time value with no time zone. */
		| "time"
		/**  A field for entering a URL. Looks like a text input, but has validation parameters and relevant keyboard in supporting browsers and devices with dynamic keyboards. */
		| "url"
		/** A control for entering a date consisting of a week-year number and a week number with no time zone. */
		| "week"
	)
	value?: string | string[] | number
	width?: number | string

	onChange?: ChangeEventHandler<T>
}

export interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
	autofocus?: boolean
	challenge?: string
	disabled?: boolean
	form?: string
	keyType?: string
	keyParams?: string
	name?: string
}

export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
	form?: string
	htmlFor?: string
}

export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
	value?: string | string[] | number
}

export interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
	/** Specifies the type of content being loaded by the <link>, which is necessary for
	 * request matching, application of correct content security policy, and setting of correct Accept request header. 
	 * Required when rel="preload" has been set, optional when rel="modulepreload" has been set, and otherwise should not be used. 
	 */
	as?: string

	/** Indicates whether CORS must be used when fetching the resource.
	 * CORS-enabled images can be reused in the <canvas> element without being tainted. 
	 */
	crossorigin?: (
		| "anonymous" // A cross-origin request (i.e. with an Origin HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the Access-Control-Allow-Origin HTTP header) the resource will be tainted and its usage restricted.
		| "use-credentials" // A cross-origin request (i.e. with an Origin HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through Access-Control-Allow-Credentials HTTP header), the resource will be tainted and its usage restricted.
	)

	/** Provides a hint of the relative priority to use when fetching a resource of a particular type. */
	fetchpriority?: (
		| "high" // Fetch the resource at a high priority relative to other resources of the same type.
		| "low" // Fetch the resource at a low priority relative to other resources of the same type.
		| "auto" // Don't set a preference for the fetch priority. This is the default. It is used if no value or an invalid value is set.
	)

	href?: string
	hrefLang?: string
	integrity?: string
	media?: string
	rel?: string // ( | "preload" | "stylesheet" | "shortcut icon" | ) 
	sizes?: string
	type?: string

	/** For rel="stylesheet" only, indicates whether the described stylesheet should be loaded and applied to the document. 
	 * If disabled is specified in the HTML when it is loaded, the stylesheet will not be loaded during page load. 
	 * Instead, the stylesheet will be loaded on-demand, if and when the disabled attribute is changed to false or removed.
	 * Setting the disabled property in the DOM causes the stylesheet to be removed from the document's Document.styleSheets list.
	 */
	disabled?: boolean
}

export interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
	name?: string
}

export interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
	type?: string
}

export interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
	autoPlay?: boolean
	controls?: boolean
	controlsList?: string
	crossorigin?: string
	loop?: boolean
	mediaGroup?: string
	muted?: boolean
	playsinline?: boolean
	preload?: string
	src?: string
}

export interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
	charSet?: string
	content?: string
	httpEquiv?: string
	name?: string
}

export interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
	form?: string
	high?: number
	low?: number
	max?: number | string
	min?: number | string
	optimum?: number
	value?: string | string[] | number
}

export interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
	cite?: string
}

export interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
	classID?: string
	data?: string
	form?: string
	height?: number | string
	name?: string
	type?: string
	useMap?: string
	width?: number | string
	wmode?: string
}

export interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
	reversed?: boolean
	start?: number
	type?: '1' | 'a' | 'A' | 'i' | 'I'
}

export interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
	disabled?: boolean
	label?: string
}

export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
	disabled?: boolean
	label?: string
	selected?: boolean
	value?: string | string[] | number
}

export interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
	form?: string
	htmlFor?: string
	name?: string
}

export interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
	name?: string
	value?: string | string[] | number
}

export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
	max?: number | string
	value?: string | string[] | number
}

export interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
	/** Indicates the type of script represented. */
	type?: (
		| ""
		| "importmap"
		| "module" // The code is treated as a JS module, and processing of its contents is deferred. The charset and defer attributes have no effect. Unlike classic scripts, module scripts require the use of the CORS protocol for cross-origin fetching. 
		| "speculationrules"
		| "text/javascript"
	)

	/** The URI of an external script; this can be used as an alternative to embedding a script directly within a document. */
	src?: string

	/** Indicates that script should not be executed in browsers that support ES modules. In effect,
	 * this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code.
	 */
	nomodule?: boolean

	/** To allow error logging for sites which use a separate domain for static media, use this attribute.
	 * Normal script elements pass minimal information to the window.onerror for scripts which do not pass the standard CORS checks. 
	 * See CORS settings attributes for a more descriptive explanation of its valid arguments.
	 */
	crossorigin?: string

	/** For a classic script, indicates that it should be fetched in parallel to parsing and evaluated as soon as it is available.
	 * For a module script, causes it and all its dependencies to be fetched in parallel to parsing and evaluated as soon as they are available
	 */
	async?: boolean

	/** Indicates to browser that script should be executed after document has been parsed, but before firing DOMContentLoaded event.
	 * Scripts with the defer attribute will execute in the order in which they appear in the document.
	 */
	defer?: boolean

	/** Provides a hint of the relative priority to use when fetching an external script. */
	fetchpriority?: (
		| "high" // Fetch the external script at a high priority relative to other external scripts.
		| "low" //Fetch the external script at a low priority relative to other external scripts.
		| "auto" // Don't set a preference for the fetch priority. This is the default. It is used if no value or an invalid value is set.
	)

	/** This attribute explicitly indicates that certain operations should be blocked on the fetching of the script. 
	 * The operations that are to be blocked must be a space-separated list of blocking tokens listed below. 
	 */
	blocking?: (
		| "render" // The rendering of content on the screen is blocked.
	)

	/** Inline metadata that a user agent can use to verify that a fetched resource has been delivered without unexpected manipulation. 
	 * The attribute must not specified when the src attribute is not specified.
	 */
	integrity?: string

	/** A cryptographic nonce (number used once) to allow scripts in a script-src Content-Security-Policy. 
	 * The server must generate a unique nonce value each time it transmits a policy. 
	 * It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial.
	 */
	nonce?: string

	/** Indicates which referrer to send when fetching the script, or resources fetched by the script */
	referrerpolicy?: (
		| "no-referrer" // The Referer header will not be sent.
		| "no-referrer-when-downgrade" // The Referer header will not be sent to origins without TLS (HTTPS).
		| "origin" // The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.
		| "origin-when-cross-origin" // The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.
		| "same-origin" // A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.
		| "strict-origin" // Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).
		| "strict-origin-when-cross-origin" // (default) Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).
		| "unsafe-url" //The referrer will include the origin and the path (but not the fragment, password, or username). This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins.
	)

	charSet?: string
}

export type SelectHTMLAttributes<T> = HTMLAttributes<T> & {
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	multiple?: boolean
	name?: string
	required?: boolean
	size?: number
	value?: string | string[] | number
	onChange?: ChangeEventHandler<T>
}

export interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
	media?: string
	sizes?: string
	src?: string
	srcSet?: string
	type?: string
}

export interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
	media?: string
	nonce?: string
	scoped?: boolean
	type?: string
}

export interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
	cellPadding?: number | string
	cellSpacing?: number | string
	summary?: string
}

export interface TextAreaHTMLAttributes<T> extends HTMLAttributes<T> {
	autocomplete?: string
	autofocus?: boolean
	cols?: number
	dirName?: string
	disabled?: boolean
	form?: string
	maxLength?: number
	minLength?: number
	name?: string
	placeholder?: string
	readOnly?: boolean
	required?: boolean
	rows?: number
	value?: string | string[] | number
	wrap?: string

	onChange?: ChangeEventHandler<T>
}

export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
	align?: "left" | "center" | "right" | "justify" | "char"
	colSpan?: number
	headers?: string
	rowSpan?: number
	scope?: string
}

export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
	align?: "left" | "center" | "right" | "justify" | "char"
	colSpan?: number
	headers?: string
	rowSpan?: number
	scope?: string
}

export interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
	dateTime?: string
}

export interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
	default?: boolean
	kind?: string
	label?: string
	src?: string
	srcLang?: string
}

export interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
	height?: number | string
	playsInline?: boolean
	poster?: string
	width?: number | string
}

export interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
	allowFullScreen?: boolean
	allowpopups?: boolean
	autofocus?: boolean
	autosize?: boolean
	blinkfeatures?: string
	disableblinkfeatures?: string
	disableguestresize?: boolean
	disablewebsecurity?: boolean
	guestinstance?: string
	httpreferrer?: string
	nodeintegration?: boolean
	partition?: string
	plugins?: boolean
	preload?: string
	src?: string
	useragent?: string
	webpreferences?: string
}


//#endregion

