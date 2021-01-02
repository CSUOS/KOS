import React, {
	useState, createContext, useContext, Dispatch
} from 'react';
// Model은 Context 저장 및 제공
/* open context */
// create context to use open
export const OpenStateContext = createContext<boolean>(true);
export const OpenDispatchContext = createContext<Dispatch<boolean> | undefined>(undefined);

export const OpenContextProvider = ({ children } : any) => {
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
export type ProjectObj = {
	'projectID': number;
	'createAt': Date;
	'modifiedAt': Date;
	'isPrivate': boolean;
	'bookMark': boolean;
	'bgColor': string;
	'name': string;
	'List': Array<ListObj>;
}

type ListObj = {
	'listID': number;
	'projectID': number;
	'index': number;
	'createAt': Date;
	'modifiedAt': Date;
	'name': string;
	'tasks': Array<TaskObj>;
}

type TaskObj = {
	'taskID': number;
	'listID': number;
	'index': number;
	'createAt': Date;
	'modifiedAt': Date;
	'attribute': Array<Attribute>
}

type Attribute = {
	'key': string;
	'value': string;
}

export const ProjectDataContext = createContext<Array<ProjectObj> | undefined>(undefined);
export const ProjectDispatchContext = createContext<Dispatch<Array<ProjectObj>> | undefined>(undefined);

export const ProjectContextProvider = ({ children } : any) => {
	const [project, setProject] = useState<Array<ProjectObj>>([{
		'projectID': 1,
		'createAt': new Date('2021/01/02'),
		'modifiedAt': new Date('2021/01/02'),
		'isPrivate': false,
		'bookMark': true,
		'bgColor': 'pink',
		'name': 'KOS',
		'List': [{
			'listID': 1,
			'projectID': 1,
			'index': 0,
			'createAt': new Date('2021/01/02'),
			'modifiedAt': new Date('2021/01/02'),
			'name': 'ToDo',
			'tasks': [{
				'taskID': 1,
				'listID': 1,
				'index': 0,
				'createAt': new Date('2021/01/02'),
				'modifiedAt': new Date('2021/01/02'),
				'attribute': [{
					'key': 'text-field',
					'value': 'hi'
				}]
			}]
		}]
	}, {
		'projectID': 2,
		'createAt': new Date('2021/01/02'),
		'modifiedAt': new Date('2021/01/02'),
		'isPrivate': true,
		'bookMark': false,
		'bgColor': 'green',
		'name': 'NERA',
		'List': [{
			'listID': 2,
			'projectID': 2,
			'index': 0,
			'createAt': new Date('2021/01/02'),
			'modifiedAt': new Date('2021/01/02'),
			'name': 'ToDo',
			'tasks': [{
				'taskID': 2,
				'listID': 2,
				'index': 0,
				'createAt': new Date('2021/01/02'),
				'modifiedAt': new Date('2021/01/02'),
				'attribute': [{
					'key': 'text-field',
					'value': 'hi'
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
