import React, { Dispatch, useState } from 'react';

import { Grid } from '@material-ui/core';

import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { ProjectObj, useProjectState, useProjectDispatch } from '../Model';
import { Button } from '.';

type SideMenuProps = {
	open : boolean;
	setOpen : Dispatch<boolean>;
	pid : number;
}

const SideMenu = ({ open, setOpen, pid } : SideMenuProps) => {
	const project : ProjectObj | undefined = useProjectState();
	const setProject : Dispatch<ProjectObj> = useProjectDispatch();
	const [update, forceUpdate] = useState(true);

	const togglePrivate = () => {
		if (project === undefined || pid === undefined) {
			return;
		}
		const tmp = project;
		tmp[pid].isPrivate = !tmp[pid].isPrivate;
		console.log(`toogle ${pid} to ${!tmp[pid].isPrivate}`);
		setProject(tmp);
		forceUpdate(!update);
	};
	const toggleMark = () => {
		if (project === undefined || pid === undefined) {
			return;
		}
		const tmp = project;
		tmp[pid].bookMark = !tmp[pid].bookMark;
		console.log(`toogle ${pid} to ${!tmp[pid].bookMark}`);
		setProject(tmp);
		forceUpdate(!update);
	};

	return (
		<>
			{
				project && pid &&
				<Grid className="detail">
					<Grid className="private">
						<Button
							classList={[]}
							value={project[pid].isPrivate ? <LockIcon /> : <LockOpenIcon />}
							transparent={true}
							onClickFun={() => togglePrivate()}
						/>
					</Grid>
					<Grid className="book-mark">
						<Button
							classList={[]}
							value={project[pid].bookMark ? <StarIcon /> : <StarBorderIcon />}
							transparent={true}
							onClickFun={() => toggleMark()}
						/>
					</Grid>
				</Grid>
			}
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
