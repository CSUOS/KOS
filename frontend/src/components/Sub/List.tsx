import React, { useState, useEffect, createRef } from 'react';
import Grid from '@material-ui/core/Grid';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Button, ListMenu, TaskCard as Task } from '../Shared';
import { handleOutsideClick } from '../../function/FunctionManager';
/* ====[List 사용 예시]========
mainTitle: 리스트 이름
================================
*/
// 임시 값
const testValue = [
	{
		id: 0,
		taskTitle: 'API 문서 작성 1',
		pin: true,
		deadline: '2021-02-05',
		members: ['우희은', '김정현'],
		reactions: ['a', 'b'],
	},
	{
		id: 1,
		taskTitle: 'API 문서 작성 2',
		pin: true,
		deadline: '2021-02-05',
		members: ['우희은', '김정현'],
		reactions: ['a', 'b'],
	},
	{
		id: 2,
		taskTitle: 'API 문서 작성 3',
		pin: true,
		deadline: '2021-02-05',
		members: ['우희은', '김정현'],
		reactions: ['a', 'b'],
	},
];

type ListProps = {
	mainTitle: string;
}

const menuRef = createRef<HTMLDivElement>();

const List = ({ mainTitle }: ListProps) => {
	const [tasks, setTasks] = useState(testValue);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuOpen = () => {
		setMenuOpen(true);
	};

	const handleMenuClose = () => {
		setMenuOpen(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown',
			(e: any) => handleOutsideClick(e, menuRef, handleMenuClose), true);
		return () => {
			document.removeEventListener('mousedown',
				(e: any) => handleOutsideClick(e, menuRef, handleMenuClose), true);
		};
	});
	return (
		<Grid className="list">
			<Grid className="list-container" container>
				<Grid className="list-header" container>
					<h1 className="list-title">{mainTitle}</h1>
					<Grid className="list-menu">
						<Button
							classList={['more']}
							value={<MoreHorizIcon />}
							tooltip="리스트 메뉴보기"
							onClickFun={menuOpen ? handleMenuClose : handleMenuOpen}
						/>
						{menuOpen &&
							<Grid ref={menuRef}>
								<ListMenu
									handleMenuClose={handleMenuClose}
								/>
							</Grid>}
					</Grid>
				</Grid>
				<Grid className="list-main" container>
					{
						tasks.map((task: any) => ( // any 타입 수정 필요
							<Task
								taskTitle={task.taskTitle}
								pin={task.pin}
								deadline={task.deadline}
								members={task.members}
								reactions={task.reactions}
							/>
						))
					}
					{/* <p>Elem1</p>
					<p>Elem2</p>
					<p>Elem3</p> */}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default List;
