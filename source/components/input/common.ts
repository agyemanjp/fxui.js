import { isObject } from "@agyemanjp/standard"

import type { CSSProperties } from "../../html"
import type { Component } from "../../common"

/** Basic props for input element */
export type InputProps<TVal/*, X extends Rec | undefined = undefined*/> = {
	value?: TVal
	onValueChanged?: (newVal: TVal/*, xtra: X*/) => any
	/** Auto update UI locally? Otherwise defer update to parent */
	autoRefresh?: boolean
	style?: CSSProperties
	disabled?: boolean
	children?: never
}

/** Basic props for input element with single-selection choices */
export type InputChoiceProps<TVal = string> = InputProps<TVal> & {
	choices: (TVal /*| [TVal, string]*/ | { value: TVal, title: string })[]
	selectedItemStyle?: CSSProperties
}

/** Basic props for input element with multiple-selection choices */
export type InputMultiChoiceProps<TVal = string> = InputChoiceProps<TVal[]> & {
	choices: (TVal | { value: TVal, title: string })[]
}


export type InputComponent<P extends InputProps<any>> = Component<P>

export function normalizedChoices<T>(choices: InputChoiceProps<T>["choices"]) {
	return choices.map(choice => (isObject(choice) && "value" in choice) ? choice.value : choice)
}