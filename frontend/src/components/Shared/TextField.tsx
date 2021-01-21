import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

type TextFieldProps = {
	value?: string | undefined;
	handleValueChange: (arg:any) => void;
}

const TextField = ({ value, handleValueChange }: TextFieldProps) => (
	<Grid className="textfield">
		<input
			type="text"
			onChange={(e:any) => handleValueChange(e.target.value)}
			value={value}
		/>
	</Grid>
);

TextField.defaultProps = {
	value: undefined,
};

export default TextField;
