import React, { createRef, Dispatch } from 'react';
import {
	useOpenState, useOpenDispatch, useProjectState, useProjectDispatch, ProjectObj
} from './Model';
import { SideBarView, PageView } from './View';

const sidebarRef = createRef<HTMLDivElement>();
const pageRef = createRef<HTMLDivElement>();

// View Model은 Model의 Context를 구독하고, 갱신하는 역할
const ViewModel = () => {
	const open : boolean = useOpenState();
	const setOpen : Dispatch<boolean> = useOpenDispatch();
	const project : Array<ProjectObj> | undefined = useProjectState();
	const setProject : Dispatch<Array<ProjectObj>> = useProjectDispatch();

	const handleSideBarOpen = () => {
		setOpen(true);
	};

	const handleSideBarClose = () => {
		setOpen(false);
	};

	return (
		<>
			{
				open ?
					<SideBarView
						handleSideBarClose={handleSideBarClose}
						project={project}
						ref={sidebarRef}
					/> : undefined
			}
			<PageView
				handleSideBarOpen={handleSideBarOpen}
				open={open}
				project={project}
				ref={pageRef}
			/>
		</>
	);
};

export default ViewModel;
