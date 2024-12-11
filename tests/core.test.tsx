import { it, describe } from "bun:test"
import assert from "assert"

import { expect, use } from "chai"
import { default as chaiHTML } from "chai-html"


import {
	createElement, Fragment,
	normalizeChildren, renderToString,
	StackPanel, View,
	type Component, type CSSProperties
} from "../source"
import { normalizeHTML } from "./utils"

const SplashPage: Component<{}> = props => createElement("div", {}, "Splash page")
const Layout: Component<{ user?: User }> = (props) => {
	// console.log(`Starting layout component render`)
	const { user, children } = props
	return createElement(
		StackPanel,
		{
			id: "root",
			orientation: "vertical",
			style: { padding: "0", margin: "0" }
		},
		createElement(
			StackPanel,
			{
				id: "header",
				itemsAlignH: "uniform",
				itemsAlignV: "center",
				style: { backgroundColor: "purple", width: "100vw", height: "10vh" }
			},
			// Logo({}),
			createElement(
				StackPanel,
				{
					id: "user-info",
					style: { padding: "0.25em", color: "whitesmoke" }
				},
				user
					? createElement(
						StackPanel,
						{ style: { gap: "10%" } },
						createElement("span", {}, `Welcome, ${user.displayName}`),
						createElement("a", { href: "/logout" }, "LOGOUT")
					)
					: createElement("a", { href: "/auth/google" }, "LOGIN")
			)
		),
		createElement(
			StackPanel,
			{
				id: "content",
				style: { backgroundColor: "whitesmoke", height: "75vh" } as CSSProperties
			},
			...normalizeChildren(children)
		),
		createElement(
			StackPanel,
			{
				id: "footer",
				style: { height: "10vh" }
			}
		)
	)
}
/*const Logo = createIcon(<svg id="Layer_1"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 122.88 78.97">

	<title>logo</title>
	<path
		fillRule="evenodd"
		d="M2.08,0h120.8V79H0V0ZM15.87,39.94a2.11,2.11,0,1,1,0-4.21h25l3.4-8.51a2.1,2.1,0,0,1,4,.39l5.13,20L60.71,11a2.11,2.11,0,0,1,4.14,0l6,22,4.76-10.5a2.1,2.1,0,0,1,3.86.08L84.55,35H107a2.11,2.11,0,1,1,0,4.21H83.14a2.12,2.12,0,0,1-2-1.32l-3.77-9.24L72.28,40h0a2.09,2.09,0,0,1-3.93-.31L63.09,20.5l-7.38,37h0a2.1,2.1,0,0,1-4.09.1L45.76,34.75l-1.48,3.72a2.11,2.11,0,0,1-2,1.47ZM4.15,4.15H118.73V64.29H4.15V4.15ZM55.91,69.27h11a2.1,2.1,0,0,1,0,4.2h-11a2.1,2.1,0,0,1,0-4.2Zm19,0h2a2.1,2.1,0,0,1,0,4.2h-2a2.1,2.1,0,0,1,0-4.2ZM46,69.27h2a2.1,2.1,0,0,1,0,4.2H46a2.1,2.1,0,0,1,0-4.2Z"
	/>
</svg>)*/

type User = {
	id: string, // The unique identifier for the user.
	displayName: string, // The display name of the user.
	emailAddress: string, // The email address of the user. Optional.
	imageUrl: string, // The URL of the user's image. Optional.
	provider: "google" | "microsoft" | "dropbox" | "amazon" | "facebook" | "twitter", //  The provider of the user account.
	refreshToken: string, // The refresh token associated with the user's authentication.
	accessToken: string, // The access token associated with the user's authentication.
}


