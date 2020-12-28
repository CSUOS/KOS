import React, {
	useState, createContext, useContext, Dispatch
} from 'react';

// create context to use open
export const OpenStateContext = createContext<boolean>(true);
export const OpenDispatchContext = createContext<Dispatch<boolean> | undefined>(undefined);

// Model은 Context 저장 및 제공
export const OpenContextProvider = ({ children } : any) => {
	const [open, setOpen] = useState<boolean>(true);

	return (
		<OpenStateContext.Provider value={open}>
			<OpenDispatchContext.Provider value={setOpen}>
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
