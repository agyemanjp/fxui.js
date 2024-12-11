
/** Checks if a string matches an (uppercase) event name */
export function isEventKey(key: string) {
	const lower = key.toLowerCase()
	return lower.startsWith("on") && eventNames.includes(lower as EventName)
}

/** Names of inline HTML/DOM events */
export const eventNames = [
	"onabort",
	// "onafterprint",
	"onanimationend",
	"onanimationiteration",
	"onanimationstart",
	// "onbeforeprint",
	// "onbeforeunload",
	"onblur",
	"oncanplay",
	"oncanplaythrough",
	"onchange",
	"onclick",
	"oncontextmenu",
	"oncopy",
	"oncut",
	"ondblclick",
	"ondrag",
	"ondragend",
	"ondragenter",
	"ondragleave",
	"ondragover",
	"ondragstart",
	"ondrop",
	"ondurationchange",
	"onemptied",
	"onended",
	"onerror",
	"onfocus",
	// "onfocusin",
	// "onfocusout",
	"onformdata",
	// "onhashchange",
	"oninput",
	"oninvalid",
	"onkeydown",
	"onkeypress",
	"onkeyup",
	"onload",
	"onloadeddata",
	"onloadedmetadata",
	"onloadstart",
	// "onmessage",
	"onmousedown",
	"onmouseenter",
	"onmouseleave",
	"onmousemove",
	"onmouseout",
	"onmouseover",
	"onmouseup",
	// "onoffline",
	// "ononline",
	// "onpagehide",
	// "onpageshow",
	"onpaste",
	"onpause",
	"onplay",
	"onplaying",
	"onprogress",
	"onratechange",
	"onresize",
	"onreset",
	"onscroll",
	// "onsearch",
	"onseeked",
	"onseeking",
	"onselect",
	"onstalled",
	// "onstorage",
	"onsubmit",
	"onsuspend",
	"ontimeupdate",
	"ontoggle",
	"ontransitionend",
	// "onunload",
	"onvolumechange",
	"onwaiting",
	"onwheel",
	"ontouchcancel",
	"ontouchend",
	"ontouchmove",
	"ontouchstart"
] as const

export type EventName = (typeof eventNames)[number]


//#region Event Handlers
export type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>
export type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>
export type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>
export type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>
export type FormEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>
export type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>
export type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>
export type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>
export type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>
export type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>
export type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>
export type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>
export type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>
export type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>
export type GeneralEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>
export type EventHandler<E extends SyntheticEvent<any> = SyntheticEvent<any>> = {
	bivarianceHack(event: E): void
}["bivarianceHack"]
// export type EventHandler<Ev extends SyntheticEvent<unknown> = SyntheticEvent<unknown>> = (
// 	eventInfo: Ev, setState: <T extends Rec>(newState: T) => void
// ) => void
//#endregion


//#region Event Infos
export interface ClipboardEvent<T = Element> extends SyntheticEvent<T> {
	clipboardData: DataTransfer
	nativeEvent: Event
}
export interface CompositionEvent<T = Element> extends SyntheticEvent<T> {
	data: string
	nativeEvent: Event
}
export interface DragEvent<T = Element> extends MouseEvent<T> {
	dataTransfer: DataTransfer
	nativeEvent: Event
}
export interface PointerEvent<T = Element> extends MouseEvent<T> {
	pointerId: number
	pressure: number
	tiltX: number
	tiltY: number
	width: number
	height: number
	pointerType: 'mouse' | 'pen' | 'touch'
	isPrimary: boolean
	nativeEvent: Event
}
export interface FocusEvent<T = Element> extends SyntheticEvent<T> {
	nativeEvent: Event
	relatedTarget: EventTarget
	target: EventTarget & T
}
export interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
	target: EventTarget & T
}
export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
	target: EventTarget & T
}
export interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {
	altKey: boolean
	charCode: number
	ctrlKey: boolean
	/**
	 * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible
	 * values
	 */
	key: string
	keyCode: number
	locale: string
	location: number
	metaKey: boolean
	nativeEvent: Event
	repeat: boolean
	shiftKey: boolean
	which: number

	/**
	 * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
	 * (case-sensitive) arguments to this method.
	 */
	getModifierState(key: string): boolean
}
export interface MouseEvent<T = Element> extends SyntheticEvent<T> {
	altKey: boolean
	button: number
	buttons: number
	clientX: number
	clientY: number
	ctrlKey: boolean
	metaKey: boolean
	nativeEvent: Event
	pageX: number
	pageY: number
	relatedTarget: EventTarget
	screenX: number
	screenY: number
	shiftKey: boolean

	/**
	 * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
	 * (case-sensitive) arguments to this method.
	 */
	getModifierState(key: string): boolean
}
export interface TouchEvent<T = Element> extends SyntheticEvent<T> {
	altKey: boolean
	changedTouches: TouchList
	ctrlKey: boolean
	metaKey: boolean
	nativeEvent: Event
	shiftKey: boolean
	targetTouches: TouchList
	touches: TouchList

	/**
	 * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid
	 * (case-sensitive) arguments to this method.
	 */
	getModifierState(key: string): boolean
}
export interface UIEvent<T = Element> extends SyntheticEvent<T> {
	detail: number
	nativeEvent: Event
	view: {
		styleMedia: StyleMedia
		document: Document
	}
}
export interface WheelEvent<T = Element> extends MouseEvent<T> {
	deltaMode: number
	deltaX: number
	deltaY: number
	deltaZ: number
	nativeEvent: Event
}
export interface AnimationEvent<T = Element> extends SyntheticEvent<T> {
	animationName: string
	elapsedTime: number
	nativeEvent: Event
	pseudoElement: string
}
export interface TransitionEvent<T = Element> extends SyntheticEvent<T> {
	elapsedTime: number
	nativeEvent: Event
	propertyName: string
	pseudoElement: string
}
export interface SyntheticEvent<T = Element> {
	bubbles: boolean
	/** A reference to the element on which the event listener is registered. */
	currentTarget: EventTarget & T
	cancelable: boolean
	defaultPrevented: boolean
	eventPhase: number
	isTrusted: boolean
	nativeEvent: Event
	// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/12239
	/** A reference to the element from which the event was originally dispatched.
	 * This might be a child element to the element on which the event listener is registered.
	 * @see currentTarget
	 */
	target: EventTarget
	timeStamp: number
	type: string

	preventDefault(): void

	isDefaultPrevented(): boolean

	// If you thought this should be `EventTarget & T`, see

	stopPropagation(): void

	isPropagationStopped(): boolean

	persist(): void
}
//#endregion

