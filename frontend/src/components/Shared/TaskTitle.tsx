import clsx from 'clsx';
import React, {
	forwardRef, createRef, useState, useEffect,
} from 'react';

import { Grid } from '@material-ui/core';

import { ReactComponent as PinIcon } from '../../images/pin.svg';
import { Button, EmojiPicker, EmojiList } from '.';
import { handleOutsideClick } from '../../function/FunctionManager';

const emojiPickerRef = createRef<HTMLDivElement>();

type TaskTitleProps = {
	taskTitle: string | undefined;
	handleTitleChange: (arg: any) => void;
	pin: boolean;
	handlePin: () => void;
	emojis?: any | undefined;
	handleEmojis: (emojiId: string) => void;
}
const modifier = '이준영';
const updatedAt = '2021년 02월 04일';

const TaskTitle = forwardRef<HTMLDivElement, TaskTitleProps>(({
	taskTitle, handleTitleChange, pin, handlePin, emojis, handleEmojis,
}, ref) => {
	const updateRecord = `${modifier}님이 ${updatedAt}에 마지막으로 수정하셨습니다`;

	const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

	const handleEmojiPickerOpen = () => {
		setEmojiPickerOpen(true);
	};

	const handleEmojiPickerClose = () => {
		setEmojiPickerOpen(false);
	};

	const onEmojiSelect = (emoji: any) => {
		handleEmojis(emoji.id);
		handleEmojiPickerClose();
	};

	const onEmojiClick = (emojiId: string) => {
		handleEmojis(emojiId);
	};

	useEffect(() => {
		document.addEventListener('mousedown',
			(e: any) => handleOutsideClick(e, emojiPickerRef, handleEmojiPickerClose), true);
		return () => {
			document.removeEventListener('mousedown',
				(e: any) => handleOutsideClick(e, emojiPickerRef, handleEmojiPickerClose), true);
		};
	});

	return (
		<>
			<Grid ref={ref} className="windowheader">
				<Grid className="windowheader-main" container>
					<Grid className="windowheader-tasktitle">
						<input
							size={taskTitle ? taskTitle.length + 2 : 1}
							value={taskTitle}
							onChange={handleTitleChange}
						/>
					</Grid>
					<Grid className="windowheader-task">
						<Button
							classList={['task-pin']}
							value={<PinIcon />}
							tooltip={pin ? '고정 해제하기' : '상단에 고정하기'}
							ttside="right"
							transparent={true}
							onClickFun={handlePin}
						/>
						<Grid className="windowheader-emojilist">
							<EmojiList
								emojis={emojis}
								emojiPickerOpen={emojiPickerOpen}
								onEmojiClick={onEmojiClick}
								handleEmojiPickerOpen={handleEmojiPickerOpen}
								handleEmojiPickerClose={handleEmojiPickerClose}
							/>
						</Grid>
					</Grid>
				</Grid>
				{emojiPickerOpen
				&&
				<Grid
					ref={emojiPickerRef}
					className={clsx('picker', 'taskwindow')}
				>
					<EmojiPicker
						onEmojiSelect={onEmojiSelect}
					/>
				</Grid>}
				<Grid className="task-update">
					{updateRecord}
				</Grid>
			</Grid>
		</>
	);
});

TaskTitle.defaultProps = {
	emojis: undefined,
};

export default TaskTitle;
