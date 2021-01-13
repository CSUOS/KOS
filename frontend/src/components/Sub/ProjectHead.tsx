import React, { useState, createRef, forwardRef } from 'react';

import { Grid, Input } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';

import {
	Button, SubMenu, SideMenu, Member
} from '../Shared';
import { ProjectObj } from '../Model';

const buttonRef = createRef<HTMLDivElement>();

type ProjectHeadProps = {
	sideBarOpen : boolean;
	handleSideBarOpen : () => void;
	project : ProjectObj
}

const ProjectHead = forwardRef<HTMLDivElement, ProjectHeadProps>(({
	sideBarOpen, handleSideBarOpen, project
}, ref) => {
	const [open, setOpen] = useState(false);

	return (
		<Grid ref={ref} className="project-header">
			<Grid className="main-head-con">
				{
					sideBarOpen ?
						undefined
						:
						<Button
							classList={['sidebar-btn']}
							value={<ArrowForwardIosIcon onClick={handleSideBarOpen} />}
							tooltip="Open Sidebar"
							transparent={true}
							ref={buttonRef}
						/>
				}
				<Grid className="info-con">
					<Grid className="border-con">
						<Grid className="info">
							<Grid className="project-name">{project.name}</Grid>
							<SideMenu
								open={open}
								setOpen={setOpen}
								project={project}
							/>
						</Grid>
						{ open ?
							<SubMenu />
							: undefined }
					</Grid>
				</Grid>
				<Grid className="member-con">
					<Grid className="all-member">
						{
							project.users.map((user) => Member(user))
						}
					</Grid>
					<Grid className="my-icon">
						{
							// model에 user 정보 저장하게 하고, 받아오기
						}
						내 아이콘
					</Grid>
				</Grid>
			</Grid>
			<Grid className="sub-head-con">
				<Grid className="search-con">
					<Input id="search-input" placeholder="검색어 입력" />
					<Button
						classList={[]}
						value={<SearchIcon />}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
});

export default ProjectHead;
