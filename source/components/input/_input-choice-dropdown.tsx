
import { createElement } from "../../element"
import type { CSSProperties } from "../../html/_styles"
import type { InputChoice, InputComponent, InputProps } from "./common"

export const DropdownChoiceInput: InputComponent<Props> = (props, setProps) => {
	const {
		autoRefresh,
		value,
		onValueChanged,
		choices,
		style,
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
				// style={{ color: props.disabledIndexes && props.disabledIndexes.indexOf(index) !== -1 ? "gray" : "black" }}
				// disabled={props.disabledIndexes && props.disabledIndexes.indexOf(index) !== -1 ? true : undefined}
				value={typeof option === "string" ? option : option.value}
				title={typeof option === "string" ? option : option.title}>

				{typeof option === "string" ? option : option.title}
			</option>
		)}
	</select>
}



type Props = InputProps<string> & {
	choices: InputChoice<string>[]
	selectedItemStyle?: CSSProperties
}