// import {
// 	type Rec, type FilterSingle, type RecordFilter, type ArgsType, type SortOrder, isIterable, DataTable, type ColumnarData,
// 	Sequence, keys, max, map, createRanker, Tuple, objectFromTuples, mergeDeep, isDate, isURL,
// 	getIdUnique,
// 	assert
// } from "@agyemanjp/standard"

// import { createElement, Fragment, type UIElement } from "../.."
// import type { ComponentArgs, Component } from "../../common"
// import type { CSSProperties, CSSLength } from "../../html"
// import { HoverBox } from "../boxes"
// import { StackPanel } from "../panels"
// import type { HtmlProps } from "../common"

// export function Table<T extends Rec = Rec>(_props: ComponentArgs<TableProps<T>>) {
// 	type P = Required<TableProps<T>>

// 	const defaults = {
// 		id: getIdUnique(),
// 		sorting: true as P["sorting"],
// 		filtering: false as P["filtering"],
// 		editing: { mode: "overlay" } as P["editing"],
// 		paging: { size: 25 } as P["paging"],
// 		// selection: false,
// 		downloading: false as P["downloading"],
// 		// numberedRows: true,
// 		style: {
// 			maxWidth: "100%",
// 			// maxWidth: "fit-content",
// 			boxSizing: "content-box",
// 			overflow: "auto"
// 		},
// 		rowStyle: {
// 			background: "#fff",
// 			height: "3em",
// 			/* To prevent compressible rows (whose cells have no minimal widths) collapsing to 0 px widths */
// 			minWidth: "100%"
// 		} as CSSProperties,
// 		altRowStyle: {
// 			background: "#eee"
// 		} as CSSProperties,
// 		headerRowStyle: {
// 			// width: "100%",
// 			// border: "thin solid green",
// 			background: "#eee"
// 		} as CSSProperties,
// 		cellStyle: {
// 			height: "100%",
// 			whiteSpace: "normal",
// 			wordWrap: "normal"
// 		},
// 		headerCellStyle: {},
// 		showHeaders: true as P["showHeaders"],
// 		defaultColumnWidth: "both" as P["defaultColumnWidth"],
// 		// disabledRowStyle: { color: "lightgray" } as CSSProperties,
// 		selectedRowStyle: {} as CSSProperties,
// 		gridlines: "both" as P["gridlines"]
// 	} as const satisfies Omit<typeof _props, "data">

// 	const props = mergeDeep()(defaults, _props)

// 	const state = {
// 		sortColumn: (props.sorting && typeof props.sorting === "object" ? props.sorting.column : undefined),
// 		sortOrder: (props.sorting && typeof props.sorting === "object" ? props.sorting.order ?? "ascending" : undefined) as SortOrder | undefined,
// 		pageIndex: (props.paging ? typeof props.paging === "object" ? props.paging.index ?? 0 : 0 : undefined),
// 		pageSize: (props.paging ? typeof props.paging === "object" ? props.paging.size ?? 25 : 0 : undefined),
// 		filter: (props.filtering && typeof props.filtering === "object" ? props.filtering.filter : undefined),
// 	}

// 	const {
// 		id,
// 		key,
// 		data,
// 		defaultColumnWidth,
// 		filtering,
// 		filter,
// 		sorting,
// 		sortColumn,
// 		sortOrder,
// 		paging,
// 		pageIndex,
// 		pageSize,
// 		editing,
// 		downloading,
// 		showHeaders,
// 		headerRowStyle,
// 		cellTemplate,
// 		headerCellTemplate,
// 		gridlines,
// 		style,
// 		rowStyle,
// 		altRowStyle,
// 		cellStyle,
// 		headerCellStyle,
// 		selectedRowStyle,
// 		columnsExcluded,
// 		columns,
// 		...htmlProps
// 	} = mergeDeep()(props, state)

// 	let dataTable = isIterable(data) ? DataTable.fromRows(data) : DataTable.fromColumns(data)

