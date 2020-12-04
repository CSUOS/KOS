import SideBarView from '../View/SideBarView';

function SideBarController(props) {
	const {
		viewModel
	} = props;

	function handleSideBarClose() {
		viewModel.handleDrawerClose();
	}

	return (
		viewModel ?
			<SideBarView
				handleSideBarClose = { handleSideBarClose }
			/> : ''
	);
}

export default SideBarController;
