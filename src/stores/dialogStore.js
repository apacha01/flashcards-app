import { atom, map } from 'nanostores';

export const dialogText = map({ title: 'Title here', description: 'Description here', isError: false });
export const showDialog = atom(false);

export const setAndShowDialog = (title, description, isError) => {
	dialogText.set({ title, description, isError });
	openDialog();
}

export const openDialog = () => {
	showDialog.set(true);
}

export const closeDialog = () => {
	showDialog.set(false);
}