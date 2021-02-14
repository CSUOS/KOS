import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import AddIcon from '@material-ui/icons/Add';

import { ReactComponent as PinIcon } from '../../images/pin.svg';

type ListMenuProps = {
	handleMenuClose: () => void;
}

const ListMenu = ({ handleMenuClose }: ListMenuProps) => {
	const onEditButtonClick = () => {
		handleMenuClose();
	};

	const onCopyButtonClick = () => {
		handleMenuClose();
	};

	const onAddButtonClick = () => {
		handleMenuClose();
	};

	const onDeleteButtonClick = () => {
		handleMenuClose();
	};

	const onMoveToButtonClick = () => {
		handleMenuClose();
	};
	return (
		<Grid className="listmenu">
			<Paper className="container" elevation={3}>
				<button
					type="button"
					value="edit"
					className="listmenu-button"
					onClick={onEditButtonClick}
				>
					<EditIcon />
					edit
				</button>
				<button
					type="button"
					value="add"
					className="listmenu-button"
					onClick={onAddButtonClick}
				>
					<AddIcon />
					add
				</button>
				<button
					type="button"
					value="copy"
					className="listmenu-button"
					onClick={onCopyButtonClick}
				>
					<FileCopyIcon />
					copy
				</button>
				<button
					type="button"
					value="delete"
					className="listmenu-button"
					onClick={onDeleteButtonClick}
				>
					<DeleteIcon />
					delete
				</button>
				<button
					type="button"
					value="moveTo"
					className="listmenu-button"
					onClick={onMoveToButtonClick}
				>
					<ArrowRightAltIcon />
					moveTo
				</button>
			</Paper>
		</Grid>
	);
};

export default ListMenu;