describe("CORE MODULE", () => {
	use(chaiHTML)

	describe("createElement", async () => {
		it("should create a element with props and children corresponsing to the arguments passed", async () => {
			const elt = createElement(View as Component<any>, { sourceData: [], itemsPanel: StackPanel })

			assert.deepStrictEqual(elt.props, { sourceData: [], itemsPanel: StackPanel })
			assert.deepStrictEqual(elt.children, [])
		})
		it("should convert missing props and children arguments into empty object and array, respectively", async () => {
			const elt = createElement("div", {})

			assert.deepStrictEqual(elt.props, {})
			assert.deepStrictEqual(elt.children, [])
		})
	})

	describe("renderToString()", () => {
		it("returns an empty string input unchanged", async () => {
			assert.strictEqual(renderToString(""), "")
		})
		it("discards fragment tags", async () => {
			assert.strictEqual(renderToString(<>Test</>), `Test`)

			const expected = `<div style="display: flex; flex-direction: row; justify-content: initial; align-items: initial">
				<input type="text"/>
			</div>`
			const actual = renderToString(<><StackPanel orientation="horizontal">
				<input type="text" />
			</StackPanel></>)
			expect(normalizeHTML(expected)).html.to.equal(normalizeHTML(actual))
		})
		it("works for intrinsic elements without properties or children", async () => {
			assert.strictEqual(renderToString(createElement("div", {})), `<div></div>`)
			assert.strictEqual(renderToString(createElement("abbr", {})), `<abbr></abbr>`)
		})
		it("works for an intrinsic element with a single child but without properties", async () => {
			const actual = renderToString(createElement("div", {}, "Splash page"))
			const expected = `<div>Splash page</div>`
			expect(expected).html.to.equal(actual)
		})
		it("works for an intrinsic element with multiple children, but without properties", async () => {
			const actual = renderToString(
				createElement(
					"div",
					{},
					createElement("span", {}, "first"),
					createElement("span", {}, "second")
				)
			)
			const expected = `<div><span>first</span><span>second</span></div>`
			expect(expected).html.to.equal(actual)

		})
		it("works for an intrinsic element with array children, but without properties", async () => {
			const actual = renderToString(
				createElement(
					'div',
					{},
					createElement('span', {}, 'first'),
					"second,",
					"third"
				)
			)
			const expected = `<div><span>first</span>second,third</div>`
			expect(expected).html.to.equal(actual)
		})
		it("works for intrinsic elements with properties and a child", async () => {
			const actual = renderToString(createElement("div", { style: { position: "static" } }, "Splash page"))
			const expected = `<div style="position: static">Splash page</div>`
			expect(expected).html.to.equal(actual)
		})
		it("works for component elements with properties and a child", async () => {
			const actual = renderToString(
				<StackPanel orientation="horizontal">
					<input type="text" />
				</StackPanel>
			)

			const expected = `
				<div style="display: flex; flex-direction: row; justify-content: initial; align-items: initial">
					<input type="text"/>
				</div>
			`

			expect(expected).html.to.equal(actual)
		})
		// it("should render SVG elements properly", async () => {
		// 	const elt = createElement(Logo, { stroke: "white", fill: "transparent", style: { height: "7vh" } as CSSProperties })

		// 	const actual = renderToString(elt)
		// 	const expected = `<svg preserveaspectratio="xMidYMid meet" fill="transparent" style="height: 7vh" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 122.88 78.97" stroke="white"><title>logo</title><path fill-rule="evenodd" d="M2.08,0h120.8V79H0V0ZM15.87,39.94a2.11,2.11,0,1,1,0-4.21h25l3.4-8.51a2.1,2.1,0,0,1,4,.39l5.13,20L60.71,11a2.11,2.11,0,0,1,4.14,0l6,22,4.76-10.5a2.1,2.1,0,0,1,3.86.08L84.55,35H107a2.11,2.11,0,1,1,0,4.21H83.14a2.12,2.12,0,0,1-2-1.32l-3.77-9.24L72.28,40h0a2.09,2.09,0,0,1-3.93-.31L63.09,20.5l-7.38,37h0a2.1,2.1,0,0,1-4.09.1L45.76,34.75l-1.48,3.72a2.11,2.11,0,0,1-2,1.47ZM4.15,4.15H118.73V64.29H4.15V4.15ZM55.91,69.27h11a2.1,2.1,0,0,1,0,4.2h-11a2.1,2.1,0,0,1,0-4.2Zm19,0h2a2.1,2.1,0,0,1,0,4.2h-2a2.1,2.1,0,0,1,0-4.2ZM46,69.27h2a2.1,2.1,0,0,1,0,4.2H46a2.1,2.1,0,0,1,0-4.2Z"></path></svg>`
		// 	expect(expected).html.to.equal(actual)
		// })
		it("should return a string representation of a complex page component", async () => {
			const actual = renderToString(<Layout user={undefined}><SplashPage /></Layout>)
			const expected = `
				<div id="root" style="padding: 0; margin: 0; display: flex; flex-direction: column; justify-content: initial; align-items: initial">
					<div id="header" style="background-color: purple; width: 100vw; height: 10vh; display: flex; flex-direction: row; justify-content: space-evenly; align-items: center">
						<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" preserveaspectratio="xMidYMid meet" fill="transparent" style="height: 7vh" viewbox="0 0 122.88 78.97" stroke="white">
							<title>logo</title>
							<path fill-rule="evenodd" d="M2.08,0h120.8V79H0V0ZM15.87,39.94a2.11,2.11,0,1,1,0-4.21h25l3.4-8.51a2.1,2.1,0,0,1,4,.39l5.13,20L60.71,11a2.11,2.11,0,0,1,4.14,0l6,22,4.76-10.5a2.1,2.1,0,0,1,3.86.08L84.55,35H107a2.11,2.11,0,1,1,0,4.21H83.14a2.12,2.12,0,0,1-2-1.32l-3.77-9.24L72.28,40h0a2.09,2.09,0,0,1-3.93-.31L63.09,20.5l-7.38,37h0a2.1,2.1,0,0,1-4.09.1L45.76,34.75l-1.48,3.72a2.11,2.11,0,0,1-2,1.47ZM4.15,4.15H118.73V64.29H4.15V4.15ZM55.91,69.27h11a2.1,2.1,0,0,1,0,4.2h-11a2.1,2.1,0,0,1,0-4.2Zm19,0h2a2.1,2.1,0,0,1,0,4.2h-2a2.1,2.1,0,0,1,0-4.2ZM46,69.27h2a2.1,2.1,0,0,1,0,4.2H46a2.1,2.1,0,0,1,0-4.2Z"></path>
						</svg>
						<div id="user-info" style="padding: 0.25em; color: whitesmoke; display: flex; flex-direction: row; justify-content: initial; align-items: initial">
							<a href="/auth/google">LOGIN</a>
						</div>
					</div>
					<div id="content" style="background-color: whitesmoke; height: 75vh; display: flex; flex-direction: row; justify-content: initial; align-items: initial">
						<div>Splash page</div>
					</div>
					<div id="footer" style="height: 10vh; display: flex; flex-direction: row; justify-content: initial; align-items: initial"></div>
				</div>
			`

			expect(expected).html.to.equal(actual)
		})
	})

	/*describe("populateWithChildren", () => {
		it("works for a single value child", async () => {
			const intrinsic = {
				type: "div",
				props: { className: "clss", style: { backgroundColor: "blue" } },
				children: ["val"]
			}
			const trace = await traceToLeafAsync(intrinsic)
			assert.deepStrictEqual(trace.leafElement, intrinsic, "intrinsic element's trace's leaf element is not equal itself")

			const dom = createDOMShallow(intrinsic)
			assert(!isTextDOM(dom))

			await populateWithChildren(dom, getChildren(trace.leafElement))
			assert.strictEqual(dom.childNodes.length, 1)
		})
		it("works for multiple intrinsic children", async () => {
			const intrinsic = {
				type: "div",
				props: { className: "clss", style: { backgroundColor: "blue" } },
				children: [{ type: "span", props: { style: { display: "inline-block" } } }, "val"]
			}
			const trace = await traceToLeafAsync(intrinsic)
			assert.deepStrictEqual(trace.leafElement, intrinsic, "intrinsic element's trace's leaf element is not equal itself")

			const dom = createDOMShallow(intrinsic)
			assert(!isTextDOM(dom))

			await populateWithChildren(dom, getChildren(trace.leafElement))
			assert.strictEqual(dom.childNodes.length, 2)

			const firstChild = dom.childNodes.item(0)
			assert.strictEqual(firstChild.tagName.toUpperCase(), "SPAN")
			assert.strictEqual(firstChild.style.display, "inline-block")
		})

		it("works for component children", async () => {
			const intrinsic = {
				type: "div",
				props: {},
				children: [
					{ type: View, props: { sourceData: [], orientation: "vertical" } },
					{ type: StackPanel, children: ["Hello"], props: {} },
					//{ type: CommandBox, children: ["Hello"] }
				]
			}
			const trace = await traceToLeafAsync(intrinsic)
			const dom = createDOMShallow(intrinsic)
			assert(!isTextDOM(dom))

			await populateWithChildren(dom, getChildren(trace.leafElement))
			assert.strictEqual(dom.childNodes.length, 2)

			const firstChild = dom.childNodes.item(0)
			assert.strictEqual(firstChild.tagName.toUpperCase(), "DIV")
			assert.strictEqual(firstChild.style.flexDirection, "column")
		})
	})*/

	/*describe("renderAsync", () => {
		it("should return elt with same html as renderToString, for an elt without children", async () => {
			try {
				const elt = HoverBox({ style: { height: "auto", width: "auto", fontSize: "14px" } })
				const dom = await renderAsync(elt)
				assert(isAugmentedDOM(dom))

				const renderedString = (idProvider.reset(), await renderToString(elt))

				assert.strictEqual(normalizeHTML(dom.outerHTML), normalizeHTML(renderedString))
			}
			catch (e) {
				assert.equal(1, 1)
				console.error(e)
				assert.fail()
			}
		})

		it("should return elt with same html as renderToString, for an elt with children", async () => {
			const elt = createElement(
				StackPanel,
				{ style: { height: "auto", width: "auto", fontSize: "14px" } },
				createElement("span", { style: { fontSize: "1.25em", fontWeight: 900 } }, "Get Started")
			)

			const dom = await renderAsync(elt)
			assert(isAugmentedDOM(dom))

			const renderString = (idProvider.reset(), await renderToString(elt))

			assert.strictEqual(normalizeHTML(dom.outerHTML), normalizeHTML(renderString))
		})

		it("should render an element with the correct text content", async () => {
			const dom = await renderAsync(
				createElement("div", { className: 'test', style: { backgroundColor: "blue" } }, "test")
			)

			assert(isAugmentedDOM(dom))
			assert.strictEqual(dom.textContent, 'test')
		})

		it("should render an element with its corresponding attributes", async () => {
			const dom = await renderAsync(createElement("div", { className: 'test-class', style: { backgroundColor: "blue" } }, "test"))

			assert(isAugmentedDOM(dom))
			assert.strictEqual((dom).getAttribute("class"), 'test-class')
		})

		it('should render a value element correctly', async () => {
			const dom = await renderAsync("hello")
			assert(isTextDOM(dom))
			assert.strictEqual(dom.textContent, 'hello')
		})

		it("should render multiple children properly", async () => {
			const dom = await renderAsync(createElement(
				"div",
				{},
				createElement("span", {}, 1),
				createElement("span", {}, 20),
				createElement("span", {}, 300)
			))

			assert(isAugmentedDOM(dom))
			assert.strictEqual(dom.childNodes.length, 3)
			assert.strictEqual(dom.childNodes.item(0).textContent, '1')
			assert.strictEqual(dom.childNodes.item(1).textContent, '20')
			assert.strictEqual(dom.childNodes.item(2).textContent, '300')
		})

		it("should render nested children properly", async () => {
			const dom = await renderAsync(
				createElement(
					"div",
					{ id: "1" },
					createElement("div", { id: "2" }, createElement("div", { id: "3" }, "Hi")),
					createElement("span", {}, createElement("i", {}, 4000))
				)
			)

			const firstChild = dom.firstChild
			assert(firstChild)
			assert.strictEqual(firstChild.childNodes.length, 1)
			assert(firstChild.firstChild)
			assert("tagName" in (firstChild.firstChild))

			const firstfirstChild = firstChild.firstChild
			assert.strictEqual(firstfirstChild.tagName.toUpperCase(), "DIV")
			assert.strictEqual(firstfirstChild.textContent, "Hi")

			const lastChild = dom.lastChild
			assert(lastChild)
			const lastFirstChild = lastChild.firstChild
			assert(lastFirstChild)

			assert.strictEqual(lastChild.firstChild, lastChild.lastChild)
			assert.strictEqual(lastFirstChild["tagName"].toUpperCase(), "I")
			assert.strictEqual(lastChild.firstChild.textContent, "4000")
		})

		it("should render SVG elements properly", async () => {

			const elt = await Layout({ user: undefined, children: [SplashPage({})] })

			const dom = await renderAsync(elt)
			assert(!isTextDOM(dom))
			assert(!(dom instanceof DocumentFragment))
			const svg = dom.getElementsByTagName("svg").item(0)  //as any as SVGSVGElement
			assert(svg !== null)

			assert(svg.id === "Layer_1")
			assert(svg.tagName.toUpperCase() === "SVG")
			assert.strictEqual(svg.children.length, 2)

			const title = svg.children.item(0) //as SVGTitleElement
			assert(title !== null)
			assert.strictEqual(title.textContent, "logo")

			const path = dom.getElementsByTagName("path").item(0) //as SVGPathElement
			assert(path !== null)
			assert.strictEqual(path.tagName.toUpperCase(), "PATH")
			assert.strictEqual(path.getAttribute("fill-rule"), "evenodd")
			assert.strictEqual(path.getAttribute("d"), "M2.08,0h120.8V79H0V0ZM15.87,39.94a2.11,2.11,0,1,1,0-4.21h25l3.4-8.51a2.1,2.1,0,0,1,4,.39l5.13,20L60.71,11a2.11,2.11,0,0,1,4.14,0l6,22,4.76-10.5a2.1,2.1,0,0,1,3.86.08L84.55,35H107a2.11,2.11,0,1,1,0,4.21H83.14a2.12,2.12,0,0,1-2-1.32l-3.77-9.24L72.28,40h0a2.09,2.09,0,0,1-3.93-.31L63.09,20.5l-7.38,37h0a2.1,2.1,0,0,1-4.09.1L45.76,34.75l-1.48,3.72a2.11,2.11,0,0,1-2,1.47ZM4.15,4.15H118.73V64.29H4.15V4.15ZM55.91,69.27h11a2.1,2.1,0,0,1,0,4.2h-11a2.1,2.1,0,0,1,0-4.2Zm19,0h2a2.1,2.1,0,0,1,0,4.2h-2a2.1,2.1,0,0,1,0-4.2ZM46,69.27h2a2.1,2.1,0,0,1,0,4.2H46a2.1,2.1,0,0,1,0-4.2Z")
		})

		it("should have the element with the events listeners attached to it", async () => {
			const vNode = <div className='test' onClick={() => console.log('')}>
				<span> Some render</span>
				<i>test</i>
			</div>
		
			// Generating an element through render
			const renderNode = await renderAsync(vNode)
			const fakeDivRender = document.createElement("div")
			while (fakeDivRender.firstChild) fakeDivRender.removeChild(fakeDivRender.firstChild)
			fakeDivRender.appendChild(renderNode)
		
			// Generating an element through renderToString
			const renderString = await renderToString(vNode)
			const fakeDivRenderToString = document.createElement("div")
			fakeDivRenderToString.innerHTML = renderString
			hydrate(fakeDivRenderToString)
		
			assert.ok(isEquivalent(fakeDivRender, fakeDivRenderToString))
		})
	})*/

	/*describe("getHierarchicalKey", () => {
		it("should return am element's name as its key by default", async () => {
			const el = { type: StackPanel, children: [], props: {} }
			const uniqueKey = getHierarchicalKey(el)
			assert.strictEqual(uniqueKey, 'StackPanel')
		})

		it("should use a component's custom key, if passed", async () => {
			const el = { type: StackPanel, children: [], props: { key: "myCustomKey" } }
			const uniqueKey = getHierarchicalKey(el)
			assert.strictEqual(uniqueKey, 'myCustomKey')
		})

		it("should include a parent's key and iteration, if the component has a parent", async () => {
			const parentElement = await renderAsync({ type: StackPanel, children: [], props: {} })
			assert(!isTextDOM(parentElement))
			assert(!(parentElement instanceof DocumentFragment))

			const child = { type: StackPanel, children: [], props: {} }
			const parentKey = getElementUniqueKey(parentElement)
			const uniqueKey = getHierarchicalKey(child, parentKey, 2)
			assert.strictEqual(uniqueKey, 'StackPanel-(2)StackPanel')
		})

		it("should include a parent's key + custom key without iteration, if the component has a parent and a custom key", async () => {
			const parentElement = await renderAsync({ type: StackPanel, children: [], props: {} })
			assert(!isTextDOM(parentElement))
			assert(!(parentElement instanceof DocumentFragment))

			const child = { type: StackPanel, children: [], props: { key: "myStax" } }
			const parentKey = getElementUniqueKey(parentElement)
			const uniqueKey = getHierarchicalKey(child, parentKey, 2)
			assert.strictEqual(uniqueKey, 'StackPanel-myStax')
		})

		it("should include a parent's custom key + its own custom key, if the component has a custom key, and a parent which also has one", async () => {
			const parentElement = await renderAsync({ type: StackPanel, children: [], props: { key: "customParentKey" } })
			assert(!isTextDOM(parentElement))
			assert(!(parentElement instanceof DocumentFragment))

			const child = { type: StackPanel, children: [], props: { key: "myStackPanel" } }
			const parentKey = getElementUniqueKey(parentElement)
			const uniqueKey = getHierarchicalKey(child, parentKey, 5)
			assert.strictEqual(uniqueKey, 'customParentKey-myStackPanel')
		})

		it("should use an element ancestry to return a unique key, even if a simple custom key was passed", async () => {
			console.log("== Start rendering parent element ==")
			const rootElement = await renderAsync(
				{
					type: StackPanel, children: [
						{ type: "p", props: {}, children: ["TEST"] },
						{
							type: "div", props: {}, children: [
								{ type: StackPanel, children: [], props: { key: "myStackPanel" } }
							]
						}
					], props: { key: "customParentKey" }
				}
			)
			assert(!isTextDOM(rootElement))
			assert(!(rootElement instanceof DocumentFragment))

			const customStackPanelKey = rootElement.lastChild?.firstChild
			assert(!isTextDOM(customStackPanelKey))
			assert(!(customStackPanelKey instanceof DocumentFragment))

			assert.strictEqual("uniqueKey" in customStackPanelKey && customStackPanelKey["uniqueKey"], 'customParentKey-(1)div-myStackPanel')
		})
	})*/

	/*describe("renderToIntrinsic", () => {
		it("should return elt with same html as renderToString, for an elt without children", async () => {
			try {
				const elt = HoverBox({ style: { height: "auto", width: "auto", fontSize: "14px" } })

				const intrinsic = await renderToIntrinsic(elt)
				const dom = await renderAsync(elt)
				assert(isAugmentedDOM(dom))

				const renderedString = (idProvider.reset(), await renderToString(elt))

				assert.strictEqual(normalizeHTML(dom.outerHTML), normalizeHTML(renderedString))
			}
			catch (e) {

				assert.equal(1, 1)
				// console.error(e)
				// assert.fail()
			}
		})

		it("should return an element with the correct content", async () => {
			const elt = await renderToIntrinsic(`test`)
			assert.strictEqual(elt, 'test')
		})

	})*/

	/*describe("updateAsync", async () => {
		it("should update while maintaining the element type, if no overriding element is passed", async () => {
			const dom = await renderAsync(createElement(View, {
				id: "test_view",
				sourceData: ["a", "b", "c"],
				itemsPanel: StackPanel,
				itemTemplate: item => createElement("i", { style: { width: "7em", border: "thin solid orange" } }, item.value)
			}))
			assert(!isTextDOM(dom))
			assert(!(dom instanceof DocumentFragment))

			const updatedDOM = await updateAsync(dom)

			assert(!isTextDOM(updatedDOM))
			assert(!(updatedDOM instanceof DocumentFragment))
		})

		it("should remove children from input dom element if input children array is empty", async () => {
			const dom = await renderAsync({
				type: "div",
				props: { className: "clss", style: { backgroundColor: "blue" } },
				children: [{ type: "span", props: { style: { display: "inline-block" } } }, "val"]
			})
			assert(!isTextDOM(dom))
			assert(isAugmentedDOM(dom))
			assert.strictEqual(dom.childNodes.length, 2)

			const updatedDOM = await updateAsync(dom, createElement("div", {}))
			assert.strictEqual(updatedDOM.childNodes.length, 0)
		})

		it("should be able to remove, update and insert elements at the same time", async () => {
			const dom = await renderAsync({
				type: "div",
				props: { className: "clss", style: { backgroundColor: "blue" } },
				children: [
					{ type: "span", props: { style: { display: "inline-block" } } },
					"val",
					{ type: "div", props: { style: { display: "inline-block" } } }
				]
			})
			const newDiv = createElement(
				"div",
				{},
				createElement("div", { style: { display: "inline-block" } }),
				createElement("span", { style: { display: "inline-block" } }),
				createElement("span", { style: { display: "inline-block" } }),
				createElement("span", { style: { display: "inline-block" } })
			)

			assert(!isTextDOM(dom))
			assert(isAugmentedDOM(dom))

			const updatedDOM = await updateAsync(dom, newDiv)
			
			const firstChild = updatedDOM.childNodes.item(0)
			assert.strictEqual(firstChild.tagName.toUpperCase(), "DIV")
			
			const secondChild = updatedDOM.childNodes.item(1)
			assert.strictEqual(secondChild.tagName.toUpperCase(), "SPAN")
			
			const fourthChild = updatedDOM.childNodes.item(3)
			assert.strictEqual(fourthChild.tagName.toUpperCase(), "SPAN")
		})

		it("should not morph elements that have a matching id, when used in conjunction with nanomorph", async () => {
			const dom = await renderAsync({
				type: "div",
				props: { className: "clss", style: { backgroundColor: "blue" } },
				children: [
					{ type: "span", props: { style: { display: "inline-block" } } },
					"val",
					{ type: "input", props: { id: "myInput" } }
				]
			})
		
			const targetInput = dom.childNodes.item(2)
			// We assign a value to that input
			targetInput.value = "test"

			const newChildren = createElement("div", {}, createElement("input", { id: "myInput" }))

			assert(!isTextDOM(dom))
			assert(isAugmentedDOM(dom))

			const thirdChild = dom.childNodes.item(2)

			const updatedDOM = await updateAsync(dom, newChildren)
			nanomorph(dom, updatedDOM)
			const updatedFirstChild = dom.childNodes.item(0)
			assert.ok(thirdChild === updatedFirstChild)
		})

		it("should ensure that updated DOM elements have a renderTrace property", async () => {
			const dom = await renderAsync({
				type: "div",
				props: { className: "clss", style: { backgroundColor: "blue" } },
				children: [
					{ type: "span", props: { style: { display: "inline-block" } } },
					"val",
					{ type: "input", props: { id: "myInput" } }
				]
			})
			
			const targetInput = dom.childNodes.item(2)
			// We assign a value to that input
			targetInput.value = "test"

			const newChildren = createElement('div', {}, createElement('input', { id: 'myInput' }))

			assert(!isTextDOM(dom))
			assert(isAugmentedDOM(dom))

			const updatedDOM = await updateAsync(dom, newChildren)
			assert(isAugmentedDOM(updatedDOM))
			nanomorph(dom, updatedDOM)
			assert.ok(updatedDOM.renderTrace !== undefined)
		})

		it("should keep the state of updated elements", async () => {
			const mainComp = createElement(
				"div",
				{},
				createElement(MainComponent, { id: "test-component" })
			)
			const container = await renderAsync(mainComp)
			const dom = container.firstChild
			assert(dom)
			assert(isAugmentedDOM(dom))
			document.body.appendChild(dom)

			const button = dom.querySelector("#myButton")
			button?.click()
			button?.click()
			const updatedDOM = await updateAsync(dom)
			assert(isAugmentedDOM(updatedDOM))

			const valueKeeper = updatedDOM.querySelector("#valueKeeper")//  as HTMLButtonElement
			assert.strictEqual(valueKeeper?.textContent, "Iterated value: 2")
		})

		it("should keep the state of updated elements' children", async () => {
			document.body.innerHTML = ""

			const dom = await renderAsync(createElement(
				"div",
				{},
				createElement(MainComponent, { id: "test-component" })
			))
			assert(isAugmentedDOM(dom))

			document.body.appendChild(dom)

			const button = dom.querySelector("#myButton")
			button?.click()
			button?.click()
			const updatedDOM = await updateAsync(dom)
			assert(isAugmentedDOM(updatedDOM))

			const valueKeeper = updatedDOM.querySelector("#valueKeeper")
			assert.strictEqual(valueKeeper?.textContent, "Iterated value: 2")
		})
	})*/

	/*describe("mountElement", async () => {
		it("should work", async () => {
			await mountElement(View({
				id: "test_view_id",
				sourceData: ["a", "b", "c"],
				itemsPanel: StackPanel,
				itemTemplate: item => createElement("i", { style: { width: "7em", border: "thin solid orange" } }, item.value)
			}), document.body)
	
			document.dispatchEvent(new CustomEvent('UIInvalidated', { detail: { invalidatedElementIds: ["test_view_id"] } }))
	
			assert(true)
		})
	})*/
})


// TYPE CHECKS

// these should fail type-checking
// const elt = createElement(StackPanel, {itemsAlignH: "stretch", x: 1 }, createElement("div", { }))
// const elt1 = createElement(StackPanel, {itemsAlignHX: "stretch" }, createElement("div", { }))

// this should pass type-checking
// const elt = createElement(StackPanel, {itemsAlignH: "stretch" }, createElement("div", { }))

// this should pass type-checking when children of elements are required
// const stack = <StackPanel itemsAlignH="start"><div /></StackPanel>

// cleanup()
// type FontIcon = Component<Partial<{ color: string | null | undefined; size: string | number; style: CSSProperties }>>



