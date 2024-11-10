import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../lib/appwrite";
import { Models } from "react-native-appwrite";


interface GlobalStateInterface {
	isLogged: boolean;
	setIsLogged: Dispatch<SetStateAction<boolean>>;
	user: Models.Document | null | undefined;
	setUser: Dispatch<SetStateAction<Models.Document | null | undefined>>;
	loading: boolean;
}

const defaultGlobalState: GlobalStateInterface = {
	isLogged: false,
	setIsLogged: () => {}, // No-op function as placeholder
	user: null,
	setUser: () => {},     // No-op function as placeholder
	loading: false,
};

const GlobalContext = createContext<GlobalStateInterface>(defaultGlobalState);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: any) => {
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState<Models.Document | null | undefined>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
	getCurrentUser()
		.then((res) => {
		if (res) {
			setIsLogged(true);
			setUser(res);
		} else {
			setIsLogged(false);
			setUser(null);
		}
		})
		.catch((error) => {
		console.log(error);
		})
		.finally(() => {
		setLoading(false);
		});
	}, []);

	return (
		<GlobalContext.Provider
		  value={{
			isLogged,
			setIsLogged,
			user,
			setUser,
			loading,
		  }}>
		  {children}
		</GlobalContext.Provider>
	  );
};

export default GlobalProvider;