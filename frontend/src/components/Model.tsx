import React, {
	useState, createContext, useContext, Dispatch
} from 'react';

/* open context */
// create context to use open
type childrenObj = {
	children: React.ReactNode;
}

export const OpenStateContext = createContext<boolean>(true);
export const OpenDispatchContext = createContext<Dispatch<boolean>>(() => {});

export const OpenContextProvider = ({ children } : childrenObj) => {
	const [open, setOpen] = useState<boolean>(true);

	return (
		<OpenStateContext.Provider value={open}>
			<OpenDispatchContext.Provider value={setOpen}>
				{children}
			</OpenDispatchContext.Provider>
		</OpenStateContext.Provider>
	);
};

export function useOpenState() {
	const context = useContext(OpenStateContext);
	return context;
}

export function useOpenDispatch() {
	const context = useContext(OpenDispatchContext);
	return context;
}

/* project context */
export type UserObj = {
	userID: number;
	userName: string;
	userIcon: string;
}

type Attribute = {
	key: string;
	value: string;
}

type TaskObj = {
	taskID: number;
	listID: number;
	index: number;
	createAt: Date;
	modifiedAt: Date;
	attribute: Array<Attribute>
}

type ListObj = {
	listID: number;
	projectID: number;
	index: number;
	createAt: Date;
	modifiedAt: Date;
	name: string;
	tasks: Array<TaskObj>;
}

export type ProjectObj = {
	projectID: number;
	createAt: Date;
	modifiedAt: Date;
	isPrivate: boolean;
	bookMark: boolean;
	bgColor: string;
	name: string;
	users : Array<UserObj>;
	List: Array<ListObj>;
}

export const ProjectDataContext = createContext<Array<ProjectObj> | undefined>(undefined);
export const ProjectDispatchContext = createContext<Dispatch<Array<ProjectObj>>>(() => {});

export const ProjectContextProvider = ({ children } : childrenObj) => {
	const [project, setProject] = useState<Array<ProjectObj>>([{
		projectID: 1,
		createAt: new Date('2021/01/02'),
		modifiedAt: new Date('2021/01/02'),
		isPrivate: false,
		bookMark: true,
		bgColor: 'pink',
		name: 'KOS',
		users: [{
			userID: 1,
			userName: 'heeeun',
			userIcon: 'child'
		}, {
			userID: 2,
			userName: 'taejin',
			userIcon: 'beach'
		}],
		List: [{
			listID: 1,
			projectID: 1,
			index: 0,
			createAt: new Date('2021/01/02'),
			modifiedAt: new Date('2021/01/02'),
			name: 'ToDo',
			tasks: [{
				taskID: 1,
				listID: 1,
				index: 0,
				createAt: new Date('2021/01/02'),
				modifiedAt: new Date('2021/01/02'),
				attribute: [{
					key: 'text-field',
					value: 'hi'
				}]
			}]
		}]
	}, {
		projectID: 2,
		createAt: new Date('2021/01/02'),
		modifiedAt: new Date('2021/01/02'),
		isPrivate: true,
		bookMark: false,
		bgColor: 'green',
		name: 'NERAsadddfadasfdafdsasdfasdfasdfasdf',
		users: [],
		List: [{
			listID: 2,
			projectID: 2,
			index: 0,
			createAt: new Date('2021/01/02'),
			modifiedAt: new Date('2021/01/02'),
			name: 'ToDo',
			tasks: [{
				taskID: 2,
				listID: 2,
				index: 0,
				createAt: new Date('2021/01/02'),
				modifiedAt: new Date('2021/01/02'),
				attribute: [{
					key: 'text-field',
					value: 'hi'
				}]
			}]
		}]
	}, {
		projectID: 3,
		createAt: new Date('2021/01/07'),
		modifiedAt: new Date('2021/01/07'),
		isPrivate: true,
		bookMark: true,
		bgColor: 'mint',
		name: '프로젝트이름이 길면 어떻게 될까요?',
		users: [],
		List: [{
			listID: 3,
			projectID: 3,
			index: 0,
			createAt: new Date('2021/01/07'),
			modifiedAt: new Date('2021/01/07'),
			name: 'ToDo',
			tasks: [{
				taskID: 3,
				listID: 3,
				index: 0,
				createAt: new Date('2021/01/07'),
				modifiedAt: new Date('2021/01/07'),
				attribute: [{
					key: 'text-field',
					value: 'hi'
				}]
			}]
		}]
	}, {
		projectID: 4,
		createAt: new Date('2021/01/07'),
		modifiedAt: new Date('2021/01/07'),
		isPrivate: false,
		bookMark: true,
		bgColor: 'purple',
		name: '여러 프로젝트 생성',
		users: [],
		List: [{
			listID: 4,
			projectID: 4,
			index: 0,
			createAt: new Date('2021/01/07'),
			modifiedAt: new Date('2021/01/07'),
			name: 'ToDo',
			tasks: [{
				taskID: 4,
				listID: 4,
				index: 0,
				createAt: new Date('2021/01/07'),
				modifiedAt: new Date('2021/01/07'),
				attribute: [{
					key: 'text-field',
					value: 'hi'
				}]
			}]
		}]
	}]);

	return (
		<ProjectDataContext.Provider value={project}>
			<ProjectDispatchContext.Provider value={setProject}>
				{children}
			</ProjectDispatchContext.Provider>
		</ProjectDataContext.Provider>
	);
};

export function useProjectState() {
	const context = useContext(ProjectDataContext);
	return context;
}

export function useProjectDispatch() {
	const context = useContext(ProjectDispatchContext);
	return context;
}

/* projectID context */

export const PIDContext = createContext<number>(0);
export const PIDDispatchContext = createContext<Dispatch<number>>(() => {});

export const PIDContextProvider = ({ children } : childrenObj) => {
	const [pid, setPID] = useState<number>(0);

	return (
		<PIDContext.Provider value={pid}>
			<PIDDispatchContext.Provider value={setPID}>
				{children}
			</PIDDispatchContext.Provider>
		</PIDContext.Provider>
	);
};

export function usePIDState() {
	const context = useContext(PIDContext);
	return context;
}

export function usePIDDispatch() {
	const context = useContext(PIDDispatchContext);
	return context;
}

/* user context */

export const userContext = createContext<number>(1);
const userDispatchContext = createContext<Dispatch<number>>(() => {});

export const UserContextProvider = ({ children } : childrenObj) => {
	const [id, setUserID] = useState<number>(1);

	return (
		<userContext.Provider value={id}>
			<userDispatchContext.Provider value={setUserID}>
				{children}
			</userDispatchContext.Provider>
		</userContext.Provider>
	);
};

export function useUserState() {
	const context = useContext(userContext);
	return context;
}

function useUserDispatch() {
	const context = useContext(userDispatchContext);
	return context;
}
