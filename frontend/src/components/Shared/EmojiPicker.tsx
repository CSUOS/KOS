import React from 'react';

import { Grid } from '@material-ui/core';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

type EmojiPickerProps = {
	onEmojiSelect: (arg:any) => void;
}
const EmojiPicker = ({ onEmojiSelect }: EmojiPickerProps) => (
	<Grid className="emojipicker">
		<Picker set="google" onSelect={onEmojiSelect} />
	</Grid>
);

export default EmojiPicker;
