class SideBarViewModel {
	constructor(model) {
		this.model = model;
	}

	handleDrawerOpen = () => {
		this.model.setOpen(true);
	};

	handleDrawerClose = () => {
		this.model.setOpen(false);
	};
}

export default SideBarViewModel;
