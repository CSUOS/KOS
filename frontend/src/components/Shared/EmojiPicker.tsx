import React from 'react';

import { Grid } from '@material-ui/core';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const pickerTitle = 'Pick your emoji';
const emoji = 'wink';

type EmojiPickerProps = {
	onEmojiSelect: (arg:any) => void;
}
const EmojiPicker = ({ onEmojiSelect }: EmojiPickerProps) => (
	<Grid className="emojipicker">
		<Picker
			set="google"
			emoji={emoji}
			title={pickerTitle}
			onSelect={onEmojiSelect}
		/>
	</Grid>
);

export default EmojiPicker;
