import Flashcard from "./Flashcard.jsx";
import { useStore } from "@nanostores/preact";
import { cards } from "../stores/cardsListStore.js";
import { useEffect, useState } from "preact/hooks";
import Card from "./Card.jsx";

export default function FlashcardsList({ piledUp = false, toStudy = false, shuffle = false }) {
	const list = useStore(cards);
	const [currentList, setCurrentList] = useState(list);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);

	useEffect(() => {
		if (shuffle)
			shuffleList();
	}, []);

	const shuffleList = (l = null) => {
		// https://bost.ocks.org/mike/shuffle/
		// shuffle the list itself or another passed as parameter
		let list = l ?? [...currentList];
		let currentIndex = list.length;
		let randomIndex;

		while (currentIndex > 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[list[currentIndex], list[randomIndex]] = [list[randomIndex], list[currentIndex]];
		}

		setCurrentList(list);
	}

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

	const handleKnownCardClick = () => {
		currentList[currentCardIndex].known = true;
		moveToNextCard();
	};

	const handleSaveCardForNextTryClick = () => {
		currentList[currentCardIndex].known = false;
		moveToNextCard();
	};

	const handleContinue = () => {
		shuffleList(currentList.filter(c => !c.known));
		setCurrentCardIndex(0);
	};

	const handleRestart = () => {
		shuffleList(list);
		setCurrentCardIndex(0);
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
										{
											toStudy
												? (
													<>
														<button class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-slate-50 bg-slate-800 hover:bg-slate-700 border border-slate-100 transition-colors" onClick={moveToPreviousCard}>
															<img class="w-7 h-7" src="/flashcards-app/back.svg" alt="Back icon" />
														</button>
														<button class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-orange-50 bg-orange-800 hover:bg-orange-700 border border-orange-100 transition-colors" onClick={handleSaveCardForNextTryClick}>
															Save this for next try
														</button>
														<button class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-green-50 bg-green-800 hover:bg-green-700 border border-green-100 transition-colors" onClick={handleKnownCardClick}>
															I know this one
														</button>
														<button
															class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-slate-50 bg-slate-800 hover:bg-slate-700 border border-slate-100 transition-colors"
															onClick={handleClick}
														>
															Flip Card
														</button>
													</>
												)
												: (
													<>
														<button class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-slate-50 bg-slate-800 hover:bg-slate-700 border border-slate-100 transition-colors" onClick={moveToPreviousCard}>
															Previous Card
														</button>
														<button class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-slate-50 bg-slate-800 hover:bg-slate-700 border border-slate-100 transition-colors" onClick={handleClick}>
															Flip Card
														</button>
														<button class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-slate-50 bg-slate-800 hover:bg-slate-700 border border-slate-100 transition-colors" onClick={moveToNextCard}>
															Next Card
														</button>
													</>
												)
										}
									</div>
								</>
							)
							// Check if the list is empty or the user finished the list
							: list && list.length > 0
								? (
									<>
										<h2 class="text-7xl font-bold text-slate-50 text-center mt-24">Finished</h2>
										<p class="text-3xl"><strong>Continue</strong> to study only the cards you didn't mark as known.</p>
										<p class="text-3xl"><strong>Restart</strong> to study with all cards from scratch.</p>
										<div class="flex gap-4 justify-center">
											<button class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-slate-50 bg-slate-800 hover:bg-slate-700 border border-slate-100 transition-colors" onClick={handleContinue}>
												Continue
											</button>
											<button class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-slate-50 bg-slate-800 hover:bg-slate-700 border border-slate-100 transition-colors" onClick={handleRestart}>
												Restart
											</button>
										</div>
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
