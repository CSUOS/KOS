import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function SideBarView(props) {
	const {
		handleSideBarClose
	} = props;

	return (
		<React.Fragment>
			<header className="kos-sidebar">
				<Grid className="kos-sidebar-header">
					<img src="/logo192.png"/>
					<h1>KOS</h1>
				</Grid>
				<Grid className="kos-sidebar-btn">
					<Tooltip title="Close Sidebar" aria-label="close sidebar">
						<ArrowBackIosIcon onClick={handleSideBarClose}/>
					</Tooltip>
				</Grid>
			</header>
		</React.Fragment>
	);
}

export default SideBarView;
