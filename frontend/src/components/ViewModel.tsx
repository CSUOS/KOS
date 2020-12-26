import React, { Dispatch } from 'react';
import { useOpenState, useOpenDispatch } from './Model';
import SideBarView from './View/SideBarView';
import PageView from './View/PageView';

// View Model은 Model의 Context를 구독하고, 갱신하는 역할
const ViewModel = () => {
	const open : boolean = useOpenState();
	const setOpen : Dispatch<boolean> | undefined = useOpenDispatch();

	const handleSideBarOpen = () => {
		if (setOpen !== undefined) setOpen(true);
	};

	const handleSideBarClose = () => {
		if (setOpen !== undefined) setOpen(false);
	};

	return (
		<>
			{
				open ?
					<SideBarView
						handleSideBarClose={handleSideBarClose}
						open={open}
					/> : undefined
			}
			<PageView
				handleSideBarOpen={handleSideBarOpen}
				open={open}
			/>
		</>
	);
};

export default ViewModel;
