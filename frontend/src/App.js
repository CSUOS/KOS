import React from 'react';
import Grid from '@material-ui/core/Grid';

import './scss/main.scss';

import Provider from './components/Provider';

function App() {
	return (
		<Grid className="wrap">
			<Provider/>
		</Grid>
	);
}

export default App;