// 	if (sortColumn && sortOrder) dataTable = dataTable.sort({ columnName: sortColumn, order: sortOrder })
// 	if (pageIndex && pageSize) dataTable = dataTable.page({ index: pageIndex, size: pageSize })
// 	if (filter) dataTable = dataTable.filter({ filter })

// 	const generateColumns = (data: ColumnarData<T>): { [k in keyof T]: Required<Column<T>> } => {
// 		const tuples = new Sequence(keys(data))
// 			.filter(k => typeof k === "string")
// 			.filter(k => (columnsExcluded ?? []).includes(k) === false)
// 			.map(key => {
// 				if (typeof key !== "string") throw "Object key is not a string"
// 				const col = columns ? columns[key] ?? {} : {} as Partial<Column<T>>
// 				const vector = data[key] ?? []

// 				const CHAR_WIDTH_PIXELS = 9
// 				const getWidestValue = () => max(map(vector, x => String(x)), createRanker(x => x.length)) ?? ""
// 				const calculateColWidth = (): CSSLength => {
// 					const widestValueLength = defaultColumnWidth === "both"
// 						? Math.max(key.length, getWidestValue().length)
// 						: defaultColumnWidth === "data"
// 							? getWidestValue().length
// 							: key.length

// 					return `${CHAR_WIDTH_PIXELS * (widestValueLength + (props.sorting ? 2 : 0))}px`
// 				}

// 				const template = ((props: { value: unknown }) =>
// 					// const value = (row as RecordX)[key] as any
// 					<div>{String(props.value)}</div>
// 				)

// 				const headerTemplate: Required<Column<T>>["headerTemplate"] = (props => <div>{props.columnTitle}</div>)

// 				const editor = ((row: T) => {
// 					const value = (row as Rec)[key]
// 					return <input name={key} value={String(value)} />
// 				})

// 				const colWidth = calculateColWidth()
// 				const columnFull: Required<Column<T>> = {
// 					title: key,
// 					style: {
// 						...col.style,
// 						...(col.style?.width ? {} : { width: String(colWidth) }),
// 						...(col.style?.minWidth ? {} : { minWidth: String(colWidth) }),
// 					} as CSSProperties,
// 					headerStyle: {
// 						...col.headerStyle,
// 						...(col.headerStyle?.width ? {} : { width: String(colWidth) }),
// 						...(col.headerStyle?.minWidth ? {} : { minWidth: String(colWidth) }),
// 					} as CSSProperties,

// 					editor,
// 					...col,

// 					template: col.template ?? cellTemplate ?? template,
// 					headerTemplate: col.headerTemplate ?? headerCellTemplate ?? headerTemplate,
// 				}

// 				return new Tuple(key, columnFull)
// 			})

// 		return objectFromTuples([...tuples]) as { [k in keyof T]: Required<Column<T>> }
// 	}

// 	//  Effective props
// 	const columnsEffective = generateColumns(dataTable.columnVectors.asObject())
// 	const altRowStyleEffective = { ...rowStyle, ...altRowStyle }
// 	const cellStyleEffective = {
// 		...defaults.cellStyle,
// 		...gridlines === "both" || gridlines === "vertical" ? { borderRight: "thin solid gray" } : {},
// 		...gridlines === "both" || gridlines === "horizontal" ? { borderBottom: "thin solid gray" } : {},
// 		...props.cellStyle
// 	} as CSSProperties
// 	const headerCellStyleEffective: CSSProperties = {
// 		...defaults.headerCellStyle,
// 		...gridlines === "both" || gridlines === "vertical" ? { borderRight: "thin solid gray" } : {},
// 		...gridlines === "both" || gridlines === "horizontal" ? { borderBottom: "thin solid gray" } : {},
// 		...props.headerCellStyle
// 	}

// 	return <StackPanel id={id} orientation="vertical" style={style}>
// 		{props.showHeaders !== false
// 			? <TableHeader
// 				columns={columnsEffective}
// 				cellStyle={headerCellStyleEffective}
// 				cellTemplate={headerCellTemplate}
// 				style={headerRowStyle}
// 				sort={sortColumn ? { column: sortColumn, order: sortOrder } : undefined}
// 			/>
// 			: ""
// 		}

