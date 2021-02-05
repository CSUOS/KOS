import React, { createRef, forwardRef } from 'react';
import { Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Button } from '../Shared';
import { SideProject } from '../Sub';
import { ProjectObj } from '../Model';

const buttonRef = createRef<HTMLDivElement>();
const projectRef = createRef<HTMLDivElement>();

type SideBarViewProps = {
	handleSideBarClose : () => void;
	project : Array<ProjectObj> | undefined;
}

// View는 Controller의 data 및 function을 사용하여 사용자와 상호작용
const SideBarView = forwardRef<HTMLDivElement, SideBarViewProps>(({
	handleSideBarClose, project
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
				ttside="right"
				transparent={true}
				ref={buttonRef}
			/>
		</header>
		<Grid className="project-con">
			{
				project !== undefined ?
					project.map((p) => <SideProject ref={projectRef} project={p} />) : undefined
			}
		</Grid>
		<Grid className="generate-project">
			<Button
				classList={[]}
				value="+ 새로운 프로젝트 만들기"
				transparent={true}
			/>
		</Grid>
	</Grid>
));

export default SideBarView;
