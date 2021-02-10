import React, { forwardRef, useState } from 'react';

import {
	Grid, FormControl, Select, MenuItem
} from '@material-ui/core';

import { Button, Window, WindowHeader } from '.';

type MoveToWindowProps = {
	open: boolean;
	handleMoveToWindowClose: () => void;
}

// =================[ 임시 값 ]============================
const taskCard = 'API 문서 작성';
const projects = ['NERA', 'KOS', '청사과'];
const lists = ['곰세마리', '한집에', '있어'];
// =======================================================

const mainTitle = 'MoveTo';
const subTitle = '테스크 카드를 이동할 프로젝트를 고르세요';

const MoveToWindow = forwardRef<HTMLDivElement, MoveToWindowProps>(({
	open, handleMoveToWindowClose
}, ref) => {
	// =================[ 임시 값 ]============================
	const [project, setProject] = useState(projects[0]);
	const [list, setList] = useState(lists[0]);
	// ========================================================

	const onProjectChange = (e: any) => {
		setProject(e.target.value);
	};

	const onListChange = (e: any) => {
		setList(e.target.value);
	};

	const handleTaskMoveTo = () => {
		handleMoveToWindowClose();
	};

	return (
		<Grid ref={ref}>
			<Window
				type="moveto"
				open={open}
				maxWidth="md"
				hasCloseBtn={true}
				handleWindowClose={handleMoveToWindowClose}
			>
				<WindowHeader
					mainTitle={mainTitle}
					subTitle={subTitle}
				/>
				<Grid className="moveto-container">
					<Grid className="dropdown-container">
						<Grid className="dropdown-label">프로젝트</Grid>
						<FormControl className="dropdown">
							<Select
								value={project}
								onChange={onProjectChange}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
							>
								{projects.map((item: string) => <MenuItem value={item}>{item}</MenuItem>)}
							</Select>
						</FormControl>
					</Grid>
					<Grid className="dropdown-container">
						<Grid className="dropdown-label">리스트</Grid>
						<FormControl className="dropdown">
							<Select
								value={list}
								onChange={onListChange}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
							>
								{lists.map((item: string) => <MenuItem value={item}>{item}</MenuItem>)}
							</Select>
						</FormControl>
					</Grid>
					<div className="moveto-helper">
						<span className="moveto-helper-bold">{taskCard}</span>
						테스크 카드를
						<span className="moveto-helper-bold">
							{project}
							{' > '}
							{list}
						</span>
						로 이동합니다
					</div>
					<Grid className="moveto-btn-container">
						<Button
							classList={['moveto-btn']}
							value="테스크 이동"
							onClickFun={handleTaskMoveTo}
						/>
					</Grid>
				</Grid>
			</Window>
		</Grid>
	);
});

export default MoveToWindow;
