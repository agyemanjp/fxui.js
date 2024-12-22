
import { createElement } from "../../element"
import type { CSSProperties } from "../../html/_styles"
import type { InputChoice, InputComponent, InputProps } from "./common"

export const DropdownChoiceInput: InputComponent<Props> = (props, setProps) => {
	const {
		value,
		autoRefresh,
		onValueChanged,
		choices,
		style,
		selectedItemStyle,
		optionStyle,
		children,
		...htmlProps
	} = props

	return <select
		style={{ ...style }} // size={2}
		onChange={(e) => {
			if (setProps && (autoRefresh ?? true)) setProps({ value: e.target.value })
			onValueChanged?.(e.target.value)
		}}
		{...htmlProps}>

		{choices.map((option, index) =>
			<option
				selected={option === value}
				value={typeof option === "string" ? option : option.value}
				title={typeof option === "string" ? option : option.title}
				style={{
					...option === value ? selectedItemStyle ?? {} : {},
					...optionStyle ?? {}
				}}>

				{typeof option === "string" ? option : option.title}
			</option>
		)}
	</select>
}



type Props = InputProps<string> & {
	choices: InputChoice<string>[]
	selectedItemStyle?: CSSProperties
	optionStyle?: CSSProperties
}