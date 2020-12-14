import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

type WindowProps = {
	open: boolean;
	children: any;
}

function Window({ open, children }: WindowProps) {
	return (
		<Grid container className="windowbackground">
			<Box className="windowbackground-header" />
			<Backdrop className="windowbackground-backrop" open={open}>
				<Paper className="window">
					<Grid className="window-content">{children}</Grid>
				</Paper>
			</Backdrop>
		</Grid>
	);
}

export default Window;
