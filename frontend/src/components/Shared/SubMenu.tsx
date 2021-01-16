import React from 'react';

import { Grid } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Button } from '.';

const SubMenu = () => {
	const a = 1;
	return (
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
	);
};

export default SubMenu;
