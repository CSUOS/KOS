import React, { useState, createRef, forwardRef } from 'react';

import {
	Grid, Input, Tooltip, Avatar
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import BackupIcon from '@material-ui/icons/Backup';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import {
	Button, SubMenu, SideMenu, Member
} from '../Shared';
import {
	ProjectObj, ProjectTeamObj, useUserState, useProjectState, usePIDState, useTeamState
} from '../Model';

const buttonRef = createRef<HTMLDivElement>();
const searchInputRef = createRef<HTMLDivElement>();

type ProjectHeadProps = {
	sideBarOpen : boolean;
	handleSideBarOpen : () => void;
}

const ProjectHead = forwardRef<HTMLDivElement, ProjectHeadProps>(({
	sideBarOpen, handleSideBarOpen
}, ref) => {
	const project : ProjectObj | undefined = useProjectState();
	const team : ProjectTeamObj | undefined = useTeamState();
	const pid : number = usePIDState();
	const userID : number = useUserState();

	const [open, setOpen] = useState(false);

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
				{
					project && pid &&
					<>
						<Grid className="info-con">
							<Grid className="border-con">
								<Grid className="info">
									<Grid className="project-name">{project[pid].name}</Grid>
									<SideMenu
										open={open}
										setOpen={setOpen}
										pid={pid}
									/>
								</Grid>
								{ open && <SubMenu /> }
							</Grid>
						</Grid>
						{
							team &&
							<Grid className="member-con">
								<Grid className="all-member">
									{
										team[pid].map((member) => Member(member))
									}
								</Grid>
								<Grid className="plus-member">
									<Tooltip placement="bottom" title="Add Member">
										<Avatar className="member add-member">
											<GroupAddIcon />
										</Avatar>
									</Tooltip>
								</Grid>
								<Grid className="my-icon">
									{
										team[pid].map((member) => {
											if (member.userID === userID) {
												return (
													Member(member)
												);
											}
											return undefined;
										})
									}
								</Grid>
							</Grid>
						}
					</>
				}
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