// 		{[...map(dataTable.rowObjects, (datum, index) =>
// 			<TableRow
// 				obj={datum}
// 				columns={columnsEffective}
// 				cellStyle={cellStyleEffective}
// 				cellTemplate={cellTemplate}
// 				style={index % 2 === 0 ? rowStyle : altRowStyleEffective}
// 			/>
// 		)]}

// 		{pageIndex && pageSize
// 			? <StackPanel key="paging" itemsAlignH="center">
// 				<PrevArrowToSolidWall />
// 				<PreviousArrow />
// 				Page {String(pageIndex)} of {String(dataTable.length / pageSize)}
// 				<NextArrow />
// 				<NextArrowToSolidWall />
// 			</StackPanel>

// 			: ""
// 		}

// 	</StackPanel>
// }
// export type TableProps<T extends Rec = Rec> = HtmlProps & {
// 	data: Iterable<T> | ColumnarData<T>,
// 	columns?: { [k in keyof T]: Column<T> },
// 	columnsExcluded?: (keyof T)[],
// 	defaultColumnWidth?: (
// 		| "title" /* column widths based on their titles */
// 		| "data" /* default; column width is based on the longest datum in the column */
// 		| "both" /* default; column width is based on the longest datum or title, whichever is wider */
// 	)
// 	/** Show header row of column titles? */
// 	showHeaders?: boolean,
// 	/** Initial sorting config (which also indicates that sorting is enabled, 
// 	 * since otherwise data could be sorted before being passing to table component); 
// 	 * If undefined or false, then sorting is disabled 
// 	 */
// 	sorting?: boolean | {
// 		/** Initial sort column, if any */
// 		column: keyof T,

// 		/** Initial sort order */
// 		order?: SortOrder
// 	}
// 	/** Options for filtering; disabled if undefined */
// 	filtering?: boolean | {
// 		/** Initial filter */
// 		filter: FilterSingle<T> | RecordFilter<T>
// 	}
// 	/** Options for paging; disabled if undefined */
// 	paging?: boolean | {
// 		/** Page size */
// 		size: number,

// 		/** Initial page index */
// 		index?: number
// 	}
// 	/** Options for editing; disabled if undefined */
// 	editing?: { mode?: "in-place" | "overlay" | "right" | "bottom" }
// 	/** Downloading options. If undefined, downloading is disabled */
// 	downloading?: boolean,
// 	/** Style of every row */
// 	rowStyle?: CSSProperties,
// 	/** Style of alt rows; merged 'rowStyle' */
// 	altRowStyle?: CSSProperties,
// 	/** Style of the header row; merged with 'rowStyle' */
// 	headerRowStyle?: CSSProperties,
// 	/** Style of a selected row; merged with 'rowStyle' or altRowStyle */
// 	selectedRowStyle?: CSSProperties,
// 	/** Header cell style */
// 	headerCellStyle?: CSSProperties,
// 	/** Rows Cell style */
// 	cellStyle?: CSSProperties
// 	cellTemplate?: Component<{ value: unknown }>
// 	headerCellTemplate?: Component<{ columnTitle: string }>
// 	gridlines?: "horizontal" | "vertical" | "both" | "none",
// 	children?: never[]
// }

// export function TableRow<T extends Rec = Rec>(props: ArgsType<Component<TableRowProps<T>>>[0]) {
// 	const { obj, columns, cellStyle, editing, style, ...htmlProps } = props
// 	const isEditing = false
// 	const cells = (keys(columns).map(key => {
// 		if (typeof key !== "string") throw "Object key not a string"
// 		const value = obj[key]
// 		// console.log(`value in table row: ${stringify(value)}`)

// 		const col = columns[key]
// 		assert(col)

// 		return isEditing
// 			? col.editor
// 				? col.editor(obj)
// 				: getDefaultEditor(obj, key, editing)
// 			: col.template
// 				? <col.template value={obj[key]} />
// 				: <>{value}</>

