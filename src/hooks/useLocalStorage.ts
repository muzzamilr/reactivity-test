import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <T>(
	key: string,
	initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] => {
	const readValue = useCallback((): T => {
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);

			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	}, [initialValue, key]);

	const [storedValue, setStoredValue] = useState<T>(readValue);

	const setValue = useCallback(
		(value: T | ((val: T) => T)) => {
			try {
				setStoredValue((currentStoredValue) => {
					const valueToStore =
						value instanceof Function ? value(currentStoredValue) : value;

					if (
						JSON.stringify(currentStoredValue) === JSON.stringify(valueToStore)
					) {
						return currentStoredValue;
					}

					if (typeof window !== "undefined") {
						window.localStorage.setItem(key, JSON.stringify(valueToStore));

						window.dispatchEvent(
							new StorageEvent("storage", {
								key,
								newValue: JSON.stringify(valueToStore),
								storageArea: window.localStorage,
							}),
						);
					}

					return valueToStore;
				});
			} catch (error) {}
		},
		[key],
	);

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === key && event.newValue !== null) {
				try {
					const newValue = JSON.parse(event.newValue);
					setStoredValue(newValue);
				} catch (error) {}
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [key]);

	return [storedValue, setValue];
};
