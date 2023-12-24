import { dialogText, showDialog, closeDialog } from "../stores/dialogStore";
import { useStore } from "@nanostores/preact";

export default function Dialog() {
	const { title, description, isError } = useStore(dialogText);
	const show = useStore(showDialog);

	return (
		<div class={`${show ? 'ease-out duration-200 opacity-100 visible' : 'ease-in duration-100 opacity-0 invisible scale-95'} transition-[scale_opacity] fixed w-screen h-screen flex justify-center items-center bg-slate-950/70 z-[9999]`}>
			<div
				class={
					`flex flex-col justify-center items-center gap-8 px-6 py-8 min-w-80 min-h-32 rounded-2xl border-2 ${isError
						? 'bg-red-800 border-red-100 text-red-100'
						: 'bg-slate-800 border-slate-100 text-slate-100'}`
				}
			>
				<h2 class="text-3xl font-bold">
					{title}
				</h2>
				<p class="text-2xl max-w-prose">
					{description}
				</p>
				<button
					class={
						`rounded-full font-semibold text-lg tracking-wide block py-3 px-6 transition-colors border-2 ${isError
							? 'bg-red-600 border-red-300 hover:bg-red-300 hover:text-red-800'
							: 'bg-slate-600 border-slate-300 hover:bg-slate-300 hover:text-slate-800'}`
					}
					onClick={closeDialog}
				>
					Close
				</button>
			</div>
		</div>
	)
};
