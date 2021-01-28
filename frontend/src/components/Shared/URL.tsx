import React, { createRef } from 'react';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

import { Button } from '.';
import { checkIsStringEmpty } from '../../function/FunctionManager';

const inputRef = createRef<HTMLInputElement>();

const formatURL = (url: string | undefined) => {
	if (url && !url.includes('https://')) return 'https://'.concat(url);
	return url;
};

type URLProps = {
	value?: string | undefined;
	handleValueChange: (e: any) => void;
};

const urlPlaceholder = '링크를 입력하세요';
const URL = ({ value, handleValueChange }: URLProps) => {
	const inputSize = value ? value.length + 1 : 0;

	return (
		<Grid className="url">
			<span className={clsx('container', !checkIsStringEmpty(value) && 'chip')}>
				<input
					ref={inputRef}
					type="text"
					placeholder={urlPlaceholder}
					onChange={(e: any) => handleValueChange(e.target.value)}
					value={value}
					size={inputSize}
				/>
				{
					value &&
					<a href={formatURL(value)} target="_sub">
						<Button
							classList={['link-btn']}
							value={<LinkIcon />}
							transparent={true}
						/>
					</a>
				}
			</span>
		</Grid>
	);
};

URL.defaultProps = {
	value: undefined,
};

export default URL;
