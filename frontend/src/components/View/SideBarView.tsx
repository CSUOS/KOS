import React, { createRef, forwardRef } from 'react';
import { Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Button } from '../Shared';

const buttonRef = createRef<HTMLDivElement>();

type SideBarViewProps = {
	open : boolean;
	handleSideBarClose : () => void;
}

// View는 Controller의 data 및 function을 사용하여 사용자와 상호작용
const SideBarView = forwardRef<HTMLDivElement, SideBarViewProps>(({
	open, handleSideBarClose
}, ref) => (
	<Grid ref={ref} className="sidebar">
		<header className="sidebar-header">
			<Grid className="sidebar-header-title">
				<img src="/logo192.png" alt="logo" />
				<h1>KOS</h1>
			</Grid>
			<Button
				classList={['sidebar-btn']}
				value={<ArrowBackIosIcon onClick={handleSideBarClose} />}
				tooltip="Close Sidebar"
				ref={buttonRef}
			/>
		</header>
	</Grid>
));

export default SideBarView;
