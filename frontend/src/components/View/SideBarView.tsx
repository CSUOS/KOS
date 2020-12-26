import React from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

type SideBarViewProps = {
	open : boolean;
	handleSideBarClose : any;
}

// View는 Controller의 data 및 function을 사용하여 사용자와 상호작용
function SideBarView({ open, handleSideBarClose } : SideBarViewProps) {
	return (
		<Grid className="sidebar">
			<header className="sidebar-header">
				<Grid className="sidebar-header-title">
					<img src="/logo192.png" alt="logo" />
					<h1>KOS</h1>
				</Grid>
				<Grid className="sidebar-btn">
					<Tooltip title="Close Sidebar" aria-label="close sidebar">
						<ArrowBackIosIcon onClick={handleSideBarClose} />
					</Tooltip>
				</Grid>
			</header>
		</Grid>
	);
}

export default SideBarView;
