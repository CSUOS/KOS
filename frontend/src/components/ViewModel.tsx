import React from 'react';
import { useOpenState, useOpenDispatch } from './Model';
import SideBarView from './View/SideBarView';
import PageView from './View/PageView';
import TaskView from './View/TaskView';

// View Model은 Model의 Context를 구독하고, 갱신하는 역할
function ViewModel() {
	const open : boolean = useOpenState();
	const setOpen = useOpenDispatch();

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
						open={open}
					/> : undefined
			}
			<PageView
				handleSideBarOpen={handleSideBarOpen}
				open={open}
			/>
			<TaskView open={open} handleTaskWindowOpen={undefined} />
		</>
	);
}

export default ViewModel;
