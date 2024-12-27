
import { createElement } from "../../element"
import type { CSSProperties } from "../../html/_styles"
import { inputDomainTuples, type InputComponent, type InputDomain, type InputProps } from "./common"

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

		{inputDomainTuples(choices).map((option, index) =>
			<option
				selected={option[0] === value}
				value={option[0]}
				title={option[1]}
				style={{
					...option[0] === value ? selectedItemStyle ?? {} : {},
					...optionStyle ?? {}
				}}>

				{typeof option === "string" ? option : option[1]}
			</option>
		)}
	</select>
}


type Props = InputProps<string> & {
	choices: InputDomain<string>
	selectedItemStyle?: CSSProperties
	optionStyle?: CSSProperties
}