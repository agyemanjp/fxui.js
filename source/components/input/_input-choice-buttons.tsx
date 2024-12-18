import { isObject } from "@agyemanjp/standard"

import { createElement, StackPanel } from "../../"
import type { InputChoiceProps, InputComponent, InputMultiChoiceProps } from "./common"
import { View, type ViewProps } from "../misc/_view"

export const InputChoiceButtons: InputComponent<InputChoiceProps<string> & PropsCommon> = ((props, setProps) => {
	const {
		value,
		onValueChanged,
		autoRefresh,
		choices,
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
		sourceData={choices ?? []}
		itemTemplate={_ => {
			const { value: choice, children, index } = _
			const choiceValue = isObject(choice) ? choice.value : choice
			const choiceTitle = isObject(choice) ? choice.title : choice

			const selected = choiceValue === value
			// console.log(`selected: ${choiceValue === value}`)

			return <div
				onClick={(e) => {
					// console.log(`onClick of InputChoiceButtons: ${choiceValue}`)
					if (setProps && (autoRefresh ?? true)) setProps({ value: choiceValue })
					onValueChanged?.(choiceValue)
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
				{choiceTitle}
			</div>
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

export const InputMultiChoiceButtons: InputComponent<InputMultiChoiceProps<string> & PropsCommon> = ((props, setProps) => {
	const {
		value,
		onValueChanged,
		autoRefresh,
		choices,
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
		sourceData={choices ?? []}
		itemTemplate={_ => {
			const { value: choice, children, index } = _
			const choiceValue = isObject(choice) ? choice.value : choice
			const choiceTitle = isObject(choice) ? choice.title : choice

			const selected = (value ?? []).includes(choiceValue)
			// console.log(`selected: ${selected}`)

			return <div
				onClick={(e) => {
					// console.log(`onClick of InputChoiceButtons: ${choiceValue}`)
					const effectiveValue = value ?? []
					const newValues = effectiveValue.includes(choiceValue)
						? effectiveValue.filter(_ => _ !== choiceValue)
						: [...effectiveValue, choiceValue]

					if (setProps && (autoRefresh ?? true)) setProps({ value: newValues })
					onValueChanged?.(newValues)
				}}
				style={{ ...itemStyle, ...(selected ? selectedItemStyle : {}) }}>
				{choiceTitle}
			</div>
		}}
		layout={layout ?? StackPanel}
		orientation={orientation}
		style={{ ...style }}
		{...restOfProps}
	/>
}) //satisfies (InputComponent<any>)


type PropsCommon = Pick<ViewProps, "layout" | "orientation" | "itemsAlignH" | "itemsAlignV" | "itemStyle">