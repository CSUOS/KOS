import React, { forwardRef, ReactFragment } from 'react';

import { Grid, Paper } from '@material-ui/core';

type PartProps = {
	subject: string,
	children: ReactFragment,
};

const Part = ({ subject, children }: PartProps) => (
	<Grid className="part">
		<Grid className="subject">{subject}</Grid>
		<Grid className="children">{children}</Grid>
	</Grid>
);

const subjects = ['속성 이름 지정', '기본', '생성'];
const defaultMenus = ['작성자', '최근 편집자', '멤버', '생성일자', '최근 수정일자', '데드라인', '진행 상태'];
const createMenus = ['텍스트', '날짜', '단일 선택', '다중 선택', 'URL', '단일 체크박스'];
const defaultPairs = [
	{ type: 'creator', name: 'Creator', value: '김철수(kim)' },
	{ type: 'editor', name: 'Editor', value: '김철수(kim)' },
	{ type: 'member', name: 'Assign', value: { options: ['김철수(kim)', '우희은(hinge7)', '김정현(powergee)'], selectedOptions: ['김철수(kim)'] } },
	{ type: 'createdAt', name: 'CreateAt', value: new Date() },
	{ type: 'editedAt', name: 'EditedAt', value: new Date() },
	{ type: 'deadline', name: 'Deadline', value: new Date('2021-01-30') },
	{ type: 'state', name: 'State', value: { options: ['시작전', '진행중', '완료'], selectedOptions: ['시작전'] } },
];
const createPairs = [
	{ type: 'text-field', name: '텍스트', value: '' },
	{ type: 'date-picker', name: '날짜', value: new Date() },
	{ type: 'single-select', name: '단일 선택', value: { options: [], selectedOptions: [] } },
	{ type: 'multi-select', name: '다중 선택', value: { options: [], selectedOptions: [] } },
	{ type: 'url', name: 'URL', value: '' },
	{ type: 'checkbox', name: '체크박스', value: false },
];

type AttributeSelectProps = {
	text: string,
	handleInputChange: (e: any) => void,
	handleMenuClose: () => void,
	handlePairAdd?: (pairToAdd: any) => void | undefined;
};

const AttributeSelect = forwardRef<HTMLDivElement, AttributeSelectProps>(({
	text, handleInputChange, handleMenuClose, handlePairAdd
}, ref) => {
	const onOptionClick = (isDefault: boolean, pairToAdd: any) => {
		const newPair = isDefault ? pairToAdd : { ...pairToAdd, name: text };
		if (handlePairAdd) handlePairAdd(newPair);
		handleMenuClose();
	};

	return (
		<Grid ref={ref} className="attriselect">
			<Paper className="container" elevation={5}>
				<div>
					<Part subject={subjects[0]}>
						<input
							type="text"
							className="attri-input"
							onChange={handleInputChange}
							value={text}
						/>
					</Part>
					<Part subject={subjects[1]}>
						{defaultMenus.map((menu, index) => (
							<button
								type="button"
								onClick={(e:any) => onOptionClick(true, defaultPairs[e.target.value])}
								value={index}
							>
								{menu}
							</button>
						))}
					</Part>
					<Part subject={subjects[2]}>
						{createMenus.map((menu, index) => (
							<button
								type="button"
								onClick={(e:any) => onOptionClick(false, createPairs[e.target.value])}
								value={index}
							>
								{menu}
							</button>
						))}
					</Part>
				</div>
			</Paper>
		</Grid>
	);
});

export default AttributeSelect;