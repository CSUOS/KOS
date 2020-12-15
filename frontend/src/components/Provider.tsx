import React from 'react';
import ViewModel from './ViewModel';
import { OpenContextProvider } from './Model';

// Model과 View Model을 이어주는 역할
const Provider = () => (
	<OpenContextProvider>
		<ViewModel />
	</OpenContextProvider>
);

export default Provider;
