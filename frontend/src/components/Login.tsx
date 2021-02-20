import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useLogin } from './Model';

// Model과 View Model을 이어주는 역할
const Login = () => {
	const login : () => void = useLogin();
	const loginFunc = () => {
		login();
	};
	return (
		<Grid>
			<button type="button" onClick={loginFunc}>login</button>
		</Grid>
	);
};

export default Login;
