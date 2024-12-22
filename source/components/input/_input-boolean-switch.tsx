import { getIdUnique } from "@agyemanjp/standard"
import { createElement, type InputComponent, type InputProps } from "../../"


export const SwitchUI: InputComponent<Props> = props => {
	const {
		onValueChanged,
		value,
		caption,
		style,
		children,
		...restOfProps
	} = props

	const inputClassId = getIdUnique()

	return <label>
		<style>
			{`
				.${inputClassId} {
					appearance: none;
					position: relative;
					display: inline-block;
					background: lightgrey;
					height: 1.65rem;
					width: 2.75rem;
					vertical-align: middle;
					border-radius: 2rem;
					box-shadow: 0px 1px 3px #0003 inset;
					transition: 0.25s linear background;
				}
		
				.${inputClassId}::before {
					content: "";
					display: block;
					width: 1.25rem;
					height: 1.25rem;
					background: #fff;
					border-radius: 1.2rem;
					position: absolute;
					top: 0.2rem;
					left: 0.2rem;
					box-shadow: 0px 1px 3px #0003;
					transition: 0.25s linear transform;
					transform: translateX(0rem);
				}

				.${inputClassId}:focus {
					outline: none;
				}
				.${inputClassId}:focus-visible {
					outline: 2px solid dodgerblue;
					outline-offset: 2px;
				}

				:checked {
					background: green;
				}
				:checked::before {
					transform: translateX(1rem);
				}
			`}
		</style>
		<input type="checkbox"
			checked={value}
			onChange={(e) => { onValueChanged?.(e.target.checked) }}
			className={inputClassId} {...restOfProps}>
			::before
		</input>

		{caption ?? ""}
	</label>
}

SwitchUI.pure = true
SwitchUI.defaultProps = {
	style: {
		backgroundColor: "white",
		background: "white"
	}
}

type Props = InputProps<boolean> & {
	// isChecked?: boolean
	caption?: string
	// name?: string
}