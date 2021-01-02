import React, { forwardRef } from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import StarIcon from '@material-ui/icons/Star';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { ProjectObj } from '../Model';
import { Button } from '../Shared';

type SideProjectProps = {
	project : ProjectObj;
}

const SideProject = forwardRef<HTMLDivElement, SideProjectProps>(({
	project
}, ref) => {
	const a = 1;
	return (
		<Grid ref={ref} className="side-project">
			<Grid className="project-info">
				<Grid className="info">
					<Grid className={clsx('bg-color', project.bgColor)}> </Grid>
					<Grid className="project-name"><p>{project.name}</p></Grid>
					<Grid className="private">{project.isPrivate ? <LockIcon /> : <LockOpenIcon />}</Grid>
					<Grid className="book-mark">{project.bookMark ? <StarIcon /> : undefined}</Grid>
				</Grid>
				<Grid className="arrow">
					<Button
						classList={[]}
						value={<KeyboardArrowDownIcon />}
						tooltip="Open Project Menu"
						ttside="right"
						transparent={true}
					/>
				</Grid>
			</Grid>
			<Grid className="sub-menu">
				<Grid className="copy">
					<Button
						classList={[]}
						value={<FileCopyIcon />}
					/>
					<p>복사</p>
				</Grid>
				<Grid className="invite">
					<Button
						classList={[]}
						value={<GroupAddIcon />}
					/>
					<p>초대</p>
				</Grid>
				<Grid className="back-up">
					<Button
						classList={[]}
						value={<BackupIcon />}
					/>
					<p>백업</p>
				</Grid>
				<Grid className="delete">
					<Button
						classList={[]}
						value={<DeleteIcon />}
					/>
					<p>삭제</p>
				</Grid>
				<Grid className="setting">
					<Button
						classList={[]}
						value={<SettingsIcon />}
					/>
					<p>설정</p>
				</Grid>
				<Grid className="leave">
					<Button
						classList={[]}
						value={<ExitToAppIcon />}
					/>
					<p>나가기</p>
				</Grid>
			</Grid>
		</Grid>
	);
});

export default SideProject;
