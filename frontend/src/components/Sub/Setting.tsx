import React, { useState } from 'react';
import axios from 'axios';
import {
	Backdrop, Paper, Grid, Box, Avatar, Icon
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import CropDinIcon from '@material-ui/icons/CropDin';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji, EmojiData } from 'emoji-mart';

import { Button, EmojiPicker } from '../Shared';

type SettingProps = {
	open: boolean;
}

const Setting = ({
	open
}: SettingProps) => {
	const [openPicker, setOpenPicker] = useState(false);
	const [selectedEmoji, setSelectedEmoji] = useState('santa');
	const [category, setCategory] = useState(0);
	const selectUserInfoSetting = () => {
		setCategory(0);
	};
	const selectSystemSetting = () => {
		setCategory(1);
	};
	const handlePickerOpen = () => {
		setOpenPicker(true);
	};

	const handlePickerClose = () => {
		setOpenPicker(false);
	};

	const selectEmoji = (emoji: EmojiData) => {
		if (emoji.id !== undefined) {
			setSelectedEmoji(emoji.id);
			handlePickerClose();
		}
	};
	return (
		<Grid container className="settingwindowbackground">
			<Box className="settingwindowbackground-header" />
			<Backdrop className="settingwindowbackground-backrop" open={open}>
				<Paper className="settingwindow">
					<Grid container className="settingwindow-container">
						<Grid item xs={3} className="settingwindowsidebar">
							<header className="settingwindowsidebar-header">
								<Grid className="settingwindowsidebar-header-title">
									<SettingsIcon fontSize="large" />
									<h2>설정</h2>
								</Grid>
							</header>
							<Grid className="settingwindowsidebar-content">
								<Grid className="settingwindowsidebar-item" onClick={selectUserInfoSetting}>
									<CropDinIcon fontSize="large" />
									<h3>회원정보 설정</h3>
								</Grid>
								<Grid className="settingwindowsidebar-item" onClick={selectSystemSetting}>
									<CropDinIcon fontSize="large" />
									<h3>시스템 설정</h3>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={9} className="settingwindow-content">
							{
								category === 0 ?
									<>
										<Grid className="settingwindow-header">
											<h1>회원정보 설정</h1>
										</Grid>
										<Grid className="settingwindow-subheader">
											<h4>부제목</h4>
										</Grid>
										<Grid container className="settingwindow-body">
											<Grid item xs={6} className="settingwindow-division">
												<Grid className="settingwindow-item">
													<Grid className="settingwindow-itemname">
														<h3>#Rabums 정보</h3>
														<Grid className="settingwindow-rabumslink">Rabums 바로가기</Grid>
													</Grid>
												</Grid>
												<Grid className="settingwindow-item">
													<Grid className="settingwindow-itemname">
														<FiberManualRecordIcon fontSize="small" className="settingwindow-icon" />
														<h4>이름</h4>
													</Grid>
													<input type="text" className="settingwindow-rabumsinfo" readOnly />
													<Grid className="settingwindow-rabumsdescription"> *Rabums 정보에서 수정 가능합니다.</Grid>
												</Grid>
												<Grid className="settingwindow-item">
													<Grid className="settingwindow-itemname">
														<FiberManualRecordIcon fontSize="small" className="settingwindow-icon" />
														<h4>아이디</h4>
													</Grid>
													<input type="text" className="settingwindow-rabumsinfo" readOnly />
													<Grid className="settingwindow-rabumsdescription"> *Rabums 정보에서 수정 가능합니다.</Grid>
												</Grid>
												<Grid className="settingwindow-item">
													<Grid className="settingwindow-itemname">
														<FiberManualRecordIcon fontSize="small" className="settingwindow-icon" />
														<h4>이메일</h4>
													</Grid>
													<input type="text" className="settingwindow-rabumsinfo" readOnly />
													<Grid className="settingwindow-rabumsdescription"> *Rabums 정보에서 수정 가능합니다.</Grid>
												</Grid>
											</Grid>
											<Grid item xs={6} className="settingwindow-division">
												<Grid>
													<h3>#KOS 정보</h3>
												</Grid>
												<Grid className="settingwindow-item">
													<Grid className="settingwindow-itemname">
														<FiberManualRecordIcon fontSize="small" className="settingwindow-icon" />
														<h4>아이콘</h4>
													</Grid>
													<Grid className="add-button">
														<Avatar variant="rounded">
															<Button
																classList={[]}
																value={<Emoji emoji={selectedEmoji} size={32} />}
																tooltip="select icon"
																ttside="bottom"
																transparent={true}
																onClickFun={
																	openPicker
																		? handlePickerClose
																		: handlePickerOpen
																}
															/>
														</Avatar>
														{openPicker
															&&
																<Grid className="emojipicker">
																	<Picker
																		onSelect={selectEmoji}
																	/>
																</Grid>}
													</Grid>
												</Grid>
												<Grid className="settingwindow-item">
													<Grid className="settingwindow-itemname">
														<FiberManualRecordIcon fontSize="small" className="settingwindow-icon" />
														<h4>Github ID</h4>
													</Grid>
													<input type="text" className="settingwindow-kosinfo" />
												</Grid>
												<Grid className="settingwindow-item">
													<Grid className="settingwindow-itemname">
														<FiberManualRecordIcon fontSize="small" className="settingwindow-icon" />
														<h4>닉네임</h4>
													</Grid>
													<input type="text" className="settingwindow-kosinfo" />
												</Grid>
												<Grid className="settingwindow-item">
													<Grid className="settingwindow-deleteaccount">회원탈퇴</Grid>
												</Grid>
											</Grid>
										</Grid>
									</>
									:
									<Grid>시스템 설정</Grid>
							}
						</Grid>
					</Grid>
				</Paper>
			</Backdrop>
		</Grid>
	);
};

export default Setting;
