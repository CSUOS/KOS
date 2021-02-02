import React from 'react';

import { Grid } from '@material-ui/core';

type TextFieldProps = {
	value?: string | undefined;
	handleValueChange: (arg: any) => void;
}

const textFieldPlaceholder = '텍스트를 입력하세요';
const TextField = ({ value, handleValueChange }: TextFieldProps) => (
	<Grid className="textfield">
		<input
			type="text"
			placeholder={textFieldPlaceholder}
			onChange={(e: any) => handleValueChange(e.target.value)}
			value={value}
		/>
	</Grid>
);

TextField.defaultProps = {
	value: undefined,
};

export default TextField;
