import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import Button from './Button';
/* ====[PageHeader 사용 예시]========
mainTitle: 페이지 이름
subTitle: 페이지에 대한 설명. 선택사항.
hasCloseButton: window가 close button을 가졌는지 여부
option: subTitle과 같은 줄에 들어갈 기타 element. 선택사항.
================================
*/
type PageHeaderProps = {
	mainTitle: string;
	subTitle?: string | undefined;
	hasCloseButton: boolean;
	option: any;
}

const PageHeader = ({
	mainTitle, subTitle, hasCloseButton, option
}: PageHeaderProps) => (
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

PageHeader.defaultProps = {
	subTitle: undefined,
};

export default PageHeader;
