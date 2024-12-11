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
		it("should work for a component element with children", async () => {
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
			}/* as IntrinsicElement*/)
		})

		it("should work for a complex component", async () => {
			const leaf = getLeaf(
				createElement(Layout, {}, createElement(SplashPage, {})),
				{ parentChildPath: [], intrinsificationIndex: 0, siblingOrdinalIndex: 0 }
			)

			assert(typeof leaf !== "undefined", "Leaf element is undefined")
			assert(isIntrinsicElt(leaf), `Leaf element ${stringify(leaf)} is not intrinsic`)
			assert.strictEqual(leaf.type.toUpperCase(), "DIV")
		})

		it("should trace with leaf set to the same intrinsic element, when passed an intrinsic element", async () => {
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
		})
	})

	/*describe("updateResultAsync", function () {
		it("should not mutate input element", async function () {
			const elt: ComponentElement = createElement(SplashPage, {})
			const augmented = await updateResultAsync(elt)
			assert.notStrictEqual(elt, augmented)
		})
		it("should retain original non-result members in augmented object returned", async function () {
			const elt = createElement(SplashPage, {})
			const membersOrig = pick(elt, "children", "type", "props")
			const augmented = await updateResultAsync(elt)
			const membersNew = pick({ ...augmented }, "children", "type", "props")
			assert.deepStrictEqual(membersOrig, membersNew)
		})
		it("should change an already existing result member for a stateless component", async function () {
			const elt = createElement(SplashPage, {})
			const augmented = await updateResultAsync(elt)
			assert.notStrictEqual(augmented.result, (await updateResultAsync(augmented)).result)
		})
		it("should return correct result member for a regular function component", async function () {
			const elt = createElement(SplashPage, {})
			const componentResult = (await updateResultAsync(elt)).result
			assert(!("generator" in componentResult), `Regular function component result has "generator" member`)
			// assert(!isAsyncIterable(componentResult))
			assert.deepStrictEqual(componentResult.element, {
				type: "div",
				props: {},
				children: ["Splash page"]
			})
		})
		it("should return correct result member for an async generator component", async function () {
			const Selector: Component<{ selectedIndex?: number, selectedStyle?: CSSProperties }> = function* (props) {
				const { selectedIndex, selectedStyle, children } = props
				while (true) {
					yield createElement(
						StackPanel,
						{ orientation: "vertical", style: { padding: 0, margin: 0 } },
						(children !== undefined ? Array.isArray(children) ? children : [children] : [])
							.map((child, i) => createElement("div", { style: i === selectedIndex ? selectedStyle : {} }, child))
					)
				}
			}
			const elt = createElement(Selector,
				{ selectedStyle: { color: "orange" } },
				createElement(SplashPage, {}),
				createElement("div", {}, "Hello")
			)

			const updatedResult = (await updateResultAsync(elt)).result
			assert("generator" in updatedResult, `Element result missing 'generator' property`)
			assert(isGenerator(updatedResult.generator), `Element result's 'generator' property is not a generator`)
			// assert("next" in updatedResult, `Element result missing 'next' property`)

			// console.log(`Result Generator: ${augmentedResult.generator}`)
			// console.log(`Result Next: ${augmentedResult.next}`)

			assert(isComponentElt(updatedResult.element), `Result element is not a component element`)
			assert.strictEqual(updatedResult.element.type, StackPanel, `Result element is not a 'StackPanel' element`)
			assert.strictEqual(getChildren(updatedResult.element).length, 2)
			assert.deepStrictEqual(updatedResult.element.props, {
				// id: "root",
				orientation: "vertical",
				style: { padding: 0, margin: 0 },
				uniqueKey: undefined
			})
		})
	})*/

	/*describe("updateTraceAsync", function () {
		it("avoids mutating input trace by returning a new reference", async function () {
			const trace = traceToLeaf(createElement(SplashPage, {}))
			const newTrace = await updateTraceAsync(trace)
			assert.notStrictEqual(trace, newTrace)
		})

		it("should not have any duplicate elements in output trace", async function () {
			const trace = traceToLeaf(Layout({ children: [createElement(SplashPage, {})] }))
			assert.strictEqual(trace.componentElts.length, [...unique(trace.componentElts)].length)
			assert.ok(true)
		})
	})*/
})
