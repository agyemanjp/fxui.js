import { isObject } from "@agyemanjp/standard"

import type { CSSProperties } from "../../html"
import type { Component } from "../../common"

export type InputComponent<P extends InputProps<any>> = Component<P>

/** Basic props for input element */
export type InputProps<TVal> = {
	value?: TVal
	onValueChanged?: (newVal: TVal) => any
	style?: CSSProperties
	disabled?: boolean
	children?: never

	/** Auto update UI locally? Otherwise defer update to parent */
	autoRefresh?: boolean
}

/** Return input choices normalized to an array of the core type */
export function normalizedChoices<T>(choices: InputChoice<T>[]) {
	return choices.map(choice => (isObject(choice) && "value" in choice) ? choice.value : choice)
}

export type InputChoice<TVal> = (TVal | { value: TVal, title: string })
