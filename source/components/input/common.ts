import { isArray } from "@agyemanjp/standard"

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

/** Return input domain values array */
export function inputDomainValues<T>(choices: InputDomain<T>) {
	return isArray(choices)
		? choices.map(choice => choice.value)
		: choices.values
}

/** Return input domain tuples (value/title) array */
export function inputDomainTuples<T>(choices: InputDomain<T>) {
	return isArray(choices)
		? choices
		: choices.values.map(v => ({ value: v, title: String(v) }))
}

export type InputDomain<TVal> = { values: TVal[] } | ({ value: TVal, title: string }[])
