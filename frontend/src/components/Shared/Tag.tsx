import React from 'react';
import { Grid } from '@material-ui/core';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import { Button } from '.';

type TagProps = {
	value: string;
	hasCloseBtn?: boolean | undefined;
}

const Tag = ({ value, hasCloseBtn }: TagProps) => (
	<Grid className="tag">
		{value}
		{hasCloseBtn &&
			<Button
				classList={['']}
				value={<CloseSharpIcon />}
				transparent={true}
			/>}

	</Grid>
);

Tag.defaultProps = {
	hasCloseBtn: true,
};

export default Tag;
