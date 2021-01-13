import React, { createRef, Dispatch } from 'react';
import {
	useOpenState, useOpenDispatch, useProjectState, useProjectDispatch, usePIDState, usePIDDispatch, ProjectObj
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
	const pid : number = usePIDState();
	const setPID : Dispatch<number> = usePIDDispatch();

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
					project={project}
					ref={sidebarRef}
				/> : <SideBarView
					type="unvisible"
					handleSideBarClose={handleSideBarClose}
					project={project}
					ref={sidebarRef}
				/>
			}
			<PageView
				handleSideBarOpen={handleSideBarOpen}
				open={open}
				project={project !== undefined ? project[pid] : undefined}
				ref={pageRef}
			/>
		</>
	);
};

export default ViewModel;
