import React from 'react';
import ViewModel from './ViewModel';
import { OpenContextProvider } from './Model/SideBarModel';

// Model과 View Model을 이어주는 역할
function Provider() {
	return (
		<OpenContextProvider>
			<ViewModel/>
		</OpenContextProvider>
	);
}

export default Provider;
