import React, { createRef, forwardRef, useState } from 'react';
import clsx from 'clsx';

import { Grid, Input } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { Button, Window, WindowHeader } from '../Shared';
import { SideProject } from '../Sub';
import { useProjectState, ProjectMap, useProjectAdd } from '../Model';
import { checkIsStringEmpty } from '../../function/FunctionManager';

const buttonRef = createRef<HTMLDivElement>();

type SideBarViewProps = {
	type : string;
	handleSideBarClose : () => void;
}

// View는 Controller의 data 및 function을 사용하여 사용자와 상호작용
const SideBarView = forwardRef<HTMLDivElement, SideBarViewProps>(({
	type, handleSideBarClose
}, ref) => {
	const project : ProjectMap | undefined = useProjectState();
	const addProject : (name: string, pri: boolean) => void = useProjectAdd();
	const [modalOpen, setModalOpen] = useState(false);
	const [pri, setPrivate] = useState(true);
	const [name, setName] = useState('');

	const makeProject = () => {
		if (checkIsStringEmpty(name)) {
			// name이 없으면 생성 x
			alert('프로젝트 이름을 입력해주세요.');
			return;
		}
		addProject(name, pri);
		setModalOpen(false);
	};

	return (
		<Grid ref={ref} className={clsx('sidebar', type)}>
			<Window
				type="project-modal-con"
				open={modalOpen}
				hasCloseBtn={true}
				maxWidth="md"
				handleWindowClose={() => setModalOpen(false)}
			>
				<WindowHeader
					mainTitle="Start Project"
					subTitle="Enter the name of the project and select whether it is public or private."
				/>
				<Grid container className="p-contents-con">
					<Grid container>
						<Grid className="p-key-con">Project Name</Grid>
						<Input className="p-value-con" placeholder="프로젝트 이름" value={name} onChange={(e) => setName(e.target.value)} />
					</Grid>
					<Grid container justify="space-between">
						<Grid container className="pm-btn-con">
							<Button
								classList={['pm-private-btn', pri ? '' : 'selected']}
								value={<LockOpenIcon />}
								tooltip="public"
								onClickFun={() => { setPrivate(false); }}
							/>
							<Button
								classList={['pm-private-btn', pri ? 'selected' : '']}
								value={<LockIcon />}
								tooltip="private"
								onClickFun={() => { setPrivate(true); }}
							/>
						</Grid>
						<Button
							classList={['save-btn']}
							value="프로젝트 생성"
							onClickFun={makeProject}
						/>
					</Grid>
				</Grid>
			</Window>
			<header className="sidebar-header">
				<Grid className="sidebar-header-title">
					<img src="/logo192.png" alt="logo" />
					<h1>KOS</h1>
				</Grid>
				<Button
					classList={['sidebar-btn']}
					value={<ArrowBackIosIcon onClick={handleSideBarClose} />}
					tooltip="Close Sidebar"
					ttside="right"
					transparent={true}
					ref={buttonRef}
				/>
			</header>
			<Grid className="project-con">
				{
					project && Object.keys(project).map((id) => <SideProject project={project} key={id} pid={Number(id)} />)
				}
			</Grid>
			<Grid className="generate-project">
				<Button
					classList={[]}
					value="+ 새로운 프로젝트 만들기"
					transparent={true}
					onClickFun={() => setModalOpen(true)}
				/>
			</Grid>
		</Grid>
	);
});

export default SideBarView;
