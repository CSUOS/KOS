import React from 'react';

import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import {
	Button
} from '.';

type AttributeButtonProps = {
	index: number;
	type: string;
	name: string;
	menuOpen: boolean;
	handleMenuOpen: () => void;
	handleMenuClose: () => void;
	handlePairDelete?: (indexToDelete: number) => void;
}

const AttributeButton = ({
	index, type, name, menuOpen, handleMenuOpen, handleMenuClose, handlePairDelete
}: AttributeButtonProps) => {
	const getAttributeButtonContent = () => {
		switch (type) {
		case 'add-button':
			return (
				<Button
					classList={['add-button']}
					value="+"
					tooltip="속성 추가하기"
					transparent={true}
					onClickFun={menuOpen ? handleMenuClose : handleMenuOpen}
				/>
			);
		case 'description':
			return '설명';
		default:
			return (
				<>
					<div className="attribute">
						{name}
					</div>
					<Button
						classList={['delete-button']}
						value={<CloseSharpIcon />}
						tooltip="속성 삭제하기"
						transparent={true}
						onClickFun={handlePairDelete && (() => handlePairDelete(index))}
					/>
				</>
			);
		}
	};

	return (
		<div className="attributebutton">
			{getAttributeButtonContent()}
		</div>
	);
};

AttributeButton.defaultProps = {
	handlePairDelete: undefined,
};

export default AttributeButton;
