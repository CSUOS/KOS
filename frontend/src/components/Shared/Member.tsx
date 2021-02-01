import React, { useState } from 'react';
import clsx from 'clsx';

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

import { UserObj } from '../Model';

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
	user: UserObj
}

const Member = ({ user } : MemberProps) => {
	const [anchorEl, setAnchorEl] = useState<EventTarget & Element | null>(null);
	const handleClick = (event : React.SyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<Tooltip placement="bottom" title={user.userName} arrow>
				<Avatar className={clsx('member', user.userIcon)} onClick={handleClick}>
					{returnIcon(user.userIcon)}
				</Avatar>
			</Tooltip>
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
				<MenuItem>
					<ListItemIcon>
						<SupervisedUserCircleIcon />
						관리자 권한부여
					</ListItemIcon>
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<CallMissedOutgoingIcon />
						추방하기
					</ListItemIcon>
				</MenuItem>
			</Menu>
		</>
	);
};

export default Member;
