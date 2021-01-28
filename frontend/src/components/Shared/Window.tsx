import React, { ReactFragment, createRef, useEffect } from 'react';
import clsx from 'clsx';
import { Backdrop, Paper, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '.';
import { handleOutsideClick } from '../../function/FunctionManager';

/* ====[Window 사용 예시]========
type: 전달할 className
open: window가 열려있는가
hasCloseBtn: window 닫는 버튼을 가지고 있는가
handleWindowClose: window를 닫는 함수
children: window 안에 들어갈 내용
================================
*/

const windowRef = createRef<HTMLDivElement>();
type WindowProps = {
	type: string;
	open: boolean;
	hasCloseBtn?: boolean | undefined;
	handleWindowClose: () => void | undefined;
	children: ReactFragment;
}

const Window = ({
	type, open, hasCloseBtn, handleWindowClose, children
}: WindowProps) => {
	useEffect(() => {
		document.addEventListener('mousedown',
			(e: any) => handleOutsideClick(e, windowRef, handleWindowClose), true);
		return () => {
			document.removeEventListener('mousedown',
				(e: any) => handleOutsideClick(e, windowRef, handleWindowClose), true);
		};
	});

	return (
		<>
			{ open &&
				<Grid className="window-background">
					<Grid className="window-background-header" />
					<Backdrop className="window-backdrop" open={open}>
						<Paper ref={windowRef} className={clsx('window', type)}>
							{hasCloseBtn &&
								<Grid className="window-closebutton">
									<Button
										classList={['']}
										value={<CloseIcon />}
										transparent={true}
										onClickFun={handleWindowClose}
									/>
								</Grid>}
							<Grid className="window-content">
								{children}
							</Grid>
						</Paper>
					</Backdrop>
				</Grid>}
		</>
	);
};

Window.defaultProps = {
	hasCloseBtn: undefined,
};

export default Window;
