import React from 'react';
import Grid from '@material-ui/core/Grid';

import './scss/main.scss';

import { SideBarProvider } from './components';

function App() {
	return (
		<Grid className="wrap">
			<SideBarProvider/>
		</Grid>
	);
}

export default App;
