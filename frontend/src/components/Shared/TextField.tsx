import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

import { Button } from '.';

type TextFieldProps = {
	value?: string | undefined;
	handleValueChange: (arg: any) => void;
	isURL?: boolean | undefined;
}

const formatURL = (value: string | undefined) => {
	if (value !== undefined && !value.includes('http://')) {
		return 'http://'.concat(value);
	}
	return value;
};

const TextField = ({ value, handleValueChange, isURL }: TextFieldProps) => (
	<Grid className="textfield">
		<input
			type="text"
			placeholder={isURL ? '링크를 입력하세요' : '텍스트를 입력하세요'}
			onChange={(e: any) => handleValueChange(e.target.value)}
			value={value}
		/>
		{
			isURL && value &&
			<a href={formatURL(value)} target="_sub">
				<Button
					classList={['']}
					value={<LinkIcon />}
					transparent={true}
				/>
			</a>
		}
	</Grid>
);

TextField.defaultProps = {
	value: undefined,
	isURL: false,
};

export default TextField;
