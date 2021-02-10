import React from 'react';
import { getRandomInt } from './FunctionManager';

export const COLORS = ['yellow', 'mint', 'green', 'pink', 'purple', 'blue'];

export const SUBJECTS = ['속성 이름 지정', '기본', '생성'];
export const DEFAULT_MENUS = ['작성자', '최근 수정자', '멤버', '생성일자', '최근 수정일자', '데드라인', '진행상태'];
export const CREATE_MENUS = ['텍스트', '날짜', '단일 선택', '다중 선택', 'URL', '단일 체크박스'];

export const DEFAULT_PAIRS = [
	{ type: 'creator', name: 'Creator', value: '김철수(kim)' },
	{ type: 'modifier', name: 'Modifier', value: '김철수(kim)' },
	{
		type: 'member',
		name: 'Assign',
		value: [
			{ name: '김철수(kim)', selected: true },
			{ name: '김정현(powergee)', selected: false },
			{ name: '우희은(hinge7)', selected: false }]
	},
	{ type: 'createdAt', name: 'CreatedAt', value: new Date() },
	{ type: 'updatedAt', name: 'UpdatedAt', value: new Date() },
	{ type: 'deadline', name: 'Deadline', value: new Date() },
	{
		type: 'state',
		name: 'State',
		value: [
			{ name: '시작전', selected: true, color: COLORS[0] },
			{ name: '진행중', selected: false, color: COLORS[1] },
			{ name: '완료', selected: false, color: COLORS[3] }]
	},
];
export const CREATE_PAIRS = [
	{ type: 'text-field', name: '텍스트', value: '' },
	{ type: 'date-picker', name: '날짜', value: new Date() },
	{ type: 'single-select', name: '단일 선택', value: [] },
	{ type: 'multi-select', name: '다중 선택', value: [] },
	{ type: 'url', name: 'URL', value: '' },
	{ type: 'checkbox', name: '체크박스', value: false },
];
