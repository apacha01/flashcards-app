import Card from './Card.jsx'
import { useState } from "preact/hooks";

export default function Flashcard({ front, back, type }) {
	const [flipped, setFlipped] = useState(false);

	const handleClick = () => {
		setFlipped(f => !f);
	}

	return (
		<article class="flex flex-col w-full justify-center items-center">
			<Card front={front} back={back} type={type} flipped={flipped} />
			<button
				class="rounded-full font-semibold text-lg tracking-wide block py-3 px-6 text-slate-200 bg-slate-800 hover:bg-slate-700"
				onClick={handleClick}
			>
				Flip Card
			</button>
		</article>
	)
};
