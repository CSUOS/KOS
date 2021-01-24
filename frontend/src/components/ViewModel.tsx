import React, { createRef, Dispatch } from 'react';
import {
	useOpenState, useOpenDispatch
} from './Model';
import { SideBarView, PageView } from './View';

const sidebarRef = createRef<HTMLDivElement>();
const pageRef = createRef<HTMLDivElement>();

// View Model은 Model의 Context를 구독하고, 갱신하는 역할
const ViewModel = () => {
	const open : boolean = useOpenState();
	const setOpen : Dispatch<boolean> = useOpenDispatch();
	const handleSideBarOpen = () => {
		setOpen(true);
	};

	const handleSideBarClose = () => {
		setOpen(false);
	};

	return (
		<>
			{
				open ? <SideBarView
					type="visible"
					handleSideBarClose={handleSideBarClose}
					ref={sidebarRef}
				/> : <SideBarView
					type="unvisible"
					handleSideBarClose={handleSideBarClose}
					ref={sidebarRef}
				/>
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
