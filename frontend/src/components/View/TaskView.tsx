import React, { forwardRef } from 'react';

import { Grid } from '@material-ui/core';

import { Window, WindowHeader, AttributeValuePair as Pair } from '../Shared';
import { TaskObj } from '../Model';

type TaskViewProps = {
	open: boolean;
	task: TaskObj | undefined;
	handleTaskWindowClose: () => void;
}

const descType = 'description';
const descAttri = '설명';
/* ==========[ 임시 값들 ]========== */
const descValue = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.
Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus.`;
const attributeNames1 = ['Text', 'Assign'];
const attributeNames2 = ['Created', 'Modified', '단일 선택', '다중 선택', '단일 체크박스', '다중 체크박스', '+'];
const types = ['text-field', 'date-picker', 'single-select', 'multi-select', 'checkbox', 'checkboxes', 'add-button'];
const checkboxesValue = { '첫번째': true, '두번째': true };
const selectValue = ['시작전', '진행중', '완료', '보류'];

const TaskView = forwardRef<HTMLDivElement, TaskViewProps>(({
	open, task, handleTaskWindowClose
}, ref) => {
	const mainTitle = `TASK #${task?.taskID}`;
	const attributes = task?.attribute;
	const created = task?.createAt;
	const modified = task?.modifiedAt;

	return (
		<Grid ref={ref} className="task">
			<Window
				open={open}
				hasCloseBtn={true}
				handleWindowClose={handleTaskWindowClose}
			>
				<WindowHeader mainTitle={mainTitle} isTask={true} />
				<Grid className="task-attributes">
					{/* {attributes?.map((attribute, index) => (
						<Pair
							attribute={attributeNames1[index]}
							type={attribute.key}
							value={attribute.value}
						/>))} */}
					<Pair type={types[3]} />
					<Pair type={types[2]} />
					<Pair type={types[0]} />
					<Pair type={types[1]} />
					<Pair type={types[4]} />
				</Grid>
				<Grid className="task-description">
					<Pair type={descType} attribute={descAttri} />
					{descValue}
				</Grid>
			</Window>
		</Grid>
	);
});

TaskView.defaultProps = {
	task: undefined,
};

export default TaskView;
