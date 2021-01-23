import React, {
	useState, createContext, useContext, Dispatch
} from 'react';
import axios from 'axios';

/* test user put */
/*
export const putUser = async () => {
	const headers = {
		'Content-Type': 'application/json;charset=utf-8',
		'Access-Control-Allow-Origin': '*'
	};

	axios
		.get('http://localhost:8080/v1/user-api/users', { headers })
		.then(({ data }) => {
			console.log(data);
		})
		.catch((e) => {
			console.error(e);
		});
};
*/

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
	userID : number;
	userName: string;
	userIcon: string;
	gitID: string;
}

type Attribute = {
	key: string;
	value: string | Array<string>;
}

export type TaskObj = {
	taskID: number;
	attribute: Array<Attribute>;
	createAt: Date;
	modifiedAt: Date;
}

type ListObj = {
	listID: number;
	// index는 배열 순서대로 다시 집어넣기
	name: string;
}

export type ProjectObj = {
	[projectID : number] : {
		isPrivate: boolean;
		bookMark: boolean;
		bgColor: string;
		name: string;
	}
}

export type ProjectTeamObj = {
	[projectID : number] : Array<UserObj>;
}

type ProjectListObj = {
	[projectID : number] : Array<ListObj>;
}

export type ProjectTaskObj = {
	[listID : number] : Array<TaskObj>;
}

const ProjectDataContext = createContext<ProjectObj | undefined>(undefined);
const ProjectDispatchContext = createContext<Dispatch<ProjectObj>>(() => {});
const TeamContext = createContext<ProjectTeamObj | undefined>(undefined);
const TeamDispatchContext = createContext<Dispatch<ProjectTeamObj>>(() => {});
const ListContext = createContext<ProjectListObj | undefined>(undefined);
const ListDispatchContext = createContext<Dispatch<ProjectListObj>>(() => {});
const TaskContext = createContext<ProjectTaskObj | undefined>(undefined);
const TaskDispatchContext = createContext<Dispatch<ProjectTaskObj>>(() => {});

export const ProjectContextProvider = ({ children } : childrenObj) => {
	const [project, setProject] = useState<ProjectObj>({
		1: {
			isPrivate: false,
			bookMark: true,
			bgColor: 'pink',
			name: 'KOS'
		},
		2: {
			isPrivate: false,
			bookMark: true,
			bgColor: 'green',
			name: 'NERA'
		},
		3: {
			isPrivate: false,
			bookMark: true,
			bgColor: 'purple',
			name: 'HHsadfasdfasdfasdfsdafsadf'
		}
	});

	const [team, setTeam] = useState<ProjectTeamObj>({
		1: [
			{
				userID: 1,
				userIcon: 'pet',
				userName: 'heeeun',
				gitID: 'gmldms784@naver.com'
			},
			{
				userID: 2,
				userIcon: 'apple',
				userName: 'taejin',
				gitID: 'thereisnotruth12@gmail.com'
			}
		]
	});

	const [list, setList] = useState<ProjectListObj>({
		1: [
			{
				listID: 1,
				name: '할 일'
			},
			{
				listID: 2,
				name: '끝난 일'
			}
		]
	});

	const [task, setTask] = useState<ProjectTaskObj>({
		1: [
			{
				taskID: 1,
				createAt: new Date(),
				modifiedAt: new Date(),
				attribute: [{
					key: 'text-field',
					value: 'hi'
				},
				{
					key: 'tags',
					value: ['우희은(hinge7)', '김정현(powergee)']
				}]
			}
		]
	});

	return (
		<ProjectDataContext.Provider value={project}>
			<ProjectDispatchContext.Provider value={setProject}>
				<TeamContext.Provider value={team}>
					<TeamDispatchContext.Provider value={setTeam}>
						<ListContext.Provider value={list}>
							<ListDispatchContext.Provider value={setList}>
								<TaskContext.Provider value={task}>
									<TaskDispatchContext.Provider value={setTask}>
										{children}
									</TaskDispatchContext.Provider>
								</TaskContext.Provider>
							</ListDispatchContext.Provider>
						</ListContext.Provider>
					</TeamDispatchContext.Provider>
				</TeamContext.Provider>
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
export function useTeamState() {
	const context = useContext(TeamContext);
	return context;
}
export function useTeamDispatch() {
	const context = useContext(TeamDispatchContext);
	return context;
}
export function useListState() {
	const context = useContext(ListContext);
	return context;
}
export function useListDispatch() {
	const context = useContext(ListDispatchContext);
	return context;
}
export function useTaskState() {
	const context = useContext(TaskContext);
	return context;
}
export function useTaskDispatch() {
	const context = useContext(TaskDispatchContext);
	return context;
}

/* projectID context */

export const PIDContext = createContext<number>(1);
export const PIDDispatchContext = createContext<Dispatch<number>>(() => {});

export const PIDContextProvider = ({ children } : childrenObj) => {
	const [pid, setPID] = useState<number>(1);

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
