import React, { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SettingsIcon from '@material-ui/icons/Settings';
import CropDinIcon from '@material-ui/icons/CropDin';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Icon from '@material-ui/core/Icon';

import { Button } from '../Shared';

type SettingProps = {
	open: boolean;
}

const Setting = ({ open }: SettingProps) => {
	const [category, setCategory] = useState(0);
	const test1 = () => {
		setCategory(0);
	};
	const test2 = () => {
		setCategory(1);
	};
	return (
		<Grid container className="settingwindowbackground">
			<Box className="settingwindowbackground-header" />
			<Backdrop className="settingwindowbackground-backrop" open={open}>
				<Paper className="settingwindow">
					<Grid container>
						<Grid item xs={3} className="settingwindowsidebar">
							<header className="settingwindowsidebar-header">
								<Grid className="settingwindowsidebar-header-title">
									<SettingsIcon fontSize="large" />
									<h2>설정</h2>
								</Grid>
							</header>
							<Grid className="settingwindowsidebar-content">
								<Grid className="settingwindowsidebar-item" onClick={test1}>
									<CropDinIcon fontSize="large" />
									<h3>회원정보 설정</h3>
								</Grid>
								<Grid className="settingwindowsidebar-item" onClick={test2}>
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
													<Grid className="settingwindow-itemname">
														<FiberManualRecordIcon fontSize="small" className="settingwindow-icon" />
														<h4>아이콘</h4>
													</Grid>
													<Grid className="settingwindow-kosicon">
														<Icon fontSize="large" className="icon">add_circle</Icon>
													</Grid>
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
