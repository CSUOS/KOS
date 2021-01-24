import React from 'react';
import { Grid } from '@material-ui/core';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import { Button } from '.';

type TagProps = {
	value: string;
	hasCloseBtn?: boolean | undefined;
	handleTagDelete?: (tagValue:string) => void | undefined;
}

const Tag = ({ value, hasCloseBtn, handleTagDelete }: TagProps) => (
	<Grid className="tag">
		{value}
		{hasCloseBtn &&
			<Button
				classList={['']}
				value={<CloseSharpIcon />}
				transparent={true}
				onClickFun={handleTagDelete && (() => handleTagDelete(value))}
			/>}

	</Grid>
);

Tag.defaultProps = {
	hasCloseBtn: true,
	handleTagDelete: undefined,
};

export default Tag;
