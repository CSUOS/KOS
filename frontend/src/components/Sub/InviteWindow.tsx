import React, {
	Dispatch, createContext, useState, useContext, useEffect
} from 'react';

import { Window, WindowHeader } from '../Shared';

const inviteOpenContext = createContext<number>(-1);
const inviteDispatchContext = createContext<Dispatch<number>>(() => {});

type childrenObj = {
	children: React.ReactNode;
}

export const InviteWindow = ({ children } : childrenObj) => {
	// window를 따로 컴포넌트로 만든 이유
	// subMenu에서만 쓰이는 것이 아니라 projectHead 컴포넌트에서도 써야하는데
	// 최상위로 올릴만 한 window는 아님

	// 초대할 프로젝트의 id도 받아야하기 때문에, pid가 0보다 크면 window가 열리도록 설정
	const [pid, setPID] = useState(-1);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (pid < 0) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	}, [pid]);
	return (
		<>
			<inviteOpenContext.Provider value={pid}>
				<inviteDispatchContext.Provider value={setPID}>
					{children}
				</inviteDispatchContext.Provider>
			</inviteOpenContext.Provider>
			<Window
				type="project-backup-con"
				open={open}
				hasCloseBtn={true}
				handleWindowClose={() => setOpen(false)}
			>
				<WindowHeader
					mainTitle="Invite Member"
					subTitle="프로젝트에 멤버를 초대해보세요."
				/>

			</Window>
		</>
	);
};
export function useInviteState() {
	const context = useContext(inviteOpenContext);
	return context;
}

export function useInviteDispatch() {
	const context = useContext(inviteDispatchContext);
	return context;
}

export default InviteWindow;
