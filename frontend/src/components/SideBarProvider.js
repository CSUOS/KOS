import React, { useState } from 'react';
import SideBarController from './Controller/SideBarController';
import SideBarViewModel from './ViewModel/SideBarViewModel';
import SideBarModel from './Model/SideBarModel';

function SideBarProvider() {
	const model = new SideBarModel(); // model 정의
	const [viewModel] = useState(new SideBarViewModel(model)); // model을 사용하는 viewModel 정의

	return (
		<SideBarController
			viewModel = { viewModel } // viewModel을 넘겨서 controller 생성
		/>
	);
}

export default SideBarProvider;
