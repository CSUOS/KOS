import React, { useState, useEffect, createRef } from 'react';
import Grid from '@material-ui/core/Grid';
import {
	Edit, Add, FileCopy, Delete, ArrowRightAlt, MoreHoriz
} from '@material-ui/icons';
import {
	Button, Menu, TaskCard as Task
} from '../Shared';
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

	const menuContents = [
		{
			icon: <Edit />,
			name: 'edit',
			onClickFunc: () => {
				handleMenuClose();
			},
		},
		{
			icon: <Add />,
			name: 'add',
			onClickFunc: () => {
				handleMenuClose();
			},
		},
		{
			icon: <FileCopy />,
			name: 'copy',
			onClickFunc: () => {
				handleMenuClose();
			},
		},
		{
			icon: <Delete />,
			name: 'delete',
			onClickFunc: () => {
				handleMenuClose();
			},
		},
		{
			icon: <ArrowRightAlt />,
			name: 'moveTo',
			onClickFunc: () => {
				handleMenuClose();
			}
		},
	];
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
							value={<MoreHoriz />}
							tooltip={!menuOpen ? '리스트 메뉴보기' : undefined}
							onClickFun={menuOpen ? handleMenuClose : handleMenuOpen}
						/>
						{menuOpen &&
							<Grid ref={menuRef}>
								<Menu
									contents={menuContents}
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
