import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

import { ReactComponent as PinIcon } from '../../images/pin.svg';

type TaskCardMenuProps = {
	handleMoveToWindowOpen: () => void;
	handleMenuClose: () => void;
	handleEmojiPickerOpen: () => void;
}

const TaskCardMenu = ({
	handleMoveToWindowOpen, handleMenuClose, handleEmojiPickerOpen
}: TaskCardMenuProps) => {
	const onCopyButtonClick = () => {
		handleMenuClose();
	};

	const onEditButtonClick = () => {
		handleMenuClose();
	};

	const onDeleteButtonClick = () => {
		handleMenuClose();
	};

	const onPinButtonClick = () => {
		handleMenuClose();
	};

	const onMoveToButtonClick = () => {
		handleMoveToWindowOpen();
		handleMenuClose();
	};

	const onAddReactButtonClick = () => {
		handleEmojiPickerOpen();
		handleMenuClose();
	};

	return (
		<Grid className="taskcardmenu">
			<Paper className="container" elevation={3}>
				<button
					type="button"
					value="copy"
					className="taskcardmenu-button"
					onClick={onCopyButtonClick}
				>
					<FileCopyIcon />
					copy
				</button>
				<button
					type="button"
					value="edit"
					className="taskcardmenu-button"
					onClick={onEditButtonClick}
				>
					<EditIcon />
					edit
				</button>
				<button
					type="button"
					value="delete"
					className="taskcardmenu-button"
					onClick={onDeleteButtonClick}
				>
					<DeleteIcon />
					delete
				</button>
				<button
					type="button"
					value="pin"
					className="taskcardmenu-button"
					onClick={onPinButtonClick}
				>
					<PinIcon />
					pin
				</button>
				<button
					type="button"
					value="moveTo"
					className="taskcardmenu-button"
					onClick={onMoveToButtonClick}
				>
					<ArrowRightAltIcon />
					moveTo
				</button>
				<button
					type="button"
					value="addReact"
					className="taskcardmenu-button"
					onClick={onAddReactButtonClick}
				>
					<SentimentSatisfiedIcon />
					add react
				</button>
			</Paper>
		</Grid>
	);
};

export default TaskCardMenu;
