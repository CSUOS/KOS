import React, {
	Dispatch, useState, createRef, forwardRef, useContext
} from 'react';

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
	ProjectMap, ProjectTeamObj, UserObj, useUserState, useProjectState, usePIDState, useTeamState
} from '../Model';
import { useInviteDispatch, InviteWindow } from './InviteWindow';
import { returnIcon } from '../../function/Icon';

const buttonRef = createRef<HTMLDivElement>();
const searchInputRef = createRef<HTMLDivElement>();

type ProjectHeadProps = {
	sideBarOpen : boolean;
	handleSideBarOpen : () => void;
}

const ProjectHead = forwardRef<HTMLDivElement, ProjectHeadProps>(({
	sideBarOpen, handleSideBarOpen
}, ref) => {
	const project : ProjectMap | undefined = useProjectState();
	const team : ProjectTeamObj | undefined = useTeamState();
	const pid : number = usePIDState();
	const nowUser : UserObj | undefined = useUserState();

	const setInviteOpen : Dispatch<number> = useInviteDispatch();

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
					// project network를 통해 안들어오거나, pid에 해당하는 project가 없으면 표시하지 x
					project && project[pid] &&
					<>
						<Grid className="info-con">
							<Grid className="border-con">
								<Grid className="info">
									<Grid className="project-name">{project[pid].Name}</Grid>
									<SideMenu
										open={open}
										setOpen={setOpen}
										pid={pid}
									/>
								</Grid>
								{ open && <InviteWindow><SubMenu pid={pid} /></InviteWindow> }
							</Grid>
						</Grid>
						{
							team && nowUser &&
							<Grid className="member-con">
								<Grid className="all-member">
									{
										team.map((member) => <Member key={member.ID} user={member} />)
									}
								</Grid>
								<Grid className="plus-member">
									<Tooltip placement="bottom" title="Add Member" arrow>
										<Avatar className="member add-member" onClick={() => setInviteOpen(pid)}>
											<GroupAddIcon />
										</Avatar>
									</Tooltip>
								</Grid>
								<Grid className="my-icon">
									<Tooltip placement="bottom" title="My Profile" arrow>
										<Avatar className="member">
											{returnIcon(nowUser.Icon)}
										</Avatar>
									</Tooltip>
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
