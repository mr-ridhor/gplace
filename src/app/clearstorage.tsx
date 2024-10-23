// PersistClearComponent.tsx (Client Component)
"use client"; // This line makes it a client component

import { store } from "@/lib/services/StoreService";
import { reset } from "@/lib/slice/registerSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";

const PersistClearComponent: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const persistor = persistStore(store);

		const clearPersistedData = () => {
			// Clear only the 'register' key from localStorage
			localStorage.removeItem("register");

			// Dispatch the reset action to clear register state
			dispatch(reset());

			// Optionally purge redux-persist data if needed
			persistor.purge();
			console.log('Persisted "register" data cleared and reset dispatched.');
		};

		window.addEventListener("unload", clearPersistedData);

		return () => {
			window.removeEventListener("unload", clearPersistedData);
		};
	}, [dispatch]);

	return null;
};

export default PersistClearComponent;
