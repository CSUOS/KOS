import React from 'react';
import { OpenContextProvider, ProjectContextProvider } from './Model';
import ViewModel from './ViewModel';

// Model과 View Model을 이어주는 역할
const Provider = () => (
	<ProjectContextProvider>
		<OpenContextProvider>
			<ViewModel />
		</OpenContextProvider>
	</ProjectContextProvider>
);

export default Provider;
