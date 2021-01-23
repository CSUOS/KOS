import React, { createRef, forwardRef, useState } from 'react';

import { Grid } from '@material-ui/core';

import { Button } from '../Shared';
import { ProjectHead, List } from '../Sub';
import {
	useProjectState, usePIDState, useTaskState, ProjectObj, ProjectTaskObj
} from '../Model';
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
	const project : ProjectObj | undefined = useProjectState();
	const pid : number = usePIDState();
	const tasks : ProjectTaskObj | undefined = useTaskState();

	/* ==============테스크 윈도우 열기 위한 임의의 값들============== */
	const buttonName = '테스크 설정하기';
	const task = tasks && tasks[1][0];
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
					<ProjectHead
						sideBarOpen={open}
						handleSideBarOpen={handleSideBarOpen}
					/>
					<Button
						classList={['']}
						value={buttonName}
						onClickFun={handleTaskWindowOpen}
					/>
				</>}
			<List mainTitle="제목" /* for test only */ />
			<TaskView
				open={openTask}
				handleTaskWindowClose={handleTaskWindowClose}
				task={task}
				ref={taskRef}
			/>
		</Grid>
	);
});

export default PageView;
