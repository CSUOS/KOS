import React from 'react';
import {
	Backdrop, Paper, Grid, Box
} from '@material-ui/core';
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
