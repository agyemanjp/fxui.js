import { isObject } from "@agyemanjp/standard"

import { createElement, inputDomainTuples, StackPanel, type CSSProperties } from "../../"
import type { InputDomain, InputComponent, InputProps } from "./common"
import { View, type ViewProps } from "../misc/_view"

export const InputChoiceButtons: InputComponent<InputChoiceProps<string> & PropsCommon> = ((props, setProps) => {
	const {
		value,
		onValueChanged,
		autoRefresh,
		domain,
		layout,
		orientation,
		selectedItemStyle,
		itemStyle,
		style,
		disabled,
		children,
		...restOfProps
	} = props

	return <View
		sourceData={(domain) ?? []}
		itemTemplate={_ => {
			const { value: choice, children, index } = _

			const selected = choice[0] === value
			// console.log(`selected: ${choiceValue === value}`)

			return <StackPanel itemsAlignH="center" itemsAlignV="center"
				onClick={(e) => {
					// console.log(`onClick of InputChoiceButtons: ${choiceValue}`)
					if (setProps && (autoRefresh ?? true)) setProps({ value: choice[0] })
					onValueChanged?.(choice[0])
				}}
				style={{
					// default
					height: "2rem",
					padding: "0.25rem",
					backgroundPosition: "0 -90px",
					borderLeft: "thin solid purple",
					textAlign: "center",
					cursor: "pointer",

					...itemStyle,
					...(selected
						? {
							backgroundColor: "purple",
							color: "white",
							...selectedItemStyle
						}
						: {}
					)
				}}>

				{choice[1]}
			</StackPanel>
		}}
		layout={layout ?? StackPanel}
		orientation={orientation}
		style={{
			border: "thin solid silver",
			borderRadius: "1rem",
			overflow: "hidden",
			...style
		}}
		{...restOfProps}
	/>
}) //satisfies (InputComponent<any>)

/** Basic props for input element with single-selection choices */
export type InputChoiceProps<TVal = string> = InputProps<TVal> & {
	domain: InputDomain<TVal>
	selectedItemStyle?: CSSProperties
}

export const InputMultiChoiceButtons: InputComponent<InputMultiChoiceProps<string> & PropsCommon> = ((props, setProps) => {
	const {
		value,
		onValueChanged,
		autoRefresh,
		domain,
		layout,
		orientation,
		selectedItemStyle,
		itemStyle,
		selectAllLabel,
		style,
		disabled,
		children,
		...restOfProps
	} = props

	const domainTuples = inputDomainTuples(domain)

	return <View
		sourceData={[...domainTuples, ...(selectAllLabel ? [selectAllLabel, ""] : [])]}
		layout={layout ?? StackPanel}
		orientation={orientation}
		itemTemplate={_ => {
			const { value: choice, index } = _

			const selected = (value ?? []).includes(choice[0])
			const selectAll = (selectAllLabel && index === domain.length)
			// console.log(`selected: ${selected}`)

			return <div
				onClick={(e) => {
					// console.log(`onClick of InputChoiceButtons: ${choiceValue}`)
					const effectiveValue = value ?? []
					const newValues = selectAll
						? domain.map(_ => _[0]) // select all choices
						: effectiveValue.includes(choice[0])
							? effectiveValue.filter(_ => _ !== choice[0])
							: [...effectiveValue, choice[0]]

					if (setProps && (autoRefresh ?? true)) setProps({ value: newValues })
					onValueChanged?.(newValues)
				}}
				style={{
					height: "2rem",
					padding: "0.25rem",
					backgroundPosition: "0 -90px",
					borderLeft: "thin solid silver",
					textAlign: "center",
					cursor: "pointer",

					...itemStyle,
					...(selected ? selectedItemStyle : {}),
					fontStyle: selectAll ? "italic" : "normal"
				}}>
				{choice[1]}
			</div>
		}}
		style={{
			border: "thin solid silver",
			borderRadius: "1rem",
			overflow: "hidden",
			...style
		}}
		{...restOfProps}
	/>
}) //satisfies (InputComponent<any>)

/** Basic props for input element with multiple-selection choices */
export type InputMultiChoiceProps<TVal = string> = InputProps<TVal[]> & {
	domain: InputDomain<TVal>
	selectedItemStyle?: CSSProperties

	/** Label for optional select all button */
	selectAllLabel?: string
}

type PropsCommon = Pick<ViewProps, "layout" | "orientation" | "itemsAlignH" | "itemsAlignV" | "itemStyle">


/* const inputChoiceStyles = {
		button: {
			// minWidth: "5rem",
			height: "2rem",
			padding: "0.25rem",
			backgroundPosition: "0 -90px",
			borderLeft: "thin solid purple",
			textAlign: "center",
			// textDecorationLine: "underline",
			cursor: "pointer"
		},
		selectedButton: {
			backgroundColor: "purple",
			color: "white"
		},
		main: {
			// padding: "0.1rem",
			border: "thin solid purple",
			// width: "260px",
			// boxShadow: "0 0 30px 0px #d1d1d1",
			borderRadius: "1rem",
			overflow: "hidden",
		}
	}
*/
