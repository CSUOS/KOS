import React from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { Emoji } from 'emoji-mart';

import { Button } from '.';

type EmojiItemObject = {
	id: string;
	users: Array<string>;
}
type EmojiItemProps = {
	emoji: EmojiItemObject;
	onClickEmoji: () => void;
}

export const getClickedEmojiIndex = (emojis: Array<EmojiItemObject>, emojiId: string) => {
	const clickedIndex = emojis.findIndex((emoji) => emoji.id === emojiId);
	return clickedIndex;
};

const EmojiItem = ({ emoji, onClickEmoji }: EmojiItemProps) => {
	const tooltip = emoji.users.reduce((acc, cur) => acc.concat(', ', cur)).concat(' reacted');
	const clicked = emoji.users.includes('사용자');
	return (
		<Grid className={clsx('emojiitem', clicked && 'clicked')}>
			<Button
				classList={[]}
				value={
					<>
						<Emoji emoji={emoji.id} set="google" size={18} />
						<span>{emoji.users.length}</span>
					</>
				}
				tooltip={tooltip}
				ttside="bottom"
				transparent={true}
				onClickFun={onClickEmoji}
			/>
		</Grid>
	);
};

type EmojiListProps = {
	emojis: Array<EmojiItemObject> | undefined;
	openEmojiPicker: boolean;
	onEmojiClick: (emojiId:string) => void;
	handleEmojiPickerOpen: () => void;
	handleEmojiPickerClose: () => void;
}

const EmojiList = ({
	emojis, openEmojiPicker, onEmojiClick, handleEmojiPickerOpen, handleEmojiPickerClose
}: EmojiListProps) => (
	<Grid className="emojilist">
		<Grid className="emojilist-container">
			{emojis?.map((emoji) => (
				<EmojiItem
					emoji={emoji}
					onClickEmoji={() => onEmojiClick(emoji.id)}
				/>))}
			<Grid className="add-button">
				<Button
					classList={[]}
					value={<AddIcon />}
					tooltip="add reaction"
					ttside="bottom"
					transparent={true}
					onClickFun={
						openEmojiPicker
							? handleEmojiPickerClose
							: handleEmojiPickerOpen
					}
				/>
			</Grid>
		</Grid>
	</Grid>
);

export default EmojiList;
