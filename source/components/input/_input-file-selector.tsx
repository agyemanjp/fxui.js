// import { assert, getIdUnique, mergeDeep, stringifyDirect, type ArgsType } from 'standard'

// import { Fragment } from '../../common'
// import { createElement } from '../../element'
// import { icons } from '../common'
// import type { InputComponent, InputProps } from './common'
// import { StackPanel } from '../panels'
// import { View, type ViewProps } from '../misc'


// export const InputFileSelector: InputComponent<Props> = _props => {
// 	const defaultProps = {
// 		style: {
// 			border: '0 solid gray',
// 			backgroundColor: "inherit",
// 			overflow: 'hidden',
// 		},
// 		itemStyle: {
// 		},
// 		editing: {
// 			prompt: 'Click here to add media files'
// 		}
// 	} satisfies Partial<Props>

// 	const props = mergeDeep()(defaultProps, _props) //as any as Required<MediaSetProps>
// 	// console.log(`MediaSet props.value: ${stringify(props.value)}`)

// 	const {
// 		id,
// 		editing,
// 		value,
// 		layout,
// 		itemTemplate: ItemTemplate,
// 		itemsAlignH,
// 		itemsAlignV,
// 		orientation,
// 		itemStyle,
// 		style,
// 		children,
// 		...htmlProps
// 	} = props

// 	// const componentContainerId = id ?? getIdUnique()
// 	const mediaInputId = getIdUnique()

// 	const mediaItems = value ?? []
// 	return <div>
// 		<View<MediaItem | undefined>
// 			sourceData={sourceData}
// 			layout={layout ?? StackPanel}
// 			orientation={orientation ?? "horizontal"}
// 			itemTemplate={({ value: item, index }) => {
// 				return <StackPanel
// 					style={{
// 						height: "100%", minWidth: "5rem",
// 						position: "relative",
// 						border: "0 solid gold",
// 						backgroundColor: "inherit"
// 					}}>
// 					{item
// 						? ItemTemplate
// 							? <ItemTemplate value={value} index={index} />
// 							: <>
// 								{item.mimeType.startsWith("image/")
// 									? <img src={item.contentUrl}
// 										style={{ height: "100%", zIndex: "0" }}
// 										alt="Image"
// 									/>
// 									: item.mimeType.startsWith("video/")
// 										? <video style={{ height: "100%", zIndex: "0" }} controls>
// 											<source src={item.contentUrl} type="video/mp4" />
// 											Your browser does not support the video html tag.
// 										</video>
// 										: <audio style={{ height: "100%", zIndex: "0" }} controls>
// 											<source src={item.contentUrl} type="video/mp4" />
// 											Your browser does not support the audio html tag.
// 										</audio>
// 								}

// 								{editing !== "off" ? <div /* delete button */
// 									style={{
// 										position: "absolute", zIndex: "1",
// 										right: "0", top: "0",
// 										width: "2rem", height: "2rem",
// 										padding: "0.5rem",
// 										backgroundColor: "inherit",
// 										border: "0 solid cyan"
// 									}}>

// 									<icons.TrashBin2
// 										style={{
// 											width: "100%",
// 											height: "100%",
// 											color: "black", //getComplementaryColor(style.backgroundColor),
// 											cursor: "pointer",
// 										}}
// 										onClick={`(${String(handleDeleteMedia)})(event, ${stringifyDirect({
// 											props,
// 											deletingIndex: index - 1, // subtract 1 cos of add button
// 											componentId: componentContainerId,
// 											onItemRemoved: (editing.onItemRemoved),
// 										} satisfies ArgsType<typeof handleDeleteMedia>[1])})`}
// 									/>
// 								</div> : <></>
// 								}
// 							</>

// 						: (() => { // add new
// 							assert(editing !== "off", `Editing is off and yet we have a void media item for add new`)
// 							const { name, onItemsAdded, onItemRemoved, prompt } = editing

// 							return <>
// 								<StackPanel orientation="vertical" itemsAlignH="center" itemsAlignV="center"
// 									onClick={`document.getElementById('${mediaInputId}').click()`}
// 									style={{
// 										cursor: "pointer", padding: "0.75rem",
// 										verticalAlign: "top", textAlign: "center",
// 										height: "100%", width: "9rem"
// 									}}>

// 									<icons.PlusThin style={{ height: "3rem" }} />
// 									<span>{prompt}</span>
// 								</StackPanel>

// 								<input id={mediaInputId} type="file" name="files" multiple accept='image/*,video/*,audio/*'
// 									style={{ display: "none" }}
// 									onChange={`(${String(handleAddMedia)})(event, ${stringifyDirect({
// 										props,
// 										componentId: componentContainerId,
// 										onItemsAdded: editing.onItemsAdded,
// 									} satisfies ArgsType<typeof handleAddMedia>[1])})`}
// 								/>

