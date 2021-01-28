import React, {
	useState, createContext, useContext, Dispatch, useEffect
} from 'react';
import axios from 'axios';

/*
	todo : user 정보를 쿠키에서 받아와서 model에 저장, 바꿀 수 있는 함수는 x
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

type TypeAttribute = {
	[type : string] : Array<Attribute>
}

type ReactionObj = {
	reaction : string,
	users : Array<string>
}

export type TaskObj = {
	taskID: number;
	attribute: TypeAttribute;
	reactions: Array<ReactionObj>;
	createdAt: Date;
	updatedAt: Date;
	index: number;
}

type ListObj = {
	listID: number;
	name: string;
	index: number;
}

export type ProjectObj = {
	[projectID : number] : {
		isPrivate: boolean;
		bookMark: boolean;
		bgColor: string;
		name: string;
	}
}

/* 선택된 project에 대한 team, list, task */

export type ProjectTeamObj = Array<UserObj>;

type ProjectListObj = Array<ListObj>;

export type ProjectTaskObj = {
	[listID : number] : Array<TaskObj>;
}

/* DB에서 넘어오는 data type */
type ImportTaskObj = {
	Attribute: TypeAttribute;
	ID: number;
	Rank: number;
	ListID: number;
	Name: string;
	Reactions: Array<ReactionObj>;
	CreatedAt: string;
	DeletedAt: null;
	UpdatedAt: string;
}

type ImportListObj = {
	ID: number;
	Name: string;
	ProjectID: number;
	Rank: number;
	Tasks: Array<ImportTaskObj>;
	CreatedAt: string;
	DeletedAt: null;
	UpdatedAt: string | null;
}

type ImportProjectObj = {
	BGColor: string;
	BookMark: boolean;
	ID: number;
	IsPrivate: boolean;
	Lists: Array<ImportListObj>;
	Name: string;
	CreatedAt: string;
	DeletedAt: null;
	UpdatedAt: string | null;
}

const ProjectDataContext = createContext<ProjectObj | undefined>(undefined);
const ProjectDispatchContext = createContext<(id: number, p: ProjectObj) => void>(() => {});
const TeamContext = createContext<ProjectTeamObj | undefined>(undefined);
const TeamDispatchContext = createContext<Dispatch<ProjectTeamObj>>(() => {});
const ListContext = createContext<ProjectListObj | undefined>(undefined);
const ListDispatchContext = createContext<Dispatch<ProjectListObj>>(() => {});
const TaskContext = createContext<ProjectTaskObj | undefined>(undefined);
const TaskDispatchContext = createContext<Dispatch<ProjectTaskObj>>(() => {});

export const ProjectContextProvider = ({ children } : childrenObj) => {
	const [project, setProject] = useState<ProjectObj>();

	const [team, setTeam] = useState<ProjectTeamObj>(
		[
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
	);

	const [list, setList] = useState<ProjectListObj>();

	const [task, setTask] = useState<ProjectTaskObj>();

	const a = 1;
	const pid = usePIDState();

	useEffect(() => {
		axios.get('http://localhost:8080/v1/project-api/projects')
			.then(async (res) => {
				console.log(res);
				const tmpProject : ProjectObj = {};
				const tmpList : ProjectListObj = [];
				const tmpTask : ProjectTaskObj = {};
				res.data.forEach((data : ImportProjectObj) => {
					tmpProject[data.ID] = {
						isPrivate: data.IsPrivate,
						bookMark: data.BookMark,
						bgColor: data.BGColor,
						name: data.Name
					};

					if (data.ID === pid) {
						// 현재 선택된 project의 list와 task, team 받아오기
						data.Lists.sort((x : ImportListObj, y: ImportListObj) => {
							// index 순으로 list 정렬
							if (x.Rank > y.Rank) {
								return -1;
							}
							return 0;
						}).forEach((listData: ImportListObj) => {
							tmpList.push({
								listID: listData.ID,
								name: listData.Name,
								index: listData.Rank
							});
							listData.Tasks.sort((x : ImportTaskObj, y: ImportTaskObj) => {
								// index 순으로 task 정렬
								if (x.Rank > y.Rank) {
									return -1;
								}
								return 0;
							}).forEach((taskData : ImportTaskObj) => {
								if (listData.ID !== taskData.ListID) {
									throw new Error('task가 할당된 list의 id와 다릅니다.');
								}
								tmpTask[taskData.ListID] = [];
								tmpTask[taskData.ListID].push({
									taskID: taskData.ID,
									attribute: taskData.Attribute,
									reactions: taskData.Reactions,
									index: taskData.Rank,
									createdAt: new Date(taskData.CreatedAt),
									updatedAt: new Date(taskData.UpdatedAt)
								});
							});
						});

						// team은 따로 api로 받아와야 함 => api 수정 후
					}
				});

				setProject(tmpProject);
				setList(tmpList);
				setTask(tmpTask);
			})
			.catch((e) => {
				console.dir(e);
			});
	}, [a, pid]); // 나중에는 a를 대체하여 쿠키/세션 정보가 바뀌면 다시 받아오도록 하기

	const changeProject = (id : number, p : ProjectObj) => {
		if (p === undefined) return;

		setProject(p);
		axios.put(`http://localhost:8080/v1/project-api/project/${id}`, p[id])
			.then((res) => {
				console.dir(res);
			})
			.catch((e) => {
				console.dir(e);
			});
	};

	return (
		<ProjectDataContext.Provider value={project}>
			<ProjectDispatchContext.Provider value={changeProject}>
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
