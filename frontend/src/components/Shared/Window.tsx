import React from 'react';
import { Backdrop, Paper, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '.';
/* ====[Window 사용 예시]========
open: window가 열려있는가
hasCloseBtn: window 닫는 버튼을 가지고 있는가
children: window 안에 들어갈 내용
================================
*/
type WindowProps = {
	open: boolean;
	hasCloseBtn: boolean;
	children: React.ReactFragment;
}

const Window = ({ open, hasCloseBtn, children }: WindowProps) => (
	<Backdrop open={open}>
		<Paper className="window">
			{hasCloseBtn &&
				<Grid className="window-closebutton">
					<Button
						classList={['']}
						value={<CloseIcon />}
					/>
				</Grid>}
			<Grid className="window-content">
				{children}
			</Grid>
		</Paper>
	</Backdrop>

);

export default Window;
