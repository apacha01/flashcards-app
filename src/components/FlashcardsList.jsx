import Flashcard from "./Flashcard.jsx";
import { useStore } from "@nanostores/preact";
import { cards } from "../stores/cardsListStore.js";

export default function FlashcardsList({ piledUp = false }) {
	const list = useStore(cards);

	return (
		<ul class="relative w-full">
			{
				list.map((c, i) =>
					<li class={`w-full ${piledUp ? 'absolute' : ''}`} style={{ zIndex: list.length - i }}>
						<Flashcard front={c.front} back={c.back} type={c.type} />
					</li>
				)
			}
		</ul>
	)
};
