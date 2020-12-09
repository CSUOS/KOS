import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// View는 Controller의 data 및 function을 사용하여 사용자와 상호작용
function SideBarView({ props } : any) {
	const {
		handleSideBarClose,
		open
	} = props;

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
