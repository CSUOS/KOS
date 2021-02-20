import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import './scss/main.scss';

import Provider from './components/Provider';
import Login from './components/Login';
import Error from './components/Error';
import { UserContextProvider } from './components/Model';

function App() {
	return (
		<BrowserRouter>
			<UserContextProvider>
				<Grid className="wrap">
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/home" component={Provider} />
						<Route path="*" component={Error} />
					</Switch>
				</Grid>
			</UserContextProvider>
		</BrowserRouter>
	);
}

export default App;
