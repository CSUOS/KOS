import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
/* ====[Window 사용 예시]========
open: window가 열렸는지, 닫혔는지
children: window 안에 들어갈 내용
================================
*/
type WindowProps = {
	open: boolean;
	children: any;
}

const Window = ({ open, children }: WindowProps) => (
	<Grid container className="windowbackground">
		<Box className="windowbackground-header" />
		<Backdrop className="windowbackground-backrop" open={open}>
			<Paper className="window">
				<Grid className="window-content">{children}</Grid>
			</Paper>
		</Backdrop>
	</Grid>
);

export default Window;
