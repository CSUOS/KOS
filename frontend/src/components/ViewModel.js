import React from 'react';
import { useOpenState, useOpenDispatch } from './Model/SideBarModel';
import SideBarView from './View/SideBarView';
import PageView from './View/PageView';

// View Model은 Model의 Context를 구독하고, 갱신하는 역할
function ViewModel() {
	const open = useOpenState();
	const setOpen = useOpenDispatch();

	const handleSideBarOpen = () => {
		setOpen(true);
	};

	const handleSideBarClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			{open ?
				<SideBarView
					handleSideBarClose = { handleSideBarClose }
					open = { open }
				/> : undefined
			}
			<PageView
				handleSideBarOpen = { handleSideBarOpen }
				open = { open }
			/>
		</React.Fragment>
	);
}

export default ViewModel;
