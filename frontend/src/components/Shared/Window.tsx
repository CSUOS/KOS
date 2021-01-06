import React from 'react';
import { Backdrop, Paper, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '.';
/* ====[Window 사용 예시]========
open: window가 열렸는지, 닫혔는지
children: window 안에 들어갈 내용
================================
*/
type WindowProps = {
	open: boolean;
	hasCloseButton: boolean;
	children: React.ReactFragment;
}

const Window = ({ open, hasCloseButton, children }: WindowProps) => (
	<Grid container className="windowbackground">
		<Grid className="windowbackground-header" />
		<Backdrop className="windowbackground-backrop" open={open}>
			<Paper className="window">
				<Grid className="window-content">
					{hasCloseButton ?
						<Grid className="window-close-button">
							<Button
								classList={['']}
								value={<CloseIcon />}
							/>
						</Grid>
						: undefined}
					{children}
				</Grid>
			</Paper>
		</Backdrop>
	</Grid>
);

export default Window;
