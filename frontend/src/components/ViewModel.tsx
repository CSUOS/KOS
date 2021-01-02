import React, { createRef, Dispatch } from 'react';
import { useOpenState, useOpenDispatch } from './Model';
import { SideBarView, PageView } from './View';

const sidebarRef = createRef<HTMLDivElement>();
const pageRef = createRef<HTMLDivElement>();

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
						ref={sidebarRef}
					/> : undefined
			}
			<PageView
				handleSideBarOpen={handleSideBarOpen}
				open={open}
				ref={pageRef}
			/>
		</>
	);
};

export default ViewModel;
