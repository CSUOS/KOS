import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

type TextFieldProps = {
	value?: string | undefined;
	handleValueChange: (arg:any) => void;
}

const placeholder = '텍스트를 입력하세요';
const TextField = ({ value, handleValueChange }: TextFieldProps) => (
	<Grid className="textfield">
		<input
			type="text"
			placeholder={placeholder}
			onChange={(e:any) => handleValueChange(e.target.value)}
			value={value}
		/>
	</Grid>
);

TextField.defaultProps = {
	value: undefined,
};

export default TextField;
