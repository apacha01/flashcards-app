import { useEffect } from "preact/hooks";

export default function Card({ front, back, type, flipped = false }) {

	useEffect(() => {
		// TODO
		// Find out how to know if child component rendered and highligh only once in parent element. Maybe ref?
		if ('code'.localeCompare(type) === 0)
			Prism.highlightAll();
	}, [])

	return (
		<article class="grid my-6 w-4/5 min-w-[300px] min-h-[30rem] h-fit bg-transparent" style={{ perspective: "1000px" }}>
			<div
				class={`w-full h-full relative transition-transform duration-[375ms] ${flipped ? '[transform:rotateX(180deg)]' : ''}`}
				style={{ transformStyle: "preserve-3d" }} // TODO or [transform-style:preserve-3d] in class so it's not inline ?
			>
				<div
					class="text-black absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-400 text-center rounded-xl p-2"
					style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
				>
					<p class="text-4xl [transform:translateZ(100px)]">
						{front}
					</p>
				</div>
				<div
					class="text-black absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-400 rounded-xl p-2"
					style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
				>
					{
						// If text use <p> tag
						'text'.localeCompare(type) === 0
							? (
								<p class="max-h-full overflow-y-auto max-w-prose text-2xl px-10">
									{back}
								</p>
							)
							// If image
							: 'image'.localeCompare(type) === 0
								// check if base64 encoded to add the prefix
								? (
									<img
										class="max-h-full max-w-full"
										src={`${/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(back) ? 'data:image/png;base64,' : ''}${back}`}
										alt="Back of the card"
									/>
								)
								// If code
								: 'code'.localeCompare(type.split(':')[0]) === 0
									// TODO	
									// Add other languages, uses C only
									// type.split(':')[1]
									? (
										<div class={`max-h-full overflow-y-auto`}>
											<pre><code class="language-c">{back}</code></pre>
										</div>
									)
									: 'Invalid type given in card'
					}
				</div>
			</div>
		</article>
	)
};