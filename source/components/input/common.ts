import { Tuple } from "@agyemanjp/standard"

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

/** Return input domain tuples (value/title) array */
export function inputDomainTuples<T>(choices: InputDomain<T>) {
	return choices.map(_ => [_[0], _[1] === "" ? _[0] : _[1]] as Tuple<T, string>)
}

export type InputDomain<TVal> = Tuple<TVal, string>[]
