class SideBarModel {
	constructor() {
		this.open = true;
	}

	setOpen = (boolean) => {
		this.open = boolean;
		console.log(this.open);
	};
}

export default SideBarModel;
