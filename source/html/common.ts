export function createDOMElement(htmlString: string) {
	const range = document.createRange()
	range.selectNode(document.body) // Reference the body element
	const documentFragment = range.createContextualFragment(htmlString)
	return documentFragment.firstChild
}

/** Encode html string */
export function encodeHTML(str: string): string {
	return str.replace(/[&<>"']/g, (match) => {
		switch (match) {
			case "&":
				return "&amp;"
			case "<":
				return "&lt;"
			case ">":
				return "&gt;"
			case '"':
				return "&quot;"
			case "'":
				return "&#39;"
			default:
				return ""
		}
	})
}

/*export const encodeHTMLEntities = (s: string) => s.replace(/[\u00A0-\u9999<>&]/g, i => '&#' + i.charCodeAt(0) + ';')
export const decodeHTMLEntities = (str: string) => {
	if (str && typeof str === 'string') {
		str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
		str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
	}
	return str
}*/

/*const spinner = createElementFromHTML(`
		<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#3b82f6">
			<circle cx="50" cy="50" r="0">
				<animate
					attributeName="r"
					from="0"
					to="40"
					dur="1.5s"
					repeatCount="indefinite"
					begin="0s"
					fill="freeze" />
				<animate
					attributeName="opacity"
					from="1"
					to="0"
					dur="1.5s"
					repeatCount="indefinite"
					begin="0s"
					fill="freeze" />
			</circle>
			<circle cx="50" cy="50" r="0">
				<animate
					attributeName="r"
					from="0"
					to="40"
					dur="1.5s"
					repeatCount="indefinite"
					begin="0.75s"
					fill="freeze" />
				<animate
					attributeName="opacity"
					from="1"
					to="0"
					dur="1.5s"
					repeatCount="indefinite"
					begin="0.75s"
					fill="freeze" />
			</circle>
		</svg>`
	)
*/