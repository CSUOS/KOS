import React, { Dispatch, useState } from 'react';

import { Grid } from '@material-ui/core';

import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { ProjectMap, useProjectState, useProjectUpdate } from '../Model';
import { Button } from '.';

type SideMenuProps = {
	open : boolean;
	setOpen : Dispatch<boolean>;
	pid : number;
}

const SideMenu = ({ open, setOpen, pid } : SideMenuProps) => {
	const project : ProjectMap | undefined = useProjectState();
	const setProject : (id: number, p: ProjectMap) => void = useProjectUpdate();

	const togglePrivate = () => {
		if (project === undefined || pid === undefined) {
			return;
		}
		const tmp = project;
		tmp[pid].IsPrivate = !tmp[pid].IsPrivate;
		setProject(pid, tmp);
	};
	const toggleMark = () => {
		if (project === undefined || pid === undefined) {
			return;
		}
		const tmp = project;
		tmp[pid].BookMark = !tmp[pid].BookMark;
		setProject(pid, tmp);
	};

	return (
		<>
			{
				// project network를 통해 안들어오거나, pid에 해당하는 project가 없으면 표시하지 x
				project && project[pid] &&
				<Grid className="detail">
					<Grid className="private">
						<Button
							classList={[]}
							value={project[pid].IsPrivate ? <LockIcon /> : <LockOpenIcon />}
							transparent={true}
							onClickFun={() => togglePrivate()}
						/>
					</Grid>
					<Grid className="book-mark">
						<Button
							classList={[]}
							value={project[pid].BookMark ? <StarIcon /> : <StarBorderIcon />}
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
