import React, { ReactFragment, forwardRef, useState } from 'react';

import { Grid } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { Picker, Emoji } from 'emoji-mart';

import { Button, EmojiPicker, EmojiList } from '.';

type TaskTitleProps = {
	taskTitle: string | undefined;
	handleTitleChange: (arg: any) => void;
	emojis?: any | undefined;
	handleEmojis: (emojiId: string) => void;
}

const TaskTitle = forwardRef<HTMLDivElement, TaskTitleProps>(({
	taskTitle, handleTitleChange, emojis, handleEmojis,
}, ref) => {
	const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

	const handleEmojiPickerOpen = () => {
		setOpenEmojiPicker(true);
	};

	const handleEmojiPickerClose = () => {
		setOpenEmojiPicker(false);
	};

	const onEmojiSelect = (emoji: any) => {
		handleEmojis(emoji.id);
		handleEmojiPickerClose();
	};

	const onEmojiClick = (emojiId: string) => {
		handleEmojis(emojiId);
	};

	return (
		<>
			<Grid ref={ref} className="windowheader">
				<Grid className="windowheader-main" container>
					<h1>{taskTitle}</h1>
					{/* <input type="text" /> */}
					<Grid className="windowheader-task">
						<Button
							classList={['task-pin']}
							value={<StarBorderIcon />}
							// tooltip="상단에 고정시키기"
							// ttside="right"
							transparent={true}
						/>
						<EmojiList
							emojis={emojis}
							openEmojiPicker={openEmojiPicker}
							onEmojiClick={onEmojiClick}
							handleEmojiPickerOpen={handleEmojiPickerOpen}
							handleEmojiPickerClose={handleEmojiPickerClose}
						/>
					</Grid>
				</Grid>
			</Grid>
			{openEmojiPicker
				&&
				<Grid className="picker">
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
