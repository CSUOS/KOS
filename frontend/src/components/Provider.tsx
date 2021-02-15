import React from 'react';
import {
	OpenContextProvider, ProjectContextProvider, PIDContextProvider
} from './Model';
import ViewModel from './ViewModel';

// Model과 View Model을 이어주는 역할
const Provider = () => (
	<PIDContextProvider>
		<ProjectContextProvider>
			<OpenContextProvider>
				<ViewModel />
			</OpenContextProvider>
		</ProjectContextProvider>
	</PIDContextProvider>
);

export default Provider;
