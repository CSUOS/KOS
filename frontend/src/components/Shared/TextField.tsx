import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

type TextFieldProps = {
	value?: string | undefined;
}

const TextField = ({ value }: TextFieldProps) => {
	const [clicked, setClicked] = useState(false);
	const [text, setText] = useState(value);

	const handleInputChange = (e : any) => {
		setText(e.target.value);
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			handleInputChange(e);
			setClicked(false);
		}
	};

	return (
		<Grid className="textfield">
			<button className="textfield-container" type="button" onClick={() => setClicked(!clicked)}>
				<input type="text" readOnly={!clicked} onChange={handleInputChange} value={text} onKeyPress={handleKeyPress} />
			</button>

		</Grid>
	);
};

TextField.defaultProps = {
	value: undefined,
};

export default TextField;
