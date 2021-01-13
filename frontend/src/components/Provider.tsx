import React from 'react';
import {
	OpenContextProvider, ProjectContextProvider, PIDContextProvider, UserContextProvider
} from './Model';
import ViewModel from './ViewModel';

// Model과 View Model을 이어주는 역할
const Provider = () => (
	<UserContextProvider>
		<PIDContextProvider>
			<ProjectContextProvider>
				<OpenContextProvider>
					<ViewModel />
				</OpenContextProvider>
			</ProjectContextProvider>
		</PIDContextProvider>
	</UserContextProvider>
);

export default Provider;
