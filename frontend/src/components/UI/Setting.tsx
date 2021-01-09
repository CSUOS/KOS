import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SettingsIcon from '@material-ui/icons/Settings';

/* ====[Window 사용 예시]========
open: window가 열렸는지, 닫혔는지
children: window 안에 들어갈 내용
================================
*/
type SettingProps = {
	open: boolean;
}

const Setting = ({ open }: SettingProps) => (
	<Grid container className="settingbackground">
		<Box className="settingbackground-header" />
		<Backdrop className="settingbackground-backrop" open={open}>
			<Paper className="setting">
				<Grid container>
					<Grid item xs={3} className="settingsidebar">
						<header className="settingsidebar-header">
							<Grid className="settingsidebar-header-title">
								<SettingsIcon fontSize="large" />
								<h2>설정</h2>
							</Grid>
						</header>
					</Grid>
					<Grid item xs={9} className="setting-content">
						<Grid className="setting-header">
							<h1>
								회원정보 설정
							</h1>
						</Grid>
						<Grid className="setting-subheader">
							<div>
								부제목
							</div>
						</Grid>
						<Grid container className="setting-body">
							<Grid item xs={6}>
								<Grid>
									#Rabums 정보
								</Grid>
								<Grid>
									이름
								</Grid>
								<Grid>
									아이디
								</Grid>
								<Grid>
									이메일
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid>
									#KOS 정보
								</Grid>
								<Grid>
									닉네임
								</Grid>
								<Grid>
									아이콘
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Backdrop>
	</Grid>
);

export default Setting;
