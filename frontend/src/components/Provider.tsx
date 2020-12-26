import React from 'react';
import { OpenContextProvider } from './Model';
import ViewModel from './ViewModel';

// Model과 View Model을 이어주는 역할
const Provider = () => (
	<OpenContextProvider>
		<ViewModel />
	</OpenContextProvider>
);

export default Provider;
