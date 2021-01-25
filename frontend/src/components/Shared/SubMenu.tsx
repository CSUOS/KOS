import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Window, WindowHeader, Button } from '.';
import { useProjectState, ProjectObj } from '../Model';

type SubMenuProps = {
	pid : number;
};

const SubMenu = ({ pid } : SubMenuProps) => {
	const [proSetOpen, setProSetOpen] = useState(false); // 프로젝트 설정창 오픈
	const project : ProjectObj | undefined = useProjectState();
	const windows =
		<>
			<Window
				type="project-setting-con"
				open={proSetOpen}
				hasCloseBtn={true}
				handleWindowClose={() => setProSetOpen(false)}
			>
				<WindowHeader
					mainTitle="Project Setting"
					subTitle="프로젝트에 대한 여러 설정을 하는 곳입니다."
				/>
			</Window>
			<Window
				type="project-copy-con"
				open={proSetOpen}
				hasCloseBtn={true}
				handleWindowClose={() => setProSetOpen(false)}
			>
				<WindowHeader
					mainTitle="Project Copy"
					subTitle="프로젝트를 복사하는 곳입니다."
				/>
			</Window>
			<Window
				type="project-backup-con"
				open={proSetOpen}
				hasCloseBtn={true}
				handleWindowClose={() => setProSetOpen(false)}
			>
				<WindowHeader
					mainTitle="Project BackUp"
					subTitle="프로젝트를 백업하는 곳입니다."
				/>
			</Window>
		</>;

	const deleteProject = () => {
		console.log('delete project');
	};

	const hangUpProject = () => {
		console.log('hangUp project');
	};

	return (
		<>
			{
				project &&
				<>
					{windows}
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
								onClickFun={() => {
									if (window.confirm(`[${project[pid].name}] 프로젝트를 정말로 삭제하시겠습니까?`)) {
										deleteProject();
									}
								}}
							/>
							<p>삭제</p>
						</Grid>
						<Grid className="setting">
							<Button
								classList={[]}
								value={<SettingsIcon />}
								onClickFun={() => { setProSetOpen(true); }}
							/>
							<p>설정</p>
						</Grid>
						<Grid className="leave">
							<Button
								classList={[]}
								value={<ExitToAppIcon />}
								onClickFun={() => {
									if (window.confirm(`[${project[pid].name}] 프로젝트에서 정말로 나가시겠습니까?`)) {
										hangUpProject();
									}
								}}
							/>
							<p>나가기</p>
						</Grid>
					</Grid>
				</>
			}
		</>
	);
};

export default SubMenu;