// 								<input type="hidden" name={name} value={JSON.stringify(mediaItems)} />
// 							</>
// 						})()
// 					}
// 				</StackPanel>
// 			}}
// 			itemStyle={{ overflow: "hidden", backgroundColor: "inherit", ...itemStyle }}
// 			style={{ gap: "1rem", overflowX: "auto", backgroundColor: "inherit", ...style }}
// 			{...htmlProps}
// 		/>
// 	</div>
// }

// type Props = InputProps<File[]> & {
	
// }

// export type MediaItem = {
// 	// id: string
// 	contentUrl: string
// 	mimeType: (
// 		| 'image/png' | 'image/jpeg' | 'image/gif' | 'image/svg+xml'
// 		| 'video/mp4' | 'video/webm'
// 		| 'audio/mpeg' | 'audio/ogg'
// 		| 'application/octet-stream'
// 	)
// 	// whenCreated: number
// }


// async function handleAddMedia(event: Event, args
// 	: {
// 		props: Props,
// 		componentId: string,
// 		onItemsAdded?: (items: MediaItem[]) => any
// 	}) {
// 	const { props, componentId, onItemsAdded } = args
// 	const processFile = (f: File) => (fetch(`/signed_s3_url?operation=put&content_type=${f.type}`)
// 		.then(_ => _.ok ? Promise.all([_.json(), f.arrayBuffer()]) : undefined)
// 		.then(_ => {
// 			if (_ === undefined) return _
// 			const s3Info = _[0] as {
// 				objectId: string,
// 				objectCdnUrl: string,
// 				signedUrl: string
// 			}
// 			const buffer = _[1]

// 			return Promise.all([s3Info, fetch(s3Info.signedUrl, {
// 				method: 'PUT',
// 				headers: { 'x-amz-acl': 'public-read', 'Content-Type': f.type, },
// 				duplex: 'half',
// 				body: buffer
// 			} as RequestInit)])
// 		})
// 		.then(_ => _ && _[1].ok
// 			? ({
// 				id: _[0].objectId,
// 				contentUrl: _[0].objectCdnUrl,
// 				mimeType: (f.type ?? "application/octet-stream") as MediaItem["mimeType"]
// 			})
// 			: undefined
// 		)
// 	)

// 	const files = Array.from((event.target as HTMLInputElement).files ?? [])
// 	console.log(`Selected media files: ${files.map(f => f.name)}`)

// 	Promise.all(files.map(processFile)).then(_ => {
// 		// const newItems = [...filter(_, ["by-typeguard", item => item !== undefined])]
// 		const newItems = _.filter(item => item !== undefined) as MediaItem[]

// 		const container = document.getElementById(componentId)
// 		console.log(`Component container: ${container}`)

// 		const _win = window as any
// 		const newProps = { ...props, value: [...props.value, ...newItems] }
// 		console.log(`New media items being sent to MediaSet server component url: ${JSON.stringify(newProps.value)}`)

// 		_win[componentId] = newProps
// 		console.log(`Calling refreshUIAsync for MediaSetUI`)
// 		refreshUIAsync("media-set", container!)

// 		console.log(`typeof props.onItemsAdded: ${typeof onItemsAdded}`)
// 		if (typeof onItemsAdded === "function") {
// 			console.log(`Calling onItemsAdded event callback`)
// 			onItemsAdded(newItems)
// 		}
// 	})
// }

// async function handleDeleteMedia(event: Event, args
// 	: {
// 		props: Props,
// 		deletingIndex: number,
// 		componentId: string,
// 		onItemRemoved?: (index: number) => any
// 	}) {

// 	const { props, deletingIndex, componentId, onItemRemoved } = args
// 	const container = document.getElementById(componentId)
// 	// console.log(`Component container: ${container}`)

// 	const _win = window as any
// 	const newProps = { ...props, value: props.value.toSpliced(deletingIndex, 1) }
// 	console.log(`Media sent to MediaSetUI server component after delete of index "${deletingIndex}": ${JSON.stringify(newProps.value)}`)

// 	_win[componentId] = newProps

// 	console.log(`Calling refreshUIAsync for MediaSetUI`)
// 	refreshUIAsync("media-set", container!)

// 	console.log(`typeof onItemRemoved: ${typeof onItemRemoved}`)
// 	if (typeof onItemRemoved === "function") {
// 		console.log(`Calling onItemRemoved event callback`)
// 		onItemRemoved(deletingIndex)
// 	}
// }


// declare const refreshUIAsync: refreshUIAsyncType