import React, { useState, createContext, useContext } from 'react';

// create context to use open
export const OpenStateContext = createContext<any>(null);
export const OpenDispatchContext = createContext<any>(null);

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
	if (!context) throw new Error('cannot use useOpenState'); // 유효하지 않을땐 에러를 발생
	return context;
}

export function useOpenDispatch() {
	const context = useContext(OpenDispatchContext);
	if (!context) throw new Error('cannot use useOpenDispatch'); // 유효하지 않을땐 에러를 발생
	return context;
}