// 	}))

// 	return <StackPanel style={style} {...htmlProps}>{cells}</StackPanel>

// 	function getDefaultEditor(obj: Rec, key: string, options?: TableRowProps["editing"]): JSX.Element {
// 		const value = obj[key]
// 		switch (typeof value) {
// 			case "bigint":
// 			case "number": return <input type="number" value={String(value)} />

// 			case "symbol":
// 			case "undefined":
// 			case "string": return <input type="text" value={String(value)} />

// 			case "boolean": return <input type="checkbox" value={String(value)} />

// 			// function or object (Date, null, literal, Regex, etc)
// 			default: {
// 				switch (true) {
// 					case isDate(value): return <input
// 						type="date" value={value.toISOString().substring(0, 10)}
// 					// onChange={e => { if ("value" in e.target) obj[key] = e.target.value }}
// 					/>
// 					case isURL(String(value)): return <input
// 						type="url" value={String(value)}
// 					// onChange={e => { if ("value" in e.target) obj[key] = e.target.value }}
// 					/>
// 					default: return <input
// 						type="text" value={String(value)}
// 					// onChange={e => { if ("value" in e.target) obj[key] = e.target.value }}
// 					/>
// 				}
// 			}
// 		}
// 	}
// }
// export type TableRowProps<T extends Rec = Rec> = HtmlProps & {
// 	/** Datum object */
// 	obj: T

// 	/** Columns info */
// 	columns: { [k in keyof T]: Required<Column<T>> }

// 	/** Options for editing; disabled if undefined */
// 	editing?: {
// 		mode?: "in-place" | "overlay" | "adjacent",
// 		// editor?: Component<{ obj: T }>
// 	}

// 	cellStyle?: CSSProperties
// 	cellTemplate?: Component<{ value: unknown }>
// }

// export function TableHeader<T extends Rec = Rec>(props: ArgsType<Component<TableHeaderProps<T>>>[0]) {
// 	const { columns, style, key, sort, ...htmlProps } = props

// 	const items = (keys(columns).map(key => {
// 		const col = columns[key]
// 		const title = col.title ?? String(key)

// 		const elt: UIElement = col.headerTemplate
// 			? <col.headerTemplate columnTitle={title} />
// 			: title

// 		const sortElt = (Icon__: Icon) => <Icon__ style={{ height: "1.25em", cursor: "pointer" }} />

// 		const sortContent = props.sort?.column === key
// 			? (props.sort.order ?? "ascending") === "ascending"
// 				? sortElt(ChevronUp)
// 				: sortElt(ChevronDown)
// 			: props.onSort
// 				? <HoverBox style={{ opacity: "0.25" }} hoverStyle={{ opacity: "1" }}>
// 					{sortElt(ChevronUp)}
// 				</HoverBox>
// 				: ""

// 		return <div>{sortContent}{elt}</div>
// 	}))
// 	return <StackPanel style={style} {...htmlProps}>{items}</StackPanel>
// }
// export type TableHeaderProps<T extends Rec = Rec> = HtmlProps & {
// 	columns: { [k in keyof T]: Required<Column<T>> },
// 	cellStyle?: CSSProperties,
// 	cellTemplate?: Component<{ columnTitle: string }>

// 	/** Initial sort, if any */
// 	sort?: {
// 		/** Sort column */
// 		column: keyof T,

// 		/** Optional sort order; defaults to ascending */
// 		order?: SortOrder
// 	}

// 	/** Callback invoked when sort is requested; if not passed, chaging the passed sort is disabled */
// 	onSort?: (args: { column: keyof T, order: SortOrder }) => unknown
// }

// export const Pager: Component<Rec> = props => {
// 	return ""
// }

// interface Column<T extends Rec> {
// 	title?: string
// 	style?: CSSProperties,
// 	headerStyle: CSSProperties
// 	template?: Component<{ value: unknown }>
// 	headerTemplate?: Component<{ columnTitle: string }>
// 	editor?: Component<T>
// }
