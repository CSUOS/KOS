import React, { createRef, forwardRef, useState } from 'react';

import { Grid } from '@material-ui/core';

import { Button } from '../Shared';
import { ProjectHead, List } from '../Sub';
import { ProjectObj } from '../Model';
import { TaskView } from '.';

const taskRef = createRef<HTMLDivElement>();

type PageViewProps = {
	open: boolean;
	handleSideBarOpen: () => void;
	project: ProjectObj;
}

const PageView = forwardRef<HTMLDivElement, PageViewProps>(({
	open, handleSideBarOpen, project
}, ref) => {
	/* ==============테스크 윈도우 열기 위한 임의의 값들============== */
	const buttonName = '테스크 설정하기';
	const task = project && project.List[0].tasks[0];
	const [openTask, setOpenTask] = useState(false);

	const handleTaskWindowOpen = () => {
		setOpenTask(true);
	};

	const handleTaskWindowClose = () => {
		setOpenTask(false);
	};

	return (
		<Grid ref={ref} className="page">
			{!openTask && project &&
				<>
					<ProjectHead
						sideBarOpen={open}
						handleSideBarOpen={handleSideBarOpen}
						project={project}
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
