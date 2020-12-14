import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

type WindowBgProps = {
	open: boolean;
}

function WindowBackground({ open }: WindowBgProps) {
	return (
		<Grid item className="windowbackground">
			<Grid className="windowbackground-header">{undefined}</Grid>
			<Backdrop className="windowbackground-backrop" open={open}>{undefined}</Backdrop>
		</Grid>
	);
}

type WindowProps = {
	open: boolean;
	value: any;
}

function Window({ open, value }: WindowProps) {
	return (
		<Grid>
			<WindowBackground open={open} />
			<Paper className="window">
				<Grid className="window-content">{value}</Grid>
			</Paper>
		</Grid>

	);
}

export default Window;
