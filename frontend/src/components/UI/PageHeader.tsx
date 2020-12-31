import React, { ReactElement } from 'react';
import { Grid } from '@material-ui/core';

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
	option: ReactElement;
}

const PageHeader = ({
	mainTitle, subTitle, option
}: PageHeaderProps) => (
	<Grid className="pageheader">
		<Grid className="pageheader-main" container>
			<h1>{mainTitle}</h1>
		</Grid>
		<Grid className="pageheader-sub" container>
			<p>{subTitle}</p>
			<Grid className="pageheader-option">{option}</Grid>
		</Grid>
	</Grid>
);

PageHeader.defaultProps = {
	subTitle: undefined,
};

export default PageHeader;
