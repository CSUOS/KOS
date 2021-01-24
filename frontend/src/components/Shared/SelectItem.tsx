import React, { useState } from 'react';

import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import { Button } from '.';

type ItemProps = {
	value: string;
	hasCloseBtn?: boolean | undefined;
	handleSelectedDelete?: (selectedValue: string) => void | undefined;
}

const SelectItem = ({ value, hasCloseBtn, handleSelectedDelete }: ItemProps) => {
	const [show, setShow] = useState(false);

	const handleDeleteButtonShow = (visible: boolean) => {
		setShow(visible);
	};
	return (
		<span
			className="selectitem"
			onMouseEnter={() => handleDeleteButtonShow(true)}
			onMouseLeave={() => handleDeleteButtonShow(false)}
		>
			{value}
			{hasCloseBtn && show &&
				<button
					type="button"
					onClick={handleSelectedDelete && (() => handleSelectedDelete(value))}
				>
					<CloseSharpIcon />
				</button>}
		</span>
	);
};

SelectItem.defaultProps = {
	hasCloseBtn: false,
	handleSelectedDelete: undefined,
};

export default SelectItem;
