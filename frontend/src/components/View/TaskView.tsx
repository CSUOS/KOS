import React from 'react';
import Window from '../UI/Window';
import PageHeader from '../UI/PageHeader';

type TaskViewProps = {
	open: boolean;
	handleTaskWindowOpen: any;
}

function TaskView({ open, handleTaskWindowOpen }: TaskViewProps) {
	const temp = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.';
	const mainTitle = 'Task 제목 1';
	const subTitle = '선택사항입니다.';
	const hasCloseButton = true;
	return (
		<>
			<Window
				open={open}
				value={
					<>
						<PageHeader
							mainTitle={mainTitle}
							subTitle={subTitle}
							hasCloseButton={hasCloseButton}
							option={false}
						/>
					</>
				}
			/>
		</>
	);
}

export default TaskView;
