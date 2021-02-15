import React, { createRef, forwardRef, useState } from 'react';

import { Grid } from '@material-ui/core';

import { Button } from '../Shared';
import { ProjectHead, List } from '../Sub';
import {
	useProjectState, usePIDState, useTaskState, ProjectMap, ProjectTaskObj
} from '../Model';
import { InviteWindow } from '../Sub/InviteWindow';
import { TaskView } from '.';

const taskRef = createRef<HTMLDivElement>();

type PageViewProps = {
	open: boolean;
	handleSideBarOpen: () => void;
}

const PageView = forwardRef<HTMLDivElement, PageViewProps>(({
	open, handleSideBarOpen
}, ref) => {
	/* ============== 프로젝트 관련 데이터 ============== */
	const project : ProjectMap | undefined = useProjectState();
	const pid : number = usePIDState();
	const tasks : ProjectTaskObj | undefined = useTaskState();

	/* ==============테스크 윈도우 열기 위한 임의의 값들============== */
	const buttonName = '테스크 설정하기';
	let task;
	if (tasks !== undefined && Object.keys(tasks).length !== 0) {
		task = tasks[Number(Object.keys(tasks)[0])][0];
	}
	// 지금은 가장 처음 task를 받아오게 설정되어있음
	const [openTask, setOpenTask] = useState(false);

	const handleTaskWindowOpen = () => {
		setOpenTask(true);
	};

	const handleTaskWindowClose = () => {
		setOpenTask(false);
	};

	return (
		<Grid ref={ref} className="page">
			{!openTask &&
				<>
					<InviteWindow>
						<ProjectHead
							sideBarOpen={open}
							handleSideBarOpen={handleSideBarOpen}
						/>
					</InviteWindow>
					<Button
						classList={['']}
						value={buttonName}
						onClickFun={handleTaskWindowOpen}
					/>
				</>}
			<List mainTitle="제목" /* for test only */ />
			{
				true &&		// 테스트를 위해서 task => true로 바꿔놓았음
				<TaskView				/* for test only */
					open={openTask}
					handleTaskWindowClose={handleTaskWindowClose}
					task={task}
					ref={taskRef}
				/>
			}
		</Grid>
	);
});

export default PageView;
