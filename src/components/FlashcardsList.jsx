import Flashcard from "./Flashcard.jsx";
import { useStore } from "@nanostores/preact";
import { cards } from "../stores/cardsListStore.js";
import { useState } from "preact/hooks";
import Card from "./Card.jsx";

export default function FlashcardsList({ piledUp = false }) {
	const list = useStore(cards);
	const [currentList, setCurrentList] = useState(list);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);

	const handleClick = () => {
		setFlipped(f => !f);
	};

	const moveToNextCard = () => {
		setFlipped(false);
		setCurrentCardIndex(i => i + 1);
	};

	const moveToPreviousCard = () => {
		setFlipped(false);
		setCurrentCardIndex(i => Math.max(i - 1, 0));
	};

	return (
		piledUp
			? (
				<section class="relative w-full flex flex-col gap-8 overflow-hidden">
					{
						currentCardIndex < currentList.length
							? (
								<>
									<ul class="w-full">
										{
											currentList.map((c, i) =>
												<li
													class={
														`w-full flex justify-center transition-[transform,opacity,visibility] duration-200
														${i === currentCardIndex ? 'relative' : 'absolute top-0'} 
														${i < currentCardIndex // if card already passed
															? !c.known ? 'opacity-0 invisible -translate-x-60' : 'opacity-0 invisible translate-x-60'
															: ''}`
													}
													style={{ zIndex: currentList.length - i }}
												>
													<Card front={c.front} back={c.back} type={c.type} flipped={flipped && currentCardIndex === i} />
												</li>
											)
										}
									</ul>
									<div class="w-full flex justify-center items-center flex-wrap gap-4">
										<button class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-slate-50 bg-slate-800 hover:bg-slate-700 border border-slate-100 transition-colors" onClick={moveToPreviousCard}>
											Previous Card
										</button>
										<button class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-slate-50 bg-slate-800 hover:bg-slate-700 border border-slate-100 transition-colors" onClick={handleClick}>
											Flip Card
										</button>
										<button class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-slate-50 bg-slate-800 hover:bg-slate-700 border border-slate-100 transition-colors" onClick={moveToNextCard}>
											Next Card
										</button>
									</div>
								</>
							)
							// Check if the list is empty or the user finished the list
							: list && list.length > 0
								? (
									<>
										<h2 class="text-7xl font-bold text-slate-50 text-center mt-24">Finished</h2>
									</>
								)
								: (
									<>
										<h2 class="text-7xl font-bold text-slate-50 text-center mt-24">There are no cards</h2>
										<p class="text-3xl text-center">Try importing your cards or start creating in the flashcards page.</p>
									</>
								)
					}
				</section>
			)
			: (
				<ul class="w-full">
					{
						list.map((c, i) =>
							<li class="w-full">
								<Flashcard front={c.front} back={c.back} type={c.type} />
							</li>
						)
					}
				</ul>
			)
	);
};
