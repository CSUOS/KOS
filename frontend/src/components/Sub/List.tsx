import React from 'react';
import Grid from '@material-ui/core/Grid';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Button, TaskCard as Task } from '../Shared';
/* ====[List 사용 예시]========
mainTitle: 리스트 이름
================================
*/

type ListProps = {
	mainTitle: string;
}

// 임시 값
const taskTitle = 'API 문서 작성';
const pin = true;
const deadline = '2021-02-05';
const members = ['우희은', '김정현'];
const reactions = ['a', 'b'];

const List = ({ mainTitle }: ListProps) => (
	<Grid className="list">
		<Grid className="list-container" container>
			<Grid className="list-header" container>
				<h1 className="list-title">{mainTitle}</h1>
				<Button
					classList={['']}
					value={<MoreHorizIcon />}
					tooltip="리스트 메뉴보기"
				/>
			</Grid>
			<Grid className="list-main" container>
				<Task
					taskTitle={taskTitle}
					pin={pin}
					deadline={deadline}
					members={members}
					reactions={reactions}
				/>
				<Task
					taskTitle={taskTitle}
					pin={pin}
					deadline={deadline}
					members={members}
					reactions={reactions}
				/>
				<Task
					taskTitle={taskTitle}
					pin={pin}
					deadline={deadline}
					members={members}
					reactions={reactions}
				/>
				{/* <p>Elem1</p>
				<p>Elem2</p>
				<p>Elem3</p> */}
			</Grid>
		</Grid>
	</Grid>
);

export default List;
