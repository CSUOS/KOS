import React, { Dispatch } from 'react';

import { Grid } from '@material-ui/core';

import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import StarIcon from '@material-ui/icons/Star';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { ProjectObj } from '../Model';
import { Button } from '.';

type SideMenuProps = {
	open : boolean;
	setOpen : Dispatch<boolean>;
	project : ProjectObj;
}

const SideMenu = ({ open, setOpen, project } : SideMenuProps) => {
	const a = 1;
	return (
		<>
			<Grid className="detail">
				<Grid className="private">
					<Button
						classList={[]}
						value={project.isPrivate ? <LockIcon /> : <LockOpenIcon />}
						transparent={true}
						// onClickFun={() => togglePrivate(project.projectID)}
					/>
				</Grid>
				<Grid className="book-mark">
					<Button
						classList={[]}
						value={project.bookMark ? <StarIcon /> : <></>}
						transparent={true}
						// onClickFun={() => setOpen(!open)}
					/>
				</Grid>
			</Grid>
			<Grid className="arrow">
				<Button
					classList={[]}
					value={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					tooltip={open ? 'Close Project Menu' : 'Open Project Menu'}
					ttside="right"
					transparent={true}
					onClickFun={() => setOpen(!open)}
				/>
			</Grid>
		</>
	);
};

export default SideMenu;
