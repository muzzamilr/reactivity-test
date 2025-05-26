import { useLocalStorage } from "./useLocalStorage";

const stopWatchInitialState = {
	stopWatch: {
		action: "",
		adminId: "",
		cartId: "",
		comment: null,
		facilityId: "",
		result: "",
		status: "",
		stopWatchId: "",
		unit: "",
		startedAt: "",
		stoppedAt: "",
		cart: { cart: "" },
	},
};

type StopWatchState = typeof stopWatchInitialState.stopWatch;

export function useStopWatch() {
	const [stopWatch, setStopWatch] = useLocalStorage<StopWatchState>(
		"stopWatch",
		stopWatchInitialState.stopWatch,
	);

	const startStopWatch = (payload: StopWatchState) => {
		setStopWatch({
			...payload,
		});
	};

	const stopStopWatch = () => {
		setStopWatch({
			...stopWatchInitialState.stopWatch,
		});
	};

	return {
		stopWatch,
		startStopWatch,
		stopStopWatch,
	};
}
