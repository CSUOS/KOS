import { useState, createContext, useContext } from 'react';

// create context to use open
export const OpenStateContext = createContext();
export const OpenDispatchContext = createContext();

// Model은 Context 저장 및 제공
export const OpenContextProvider = ({ children }) => {
	const [open, setOpen] = useState(true);

	return (
		<OpenStateContext.Provider value = {open}>
			<OpenDispatchContext.Provider value = {setOpen}>
				{children}
			</OpenDispatchContext.Provider>
		</OpenStateContext.Provider>
	);
};

export function useOpenState() {
	const context = useContext(OpenStateContext);
	return context;
}

export function useOpenDispatch() {
	const context = useContext(OpenDispatchContext);
	return context;
}
