import React, { useState, Dispatch } from 'react';
import axios from 'axios';

import { Grid } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Window, WindowHeader, Button } from '.';
import { useProjectState, ProjectObj, useProjectDelete } from '../Model';
import { useInviteDispatch } from '../Sub/InviteWindow';

type SubMenuProps = {
	pid : number;
};

const SubMenu = ({ pid } : SubMenuProps) => {
	const [proSetOpen, setProSetOpen] = useState<boolean>(false); // 프로젝트 설정창 오픈
	const [proCopyOpen, setProCopyOpen] = useState<boolean>(false); // 프로젝트 복사창 오픈
	const [proBackUpOpen, setProBackUpOpen] = useState<boolean>(false); // 프로젝트 복사창 오픈
	const setInviteOpen : Dispatch<number> = useInviteDispatch();

	const userAuth = 2;
	const project : ProjectObj | undefined = useProjectState();
	const deleteProject : (id : number) => void = useProjectDelete();
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
				open={proCopyOpen}
				hasCloseBtn={true}
				handleWindowClose={() => setProCopyOpen(false)}
			>
				<WindowHeader
					mainTitle="Project Copy"
					subTitle="프로젝트를 복사하는 곳입니다."
				/>
			</Window>
			<Window
				type="project-backup-con"
				open={proBackUpOpen}
				hasCloseBtn={true}
				handleWindowClose={() => setProBackUpOpen(false)}
			>
				<WindowHeader
					mainTitle="Project BackUp"
					subTitle="프로젝트를 백업하는 곳입니다."
				/>
			</Window>
		</>;

	const hangUpProject = () => {
		/* api 미구현 */
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
								onClickFun={() => setProCopyOpen(true)}
							/>
							<p>복사</p>
						</Grid>
						<Grid className="invite">
							<Button
								classList={[]}
								value={<GroupAddIcon />}
								onClickFun={() => setInviteOpen(pid)}
							/>
							<p>초대</p>
						</Grid>
						<Grid className="back-up">
							<Button
								classList={[]}
								value={<BackupIcon />}
								onClickFun={() => setProBackUpOpen(true)}
							/>
							<p>백업</p>
						</Grid>
						{
							/*
								todo : model에 저장된 user 정보를 받아와서 구현
							*/
							userAuth === 2 &&
							<Grid className="delete">
								<Button
									classList={[]}
									value={<DeleteIcon />}
									onClickFun={() => {
										if (window.confirm(`[${project[pid].name}] 프로젝트를 정말로 삭제하시겠습니까?`)) {
											deleteProject(pid);
										}
									}}
								/>
								<p>삭제</p>
							</Grid>
						}
						<Grid className="setting">
							<Button
								classList={[]}
								value={<SettingsIcon />}
								onClickFun={() => setProSetOpen(true)}
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
