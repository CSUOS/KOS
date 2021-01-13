import React, { createRef, forwardRef, useState } from 'react';

import { Grid } from '@material-ui/core';

import { Button } from '../Shared';
import { ProjectHead } from '../Sub';
import { ProjectObj } from '../Model';
import { TaskView } from '.';

const taskRef = createRef<HTMLDivElement>();

type PageViewProps = {
	open: boolean;
	handleSideBarOpen: () => void;
	project: Array<ProjectObj> | undefined;
}

const PageView = forwardRef<HTMLDivElement, PageViewProps>(({
	open, handleSideBarOpen, project
}, ref) => {
	/* ==============테스크 윈도우 열기 위한 임의의 값들============== */
	const buttonName = '테스크 설정하기';
	const task = project && project[0].List[0].tasks[0];
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
						open={open}
						handleSideBarOpen={handleSideBarOpen}
					/>
					<Button
						classList={['']}
						value={buttonName}
						onClickFun={handleTaskWindowOpen}
					/>
				</>}
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
