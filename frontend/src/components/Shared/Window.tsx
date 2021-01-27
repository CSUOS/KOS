import React, {
	ReactFragment, createRef, useEffect, useState
} from 'react';
import clsx from 'clsx';
import {
	Backdrop, Paper, Grid, Dialog
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '.';
import { handleOutsideClick } from '../../function/FunctionManager';

/* ====[Window 사용 예시]========
type: 전달할 className
open: window가 열려있는가
maxWidth : xs | sm | md | lg | xl 중 선택 (전달 안 하면 기본은 md)
hasCloseBtn: window 닫는 버튼을 가지고 있는가
handleWindowClose: window를 닫는 함수
children: window 안에 들어갈 내용
================================
*/

// const windowRef = createRef<HTMLDivElement>();

type WindowProps = {
	type: string;
	open: boolean;
	maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
	hasCloseBtn?: boolean | undefined;
	handleWindowClose: () => void | undefined;
	children: ReactFragment;
}

const Window = ({
	type, open, maxWidth, hasCloseBtn, handleWindowClose, children
}: WindowProps) => {
	const a = 1;
	// useEffect(() => {
	// 	document.addEventListener('mousedown',
	// 		(e: any) => handleOutsideClick(e, windowRef, handleWindowClose), true);
	// 	return () => {
	// 		document.removeEventListener('mousedown',
	// 			(e: any) => handleOutsideClick(e, windowRef, handleWindowClose), true);
	// 	};
	// });

	return (
		<>
			{ open &&
				<Grid className="window-background">
					<Grid className="window-background-header" />
					<Dialog
						className="dialog"
						open={open}
						fullWidth={true}
						maxWidth={maxWidth}
						onClose={handleWindowClose}
					>
						<div className={clsx('window', type)}>
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
						</div>
					</Dialog>
				</Grid>}
		</>
	);
};

Window.defaultProps = {
	hasCloseBtn: undefined,
	maxWidth: undefined,
};

export default Window;
