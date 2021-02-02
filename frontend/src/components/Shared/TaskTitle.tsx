import React, {
	forwardRef, createRef, useState, useEffect
} from 'react';

import { Grid } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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

const TaskTitle = forwardRef<HTMLDivElement, TaskTitleProps>(({
	taskTitle, handleTitleChange, pin, handlePin, emojis, handleEmojis,
}, ref) => {
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
					<h1>{taskTitle}</h1>
					{/* <input type="text" /> */}
					<Grid className="windowheader-task">
						<Button
							classList={['task-pin']}
							value={pin ? <StarIcon /> : <StarBorderIcon />}
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
			</Grid>
			{emojiPickerOpen
				&&
				<Grid
					ref={emojiPickerRef}
					className="picker"
				>
					<EmojiPicker
						onEmojiSelect={onEmojiSelect}
					/>
				</Grid>}
		</>
	);
});

TaskTitle.defaultProps = {
	emojis: undefined,
};

export default TaskTitle;
