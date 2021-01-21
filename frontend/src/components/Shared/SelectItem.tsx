import React from 'react';

type ItemProps = {
	option: string,
}

const SelectItem = ({ option }: ItemProps) => (
	<span className="selectitem">{option}</span>
);

export default SelectItem;
