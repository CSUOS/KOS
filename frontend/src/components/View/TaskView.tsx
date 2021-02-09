import React, {
	forwardRef, useState, useEffect, ChangeEvent
} from 'react';

import { Grid } from '@material-ui/core';

import {
	DragDropContext, Droppable, Draggable, DropResult
} from 'react-beautiful-dnd';

import {
	Window, TaskTitle, AttributeValuePair as Pair
} from '../Shared';
import { TaskObj } from '../Model';
import { getClickedEmojiIndex } from '../Shared/EmojiList';
import { DEFAULT_PAIRS } from '../../function/PairManager';

type TaskViewProps = {
	open: boolean;
	task: TaskObj | undefined;
	handleTaskWindowClose: () => void;
}

const windowType = 'task';
const descType = 'description';
const descAttri = '설명';
const addButtonType = 'add-button';

/* ==========[ 임시 값들 ]========== */
const userName = '사용자';
const descValue = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.
Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus.`;
const emojisTempData = [
	{ id: 'woman-gesturing-ok', users: [userName] },
	{ id: 'heart_eyes', users: ['김철수'] }];

const TaskView = forwardRef<HTMLDivElement, TaskViewProps>(({
	open, task, handleTaskWindowClose
}, ref) => {
	// parsed data
	// const taskTitle
	const attributes = task?.attribute;
	const created = task?.createdAt;
	const updated = task?.updatedAt;

	// =================[ 임시 값 ]============================
	const currentDate = new Date().toString();
	const parsedDate = currentDate.split(' ');
	const tempTaskTitle = parsedDate.slice(0, 5).join('-');
	// ======================================================

	const [taskTitle, setTaskTitle] = useState(tempTaskTitle);
	const [pin, setPin] = useState(false);
	const [emojis, setEmojis] = useState(emojisTempData);
	const [pairs, setPairs] = useState(DEFAULT_PAIRS as Array<any>);

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.target.value);
	};

	const handlePin = () => {
		setPin(!pin);
	};

	const handleEmojis = (emojiId: string) => {
		const index = getClickedEmojiIndex(emojis, emojiId);
		if (index !== -1) {
			const emojisData = emojis.slice();
			const clickedEmojiData = emojisData[index];
			if (clickedEmojiData.users.includes(userName)) {
				if (clickedEmojiData.users.length === 1) {
					const editedEmojisData =
						emojisData.filter((emojiData: any) => emojiData !== clickedEmojiData);
					setEmojis(editedEmojisData);
				} else {
					const editedUsersData =
						clickedEmojiData.users.filter((user: string) => user !== userName);
					const editedEmojiData = { ...clickedEmojiData, users: editedUsersData };
					emojisData[index] = editedEmojiData;
					setEmojis(emojisData);
				}
			} else {
				clickedEmojiData.users.push(userName);
				setEmojis(emojisData);
			}
		} else {
			setEmojis([...emojis, { id: emojiId, users: [userName] }]);
		}
	};

	const handlePairAdd = (pairToAdd: any) => {
		setPairs([...pairs, pairToAdd]);
	};

	const handlePairDelete = (indexToDelete: number) => {
		const editedPairs = pairs.filter((_: any, index: number) => index !== indexToDelete);
		setPairs(editedPairs);
	};

	const handlePairEdit = (indexToEdit: number, editedPair: any) => {
		const pairsData = pairs.slice();
		pairsData[indexToEdit] = editedPair;
		setPairs(editedPair);
	};

	useEffect(() => {
		console.log(pairs);
	}, [pairs]);

	// TODO: list에도 쓰게 스크립트 분리하기
	// TODO: pair의 name이 unique해야함
	const reorderPairs = (list: Array<any>, sourceIndex: number, destinationIndex: number) => {
		// copy original to "reorderedArray"
		const reorderedArray = Array.from(list);
		// delete reordered element at source index
		// return type of splice is array, so using destructing assignment
		const [reorderedElement] = reorderedArray.splice(sourceIndex, 1);
		// add moved element at destination index
		reorderedArray.splice(destinationIndex, 0, reorderedElement);

		// return reoredered pairs
		return reorderedArray;
	};

	const onDragEnd = (result: DropResult) => {
		if (result.destination) {
			const reorderedPairs = reorderPairs(pairs, result.source.index, result.destination.index);

			setPairs(reorderedPairs);
		}
	};

	return (
		<Grid ref={ref} className="taskview">
			<Window
				type={windowType}
				open={open}
				hasCloseBtn={true}
				maxWidth="lg"
				handleWindowClose={handleTaskWindowClose}
			>
				<TaskTitle
					taskTitle={taskTitle}
					handleTitleChange={handleTitleChange}
					pin={pin}
					handlePin={handlePin}
					emojis={emojis}
					handleEmojis={handleEmojis}
				/>
				<Grid className="task-attributes">
					<DragDropContext
						onDragEnd={onDragEnd}
					>
						<Droppable droppableId="0">
							{(provided) => (
								<Grid
									innerRef={provided.innerRef}
									{...provided.droppableProps}
								>
									{pairs.map((pair: any, index: number) => (
										<Draggable key={pair.name} draggableId={pair.name} index={index}>
											{(itemProvided) => (
												<Grid
													ref={itemProvided.innerRef}
													{...itemProvided.draggableProps}
													{...itemProvided.dragHandleProps}
												>
													<Pair
														index={index}
														type={pair.type}
														name={pair.name}
														value={pair.value}
														handlePairDelete={handlePairDelete}
													/>
												</Grid>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</Grid>
							)}
						</Droppable>
					</DragDropContext>
					{/* {pairs.map((pair: any, index: number) => (
						<Pair
							index={index}
							type={pair.type}
							name={pair.name}
							value={pair.value}
							handlePairDelete={handlePairDelete}
						/>
					))} */}
					<Pair
						index={pairs.length + 1}
						type={addButtonType}
						handlePairAdd={handlePairAdd}
					/>
				</Grid>
				<Grid className="task-description">
					<Pair index={-1} type={descType} name={descAttri} />
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
