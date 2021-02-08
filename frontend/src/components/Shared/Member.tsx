import React, { useState } from 'react';
import clsx from 'clsx';

import {
	Tooltip, Avatar, Menu, MenuItem, ListItemIcon
} from '@material-ui/core';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';

import {
	useUserState, useProjectState, ProjectMap, usePIDState, ProjectUserObj, UserObj, useUserAuthDispatch, useExitProject
} from '../Model';
import { returnIcon } from '../../function/Icon';

type MemberProps = {
	user: ProjectUserObj
}

const Member = ({ user } : MemberProps) => {
	const project : ProjectMap | undefined = useProjectState();
	const pid : number = usePIDState();
	const nowUser : UserObj | undefined = useUserState();
	const setUserAuth : (uid: number, auth: number) => void = useUserAuthDispatch();
	const exitProject : (projectID : number, uid: number) => void = useExitProject();
	const [anchorEl, setAnchorEl] = useState<EventTarget & Element | null>(null);
	const handleClick = (event : React.SyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const userAuthChange = (auth: number) => {
		// 유저 권한 변경
		setUserAuth(user.ID, auth);
	};
	const makeUserOut = () => {
		exitProject(pid, user.ID);
	};
	const returnMenu = () => {
		let menuString = '관리자 권한 부여';
		if (user.ID === nowUser?.ID || project === undefined) {
			// 본인 프로필이라면, 메뉴 노출 x
			return undefined;
		}
		if (user.AuthLVL === 2) {
			// 관리자 권한의 유저라면, '유저 권한으로 되돌리기' 사용
			// todo: 관리자 권한의 유저에게 표시하기
			menuString = '유저 권한으로 되돌리기';
		}
		return (
			<Menu
				anchorEl={anchorEl}
				getContentAnchorEl={null}
				keepMounted
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={anchorEl !== null}
				onClose={handleClose}
				className="menu-popup"
			>
				<MenuItem onClick={() => userAuthChange(user.AuthLVL)}>
					<ListItemIcon>
						<SupervisedUserCircleIcon />
					</ListItemIcon>
					{menuString}
				</MenuItem>
				<MenuItem onClick={makeUserOut}>
					<ListItemIcon>
						<CallMissedOutgoingIcon />
					</ListItemIcon>
					추방하기
				</MenuItem>
			</Menu>
		);
	};

	return (
		<>
			<Tooltip placement="bottom" title={user.Name} arrow>
				<Avatar className={clsx('member', user.Icon)} onClick={handleClick}>
					{returnIcon(user.Icon)}
				</Avatar>
			</Tooltip>
			{
				nowUser && project && project[pid].Auth === 2 && returnMenu()
			}
		</>
	);
};

export default Member;
