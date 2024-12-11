// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import assert from "assert"
import { it, describe } from "bun:test"
import { stringify, type Rec } from "@agyemanjp/standard"

import { createElement, getChildren, isComponentElt, isProperElt, isIntrinsicElt, StackPanel, getLeaf, type Component } from "../source"

const SplashPage: Component<Rec> = () => createElement("div", {}, "Splash page")
const Layout: Component<{ user?: { displayName: string; id: string } | undefined }> = (props) => {
	const { user, children } = props
	return StackPanel({
		id: "root", orientation: "vertical", style: { padding: "0", margin: "0" }, children: [
			StackPanel({
				id: "header",
				itemsAlignH: "uniform",
				itemsAlignV: "center",
				style: { backgroundColor: "purple", width: "100vw", height: "10vh" },
				children: [
					StackPanel({
						id: "user-info",
						style: { padding: "0.25em", color: "whitesmoke" },
						children: [
							user
								? StackPanel({
									style: { gap: "10%" }, children: [
										createElement("span", {}, `Welcome, ${user.displayName}`),
										createElement("a", { href: "/logout" }, "LOGOUT")
									]
								})

								: createElement("a", { href: "/auth/google" }, "LOGIN")

						]
					})
				]
			}),

			StackPanel({
				id: "content",
				style: { backgroundColor: "whitesmoke", height: "75vh" },
				children
			}),

			StackPanel({ id: "footer", style: { height: "10vh" } })
		]
	})
}


describe("ELEMENT MODULE", () => {
	describe("isComponentElt", () => {
		it("should return true for a component UI element", async () => assert(isComponentElt(createElement(SplashPage, {}))))
	})

	describe("isEltProper", () => {
		it("should work for a component element with children", async () => {
			const elt = StackPanel({ children: createElement("span", {}, "hello") })
			assert(isProperElt(elt))
		})

		it("should return false for a primitive value", async () => {
			assert(!isProperElt("3"))
			assert(!isProperElt("abc"))
		})
	})

	describe("getLeaf", () => {
		/*it("should work for a component element with children", async () => {
			const trace = getLeaf(
				createElement(StackPanel, { orientation: "horizontal" }, createElement("input", { type: "text" })),
				{ parentChildPath: [], intrinsificationIndex: 0, siblingOrdinalIndex: 0 }
			)

			assert.strictEqual(typeof trace, "object")
			assert.deepStrictEqual(trace, {
				type: "div",
				props: {
					style: {
						alignItems: 'initial',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'initial'
					}
				},
				children: [{
					type: "input",
					props: { type: "text" },
					children: []
				}]
			})
		})*/

		it("should work for a complex component", async () => {
			const leaf = getLeaf(
				createElement(Layout, {}, createElement(SplashPage, {})),
				{ parentChildPath: [], intrinsificationIndex: 0, siblingOrdinalIndex: 0 }
			)

			assert(typeof leaf !== "undefined", "Leaf element is undefined")
			assert(isIntrinsicElt(leaf), `Leaf element ${stringify(leaf)} is not intrinsic`)
			assert.strictEqual(leaf.type.toUpperCase(), "DIV")
		})

		/*it("should trace with leaf set to the same intrinsic element, when passed an intrinsic element", async () => {
			const leaf = getLeaf(
				createElement("div", { className: "clss", style: { backgroundColor: "blue" } }, "val"),
				{ parentChildPath: [], intrinsificationIndex: 0, siblingOrdinalIndex: 0 }
			)

			assert.strictEqual(typeof leaf, "object")
			assert.deepStrictEqual(leaf, {
				type: "div",
				props: { className: "clss", style: { backgroundColor: "blue" } },
				children: ["val"]
			})
		})*/
	})
})
