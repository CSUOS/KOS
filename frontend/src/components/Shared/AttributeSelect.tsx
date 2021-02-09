import React, { createRef, forwardRef, ReactFragment } from 'react';

import { Grid, Paper } from '@material-ui/core';

import { checkIsStringEmpty, handleScrollToTop } from '../../function/FunctionManager';
import {
	SUBJECTS, DEFAULT_MENUS, CREATE_MENUS, DEFAULT_PAIRS, CREATE_PAIRS
} from '../../function/PairManager';

const nameInputRef = createRef<HTMLInputElement>();
const containerRef = createRef<HTMLDivElement>();

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

// ======================================================================
// =============== [ TODO : 리소스 스크립트 분리하기 ]  ===================
const subjects = ['속성 이름 지정', '기본', '생성'];
const defaultMenus = ['작성자', '최근 편집자', '멤버', '생성일자', '최근 수정일자', '데드라인', '진행 상태'];
const createMenus = ['텍스트', '날짜', '단일 선택', '다중 선택', 'URL', '단일 체크박스'];
const defaultPairs = [
	{ type: 'creator', name: 'Creator', value: '김철수(kim)' },
	{ type: 'editor', name: 'Editor', value: '김철수(kim)' },
	{ type: 'member', name: 'Assign', value: { options: ['김철수(kim)', '우희은(hinge7)', '김정현(powergee)'], selectedOptions: ['김철수(kim)'] } },
	{ type: 'createdAt', name: 'CreatedAt', value: new Date() },
	{ type: 'updatedAt', name: 'UpdatedAt', value: new Date() },
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
// ======================================================================
// ======================================================================

const namePlaceholder = '속성 이름';
type AttributeSelectProps = {
	text: string | undefined,
	handleNameInputChange: (e: any) => void,
	handleMenuClose: () => void,
	handlePairAdd?: (pairToAdd: any) => void;
};

const AttributeSelect = forwardRef<HTMLDivElement, AttributeSelectProps>(({
	text, handleNameInputChange, handleMenuClose, handlePairAdd
}, ref) => {
	// TODO : 함수 개선하기
	const onDefaultOptionClick = (e:any) => {
		const pairToAdd = DEFAULT_PAIRS[e.target.value];
		if (handlePairAdd) handlePairAdd(pairToAdd);
		handleMenuClose();
	};

	const onCreateOptionClick = (e:any) => {
		const isNameEmpty = checkIsStringEmpty(text);
		if (isNameEmpty) {
			handleScrollToTop(containerRef);
			nameInputRef.current?.focus();
		} else {
			const pairToAdd = CREATE_PAIRS[e.target.value];
			const newPair = { ...pairToAdd, name: text };
			if (handlePairAdd) handlePairAdd(newPair);
			handleMenuClose();
		}
	};

	return (
		<Grid ref={ref} className="attriselect">
			<Paper className="container" elevation={5}>
				<div ref={containerRef}>
					<Part subject={SUBJECTS[0]}>
						<input
							ref={nameInputRef}
							type="text"
							className="attri-input"
							placeholder={namePlaceholder}
							onChange={handleNameInputChange}
							value={text}
						/>
					</Part>
					<Part subject={SUBJECTS[1]}>
						{DEFAULT_MENUS.map((menu, index) => (
							<button
								type="button"
								onClick={onDefaultOptionClick}
								value={index}
							>
								{menu}
							</button>
						))}
					</Part>
					<Part subject={SUBJECTS[2]}>
						{CREATE_MENUS.map((menu, index) => (
							<button
								type="button"
								onClick={onCreateOptionClick}
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
