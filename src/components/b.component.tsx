import { useAdmin } from "@/hooks/useAdmin";
import { useStopWatch } from "@/hooks/useStopwatch";

export const B = () => {
	const { stopWatch } = useStopWatch();

	// WARN: uncommenting this statement below will make this component re-render if admin is udpated
	// const { admin } = useAdmin();

	console.log("I am re rendering", stopWatch);

	return <div>{stopWatch.status}</div>;
};
