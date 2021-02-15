import React, { useState, Dispatch, useEffect } from 'react';
import clsx from 'clsx';

import { Grid, Input, Menu } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
	Window, WindowHeader, Button
} from '.';
import {
	useProjectState, useUserState, UserObj, ProjectMap, useProjectDelete, useProjectCopy, useProjectUpdate, useExitProject
} from '../Model';
import { useInviteDispatch } from '../Sub/InviteWindow';
import { checkIsStringEmpty } from '../../function/FunctionManager';
import { color as colorArr } from '../../function/BGColor';

type SubMenuProps = {
	pid : number;
};

const SubMenu = ({ pid } : SubMenuProps) => {
	const [proSetOpen, setProSetOpen] = useState<boolean>(false); // 프로젝트 설정창 오픈
	const [proBackUpOpen, setProBackUpOpen] = useState<boolean>(false); // 프로젝트 백업창 오픈
	const setInviteOpen : Dispatch<number> = useInviteDispatch();

	const user : UserObj | undefined = useUserState();
	const project : ProjectMap | undefined = useProjectState();
	const deleteProject : (id : number) => void = useProjectDelete();
	const setProject : (id : number, p : ProjectMap) => void = useProjectUpdate();
	const copyProject : Dispatch<number> = useProjectCopy();
	const exitProject : (projectID : number, uid: number) => void = useExitProject();

	// 세팅 윈도우 이름 선택 시
	const [name, setName] = useState('');
	// 세팅 색 선택 메뉴
	const [color, setColor] = useState('');
	const [anchorEl, setAnchorEl] = useState<EventTarget & Element | null>(null);
	const handleClick = (event : React.SyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (project !== undefined) {
			setName(project[pid].Name);
			setColor(project[pid].BGColor);
		}
	}, [pid]);

	const changeProject = () => {
		// 프로젝트 update 전처리
		if (project === undefined) {
			return;
		}
		if (checkIsStringEmpty(name)) {
			alert('프로젝트 이름을 입력해주세요.');
			return;
		}
		if (checkIsStringEmpty(color)) {
			alert('프로젝트 색을 선택해주세요.');
			return;
		}
		const tmp = project;
		tmp[pid].Name = name;
		tmp[pid].BGColor = color;
		setProject(pid, tmp);
		setProSetOpen(false);
	};

	const windows =
		<>
			<Window
				type="project-setting-con submenu-window-con"
				open={proSetOpen}
				hasCloseBtn={true}
				handleWindowClose={() => setProSetOpen(false)}
			>
				<WindowHeader
					mainTitle="Project Setting"
					subTitle="프로젝트의 이름이나 색을 바꿔보세요."
				/>
				<Grid container className="p-contents-con">
					<Grid container>
						<Grid className="p-key-con">Project Name</Grid>
						<Input className="p-value-con" placeholder="프로젝트 이름" value={name} onChange={(e) => setName(e.target.value)} />
					</Grid>
					<Grid container>
						<Grid className="p-key-con">Project Color</Grid>
						<Grid className={clsx('select-color-btn', 'bg-color', color)} onClick={handleClick} />
						<Menu
							anchorEl={anchorEl}
							getContentAnchorEl={null}
							keepMounted
							anchorOrigin={{
								vertical: 'bottom', // 이렇게 조정하려면 getContentAnchorEl을 setting해주어야함
								horizontal: 'left',
							}}
							open={anchorEl !== null}
							onClose={handleClose}
							className="color-picker"
						>
							{
								colorArr.map((c) => <Grid key={c} className={clsx('color-pick', 'bg-color', c)} onClick={() => { setColor(c); handleClose(); }} />)
							}
						</Menu>
					</Grid>
					<Grid className="p-btn-con">
						<Button
							classList={['save-btn']}
							value="저장"
							onClickFun={changeProject}
						/>
					</Grid>
				</Grid>
			</Window>
			<Window
				type="project-backup-con submenu-window-con"
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
		if (user === undefined) {
			return;
		}
		exitProject(pid, user.ID);
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
								onClickFun={() => copyProject(pid)}
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
							project[pid].Auth &&
							<Grid className="delete">
								<Button
									classList={[]}
									value={<DeleteIcon />}
									onClickFun={() => {
										if (window.confirm(`[${project[pid].Name}] 프로젝트를 정말로 삭제하시겠습니까?`)) {
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
									if (window.confirm(`[${project[pid].Name}] 프로젝트에서 정말로 나가시겠습니까?`)) {
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
