import { getIdUnique, type OmitX } from "@agyemanjp/standard"

import { createElement, Fragment, type InputComponent, type InputHTMLAttributes, type InputProps } from "../.."

export const InputText: InputComponent<Props> = (props, setProps) => {
	const {
		type,
		value,
		onValueChanged,
		autoRefresh,
		choices,
		style,
		children,
		...htmlProps
	} = props

	const id = props.id ?? getIdUnique()

	return type === "long-text"
		? <textarea value={value} style={style} />
		: <>
			<input
				type={type ?? "text"}
				value={value}
				list={`list-${id}`}
				onChange={(e) => { onValueChanged?.(e.target.value) }}
				style={{ ...style }}
				{...htmlProps}
			/>

			{choices && choices.length > 0
				? <datalist id={`list-${id}`}>
					{choices.map((option, index) =>
						<option value={option} title={option}>{option}</option>
					)}
				</datalist>
				: <></>
			}
		</>
}


type Props = InputProps<string> & OmitX<InputHTMLAttributes<HTMLInputElement>, "type"> & {
	choices?: string[]
	type?: "long-text" | "text" | "number" | "email" | "password" | "date" | "time" | "datetime-local" | "month" | "week" | "color" | "url" | "tel" | "range"
}