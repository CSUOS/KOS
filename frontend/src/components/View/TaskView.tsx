import React, { createRef, forwardRef } from 'react';

import { Grid } from '@material-ui/core';

import { Window, WindowHeader } from '../Shared';
import { TaskObj } from '../Model';

type TaskViewProps = {
	open: boolean;
	task: TaskObj | undefined;
	handleTaskWindowClose: () => void;
}

const TaskView = forwardRef<HTMLDivElement, TaskViewProps>(({
	open, task, handleTaskWindowClose
}, ref) => {
	const mainTitle = `TASK #${task?.taskID}`;
	const attributes = task?.attribute;
	const description = '테스크 설명란';

	return (
		<Grid ref={ref} className="task">
			<Window
				open={open}
				hasCloseBtn={true}
				handleWindowClose={handleTaskWindowClose}
			>
				<WindowHeader mainTitle={mainTitle} isTask={true} />
				<Grid className="task-attributes">
					{attributes?.map((attribute) => (
						<div>
							{attribute.key}
							{attribute.value}
						</div>))}
				</Grid>
				<Grid className="task-description">
					{description}
				</Grid>
			</Window>
		</Grid>
	);
});

TaskView.defaultProps = {
	task: undefined,
};

export default TaskView;
