import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import Button from './Button';

type PageHeaderProps = {
	mainTitle: string;
	subTitle?: string | undefined;
	hasCloseButton: boolean;
	option: any;
}

function PageHeader(
	{
		mainTitle, subTitle, hasCloseButton, option
	}: PageHeaderProps
) {
	return (
		<Grid className="pageheader">
			<Grid className="pageheader-main" container>
				<h1>{mainTitle}</h1>
				{hasCloseButton ? <Button
					classList={['']}
					value={<CloseIcon />}
				/> : undefined}
			</Grid>
			<Grid className="pageheader-sub" container>
				<p>{subTitle}</p>
				<Box className="pageheader-option">{option}</Box>
			</Grid>
		</Grid>
	);
}

PageHeader.defaultProps = {
	subTitle: undefined,
};

export default PageHeader;
