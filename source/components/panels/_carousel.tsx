import { createElement, Fragment } from "../../"
import type { Component } from "../../common"
import { normalizeChildren } from "../../element"
import type { HtmlProps } from "../common"

export const CarouselPanel: Component<Props> = (props) => {
	const {
		children,
		style,
		id,
		...htmlProps
	} = props

	const arrChildren = normalizeChildren(children)

	return <>
		<section className="carousel" aria-label="Gallery">
			<ol className="carousel__viewport">
				{arrChildren.map((child, index) => (
					<li id={`carousel__slide${index}`} className="carousel__slide">
						{child}
						<div className="carousel__snapper" />
						<a href={`#carousel__slide${Math.max(0, index - 1)}`} className="carousel__prev">
							Go to previous slide
						</a>
						<a href={`#carousel__slide${Math.min(arrChildren.length - 1, index + 1)}`} className="carousel__next">
							Go to next slide
						</a>
					</li>
				))}
			</ol>

			<aside className="carousel__navigation">
				<ol className="carousel__navigation-list">
					{arrChildren.map((child, index) => (
						<li className="carousel__navigation-item">
							<a href={`#carousel__slide${index}`} className="carousel__navigation-button">
								Go to slide {String(index)}
							</a>
						</li>
					))}
				</ol>
			</aside>
		</section>

		<style>
			{`
			@keyframes tonext {
				75% {
					left: 0;
				}
				95% {
					left: 100%;
				}
				98% {
					left: 100%;
				}
				99% {
					left: 0;
				}
			}
			  
			@keyframes tostart {
				75% {
					left: 0;
				}
				95% {
					left: -300%;
				}
				98% {
					left: -300%;
				}
				99% {
					left: 0;
				}
			}
			  
			@keyframes snap {
				96% {
				  scroll-snap-align: center;
				}
				97% {
				  scroll-snap-align: none;
				}
				99% {
				  scroll-snap-align: none;
				}
				100% {
				  scroll-snap-align: center;
				}
			}
			  
			.cd__main{
				display: block !important;
			}
			  
			* {
				box-sizing: border-box;
				scrollbar-color: transparent transparent; /* thumb and track color */
				scrollbar-width: 0px;
			}
			  
			*::-webkit-scrollbar {
				width: 0;
			}
			  
			*::-webkit-scrollbar-track {
				background: transparent;
			}
			  
			*::-webkit-scrollbar-thumb {
				background: transparent;
				border: none;
			}
			  
			* {
				-ms-overflow-style: none;
			}
			  
			ol, li {
				list-style: none;
				margin: 0;
				padding: 0;
			}
			  
			.carousel {
				position: relative;
				filter: drop-shadow(0 0 10px #0003);
				perspective: 100px;
				max-width: 650px;
				height: 450px;
				margin: 15px auto;
			}
			  
			.carousel__viewport {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				display: flex;
				overflow-x: scroll;
				counter-reset: item;
				scroll-behavior: smooth;
				scroll-snap-type: x mandatory;
			}
			  
			.carousel__slide {
				position: relative;
				flex: 0 0 100%;
				width: 100%;
				background-color: #f99;
			  
			}
			  
			.carousel__slide:nth-child(even) {
				background-color: #99f;
			}
			  
			.carousel__slide:before {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate3d(-50%,-40%,70px);
				color: #fff;
				font-size: 2em;
			}
			  
			.carousel__snapper {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				scroll-snap-align: center;
			}
			  
			@media (hover: hover) {
				.carousel__snapper {
				  animation-name: tonext, snap;
				  animation-timing-function: ease;
				  animation-duration: 4s;
				  animation-iteration-count: infinite;
				}
			  
				.carousel__slide:last-child .carousel__snapper {
				  animation-name: tostart, snap;
				}
			}
			  
			@media (prefers-reduced-motion: reduce) {
				.carousel__snapper {
				  animation-name: none;
				}
			}
			  
			.carousel:hover .carousel__snapper,
			.carousel:focus-within .carousel__snapper {
				animation-name: none;
			}
			  
			.carousel__navigation {
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				text-align: center;
			}
			  
			.carousel__navigation-list,
			.carousel__navigation-item {
				display: inline-block;
			}
			  
			.carousel__navigation-button {
				display: inline-block;
				width: 1.5rem;
				height: 1.5rem;
				background-color: #333;
				background-clip: content-box;
				border: 0.25rem solid transparent;
				border-radius: 50%;
				font-size: 0;
				transition: transform 0.1s;
			}
			  
			.carousel::before,
			.carousel::after,
			.carousel__prev,
			.carousel__next {
				position: absolute;
				top: 0;
				margin-top: 37.5%;
				width: 4rem;
				height: 4rem;
				transform: translateY(-50%);
				border-radius: 50%;
				font-size: 0;
				outline: 0;
			}
			  
			.carousel::before,
			.carousel__prev {
				left: -1rem;
			}
			  
			.carousel::after,
			.carousel__next {
				right: -1rem;
			}
			  
			.carousel::before,
			.carousel::after {
				content: '';
				z-index: 1;
				background-color: #333;
				background-size: 1.5rem 1.5rem;
				background-repeat: no-repeat;
				background-position: center center;
				color: #fff;
				font-size: 2.5rem;
				line-height: 4rem;
				text-align: center;
				pointer-events: none;
			}
			  
			.carousel::before {
				background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,50 80,100 80,0' fill='%23fff'/%3E%3C/svg%3E");
			}
			  
			.carousel::after {
				background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='100,50 20,100 20,0' fill='%23fff'/%3E%3C/svg%3E");
			}
			`}
		</style>
	</>
}
CarouselPanel.pure = true

type Props = HtmlProps & {}