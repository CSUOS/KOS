import clsx from 'clsx';
import React, { useState } from 'react';

import CloseSharpIcon from '@material-ui/icons/CloseSharp';

type ItemProps = {
	value: string;
	color: string;
	hasCloseBtn?: boolean | undefined;
	handleSelectedDelete?: (selectedValue: string) => void | undefined;
}

const SelectItem = ({
	value, color, hasCloseBtn, handleSelectedDelete
}: ItemProps) => {
	const [show, setShow] = useState(false);

	const handleDeleteButtonShow = (visible: boolean) => {
		setShow(visible);
	};
	return (
		<span
			className={clsx('selectitem', color)}
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
