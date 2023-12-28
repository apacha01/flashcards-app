import { atom, onMount, onSet } from "nanostores";

// Store
export const cards = atom([]);

// on Methods
onMount(cards, () => {
	cards.set(JSON.parse(localStorage.getItem('cards')) ?? []);
});

onSet(cards, ({ newValue }) => {
	localStorage.setItem('cards', JSON.stringify(newValue));
});

// Functions
export const setCards = (list) => {
	cards.set(list);
};

export const addCardToList = (card) => {
	if (
		card.front && typeof card.front === 'string' &&
		card.back && typeof card.back === 'string' &&
		card.type && typeof card.type === 'string'
	) {
		cards.set([...cards.get(), card]);
	}
};