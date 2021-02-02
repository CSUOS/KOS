import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import {
	Button
} from '.';

type AttributeButtonProps = {
	index: number;
	type: string;
	name?: string | undefined;
	menuOpen: boolean;
	handleMenuOpen: () => void;
	handleMenuClose: () => void;
	handlePairDelete?: (indexToDelete: number) => void;
}

const AttributeButton = ({
	index, type, name, menuOpen, handleMenuOpen, handleMenuClose, handlePairDelete
}: AttributeButtonProps) => {
	const [show, setShow] = useState(false);

	const handleDeleteButtonShow = (visible: boolean) => {
		setShow(visible);
	};

	return (
		<Grid className="attributebutton">
			<div className="attribute">
				{type === 'add-button' && (
					<Button
						classList={['add']}
						value="+"
						transparent={true}
						onClickFun={menuOpen ? handleMenuClose : handleMenuOpen}
					/>
				)}
				{type === 'description' && '설명'}
				{(type !== 'description' && type !== 'add-button') &&
					(
						<div
							onMouseEnter={() => handleDeleteButtonShow(true)}
							onMouseLeave={() => handleDeleteButtonShow(false)}
						>
							{name}
							{show &&
								(
									<Button
										classList={['delete']}
										value={<CloseSharpIcon />}
										tooltip="속성 삭제하기"
										transparent={true}
										onClickFun={handlePairDelete && (() => handlePairDelete(index))}
									/>
								)}
						</div>
					)}
			</div>
		</Grid>
	);
};

AttributeButton.defaultProps = {
	name: undefined,
	handlePairDelete: undefined,
};

export default AttributeButton;
