import React, { useState, createRef, forwardRef } from 'react';

import { Grid, Input } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import BackupIcon from '@material-ui/icons/Backup';

import {
	Button, SubMenu, SideMenu, Member
} from '../Shared';
import { ProjectObj, useUserState } from '../Model';

const buttonRef = createRef<HTMLDivElement>();
const searchInputRef = createRef<HTMLDivElement>();

type ProjectHeadProps = {
	sideBarOpen : boolean;
	handleSideBarOpen : () => void;
	project : ProjectObj
}

const ProjectHead = forwardRef<HTMLDivElement, ProjectHeadProps>(({
	sideBarOpen, handleSideBarOpen, project
}, ref) => {
	const [open, setOpen] = useState(false);
	const userID : number = useUserState();

	const searchTask = () => {
		console.dir(searchInputRef.current);
	};

	return (
		<Grid ref={ref} className="project-header">
			<Grid className="main-head-con">
				{
					!sideBarOpen &&
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
						{ open && <SubMenu /> }
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
							project.users.map((user) => {
								if (user.userID === userID) {
									return (
										Member(user)
									);
								}
								return undefined;
							})
						}
					</Grid>
				</Grid>
			</Grid>
			<Grid className="sub-head-con">
				<Grid className="search-con">
					<Input id="search-input" placeholder="검색어 입력" inputRef={searchInputRef} />
					<Button
						classList={[]}
						value={<SearchIcon onClick={searchTask} />}
						tooltip="키워드로 검색하기"
					/>
				</Grid>
				<Grid className="plus-menu-con">
					<Button
						classList={[]}
						value={<BackupIcon onClick={searchTask} />}
						tooltip="백업하기"
					/>
				</Grid>
			</Grid>
		</Grid>
	);
});

export default ProjectHead;
