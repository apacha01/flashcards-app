import { useEffect, useState } from "preact/hooks";
import Flashcard from "./Flashcard.jsx";

export default function FlashcardsList({ piledUp = false }) {
	const [list, setList] = useState([]);

	useEffect(() => {
		const handleStorageChange = () => {
			setList(JSON.parse(localStorage.getItem('cards')) ?? []);
		};

		// Add the event listener for the storage change
		window.addEventListener('storage', handleStorageChange);

		// Initial fetch of data from localStorage
		handleStorageChange();

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return (
		<ul class="w-full">
			{
				list.map((c, i) =>
					<li class="w-full" style={{ zIndex: i }}>
						<Flashcard front={c.front} back={c.back} type={c.type} />
					</li>
				)
			}
		</ul>
	)
};
