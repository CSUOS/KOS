import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';

import {
	Tooltip, Avatar, Menu, MenuItem, ListItemIcon
} from '@material-ui/core';
import MoodIcon from '@material-ui/icons/Mood';
import PetsIcon from '@material-ui/icons/Pets';
import AppleIcon from '@material-ui/icons/Apple';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import CakeIcon from '@material-ui/icons/Cake';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';

import {
	useUserState, ProjectUserObj, useUserAuthDispatch
} from '../Model';

const returnIcon = (text : string) => {
	let icon = <MoodIcon />;
	switch (text) {
	case 'smile':
		icon = <MoodIcon />;
		break;
	case 'pet':
		icon = <PetsIcon />;
		break;
	case 'apple':
		icon = <AppleIcon />;
		break;
	case 'audio':
		icon = <AudiotrackIcon />;
		break;
	case 'beach':
		icon = <BeachAccessIcon />;
		break;
	case 'cake':
		icon = <CakeIcon />;
		break;
	case 'child':
		icon = <ChildCareIcon />;
		break;
	default:
		icon = <MoodIcon />;
	}

	return icon;
};

type MemberProps = {
	user: ProjectUserObj
}

const Member = ({ user } : MemberProps) => {
	const nowUser : ProjectUserObj | undefined = useUserState();
	const setUserAuth : (uid: number, auth: number) => void = useUserAuthDispatch();
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
	const returnMenu = () => {
		let menuString = '관리자 권한 부여';
		if (user.ID === nowUser?.ID) {
			// 본인 프로필이라면, 메뉴 노출 x
			return undefined;
		}
		if (user.AuthLVL === 1) {
			// 관리자 권한의 유저라면, '유저 권한으로 되돌리기' 사용
			menuString = '유저 권한으로 되돌리기';
		}
		return (
			<Menu
				anchorEl={anchorEl}
				keepMounted
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
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
				<MenuItem>
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
				nowUser && nowUser.AuthLVL === 2 && returnMenu()
				// 현재 유저가 관리자이면 메뉴 노출
			}
		</>
	);
};

export default Member;
