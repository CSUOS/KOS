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
type UserObj = {
	userID : number;
	userName: string;
	userIcon: string;
	gitID: string;
}
export type ProjectUserObj = {
	ID : number;
	Name : string;
	Icon : string;
	GitID : string;
	AuthLVL : number;
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

export type ProjectTeamObj = Array<ProjectUserObj>;

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
const ProjectUpdateContext = createContext<(id: number, p: ProjectObj) => void>(() => {});
const ProjectAddContext = createContext<(name : string, pri : boolean) => void>(() => {});
const ProjectDeleteContext = createContext<(id: number) => void>(() => {});
const TeamContext = createContext<ProjectTeamObj | undefined>(undefined);
const TeamDispatchContext = createContext<Dispatch<ProjectTeamObj>>(() => {});
const UserAuthChangeContext = createContext<(uid: number, auth: number) => void>(() => {});
const ListContext = createContext<ProjectListObj | undefined>(undefined);
const ListDispatchContext = createContext<Dispatch<ProjectListObj>>(() => {});
const TaskContext = createContext<ProjectTaskObj | undefined>(undefined);
const TaskDispatchContext = createContext<Dispatch<ProjectTaskObj>>(() => {});

export const ProjectContextProvider = ({ children } : childrenObj) => {
	const [update, forceUpdate] = useState(true);
	/*
	const [project, setProject] = useState<ProjectObj>({});

	const [team, setTeam] = useState<ProjectTeamObj>([]);

	const [list, setList] = useState<ProjectListObj>([]);

	const [task, setTask] = useState<ProjectTaskObj>({});
	*/
	// backend를 안켰을 때를 위해 남겨두는 test data
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

	const [team, setTeam] = useState<ProjectTeamObj>(
		[
			{
				ID: 1,
				Icon: 'pet',
				Name: 'heeeun',
				GitID: 'gmldms784@naver.com',
				AuthLVL: 1
			},
			{
				ID: 2,
				Icon: 'apple',
				Name: 'taejin',
				GitID: 'thereisnotruth12@gmail.com',
				AuthLVL: 2
			}
		]
	);

	const [list, setList] = useState<ProjectListObj>([
		{
			listID: 1,
			name: '할 일',
			index: 0
		},
		{
			listID: 2,
			name: '끝난 일',
			index: 1
		}
	]);

	const [task, setTask] = useState<ProjectTaskObj>();

	const a = 1;
	const pid = usePIDState();

	useEffect(() => {
		// pid와 세션 정보가 바뀔 때마다 project 정보 다시 받아오기
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
		/*
		자꾸 DB 에러남 => 고쳐야함
		axios.get(`http://localhost:8080/v1/works-in-api/works-in-project/${pid}`)
			.then((res) => {
				console.log(res);
				setTeam(res.data);
			})
			.catch((e) => {
				console.dir(e);
			});
		*/
	}, [a, pid]); // 나중에는 a를 대체하여 쿠키/세션 정보가 바뀌면 다시 받아오도록 하기

	/* project api 함수 */

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

		forceUpdate(!update);
	};

	const addProject = (name : string, pri : boolean) => {
		if (name === '') {
			alert('프로젝트 이름을 입력해주세요.');
		}
		axios.post('http://localhost:8080/v1/project-api/project', {
			'Name': name,
			'IsPrivate': pri
		})
			.then((res) => {
				console.dir(res);
				// 추가한 프로젝트 정보 받아서 project에 넣기
				const { data } = res;
				const tmpProject = project;
				tmpProject[data.ID] = {
					isPrivate: data.IsPrivate,
					bookMark: data.BookMark,
					bgColor: data.BGColor,
					name: data.Name
				};
				setProject(tmpProject);
				forceUpdate(!update);
			})
			.catch((e) => {
				console.dir(e);
			});
	};

	const deleteProject = (id : number) => {
		axios.delete(`http://localhost:8080/v1/project-api/project/${id}`)
			.then((res) => {
				console.dir(res);
				// pid에 해당하는 프로젝트 삭제
				const tmpProject = project;
				delete tmpProject[id];
				setProject(tmpProject);
				forceUpdate(!update);
			})
			.catch((e) => {
				console.dir(e);
			});
	};

	/* team api 함수 */
	const userAuthChange = (uid: number, auth: number) => {
		// 관리자는 유저로, 유저는 관리자로
		const resultAuth = auth === 1 ? 2 : 1;
		axios.post('http://localhost:8080/v1/works-in-api/works-in/setAuth', {
			'ProjectID': pid.toString(),
			'UserID': uid.toString(),
			'AuthLVL': auth.toString()
		})
			.then((res) => {
				console.dir(res);
			})
			.catch((err) => {
				console.dir(err);
			});
	};

	return (
		<ProjectDataContext.Provider value={project}>
			<ProjectUpdateContext.Provider value={changeProject}>
				<ProjectAddContext.Provider value={addProject}>
					<ProjectDeleteContext.Provider value={deleteProject}>
						<TeamContext.Provider value={team}>
							<TeamDispatchContext.Provider value={setTeam}>
								<UserAuthChangeContext.Provider value={userAuthChange}>
									<ListContext.Provider value={list}>
										<ListDispatchContext.Provider value={setList}>
											<TaskContext.Provider value={task}>
												<TaskDispatchContext.Provider value={setTask}>
													{children}
												</TaskDispatchContext.Provider>
											</TaskContext.Provider>
										</ListDispatchContext.Provider>
									</ListContext.Provider>
								</UserAuthChangeContext.Provider>
							</TeamDispatchContext.Provider>
						</TeamContext.Provider>
					</ProjectDeleteContext.Provider>
				</ProjectAddContext.Provider>
			</ProjectUpdateContext.Provider>
		</ProjectDataContext.Provider>
	);
};

export function useProjectState() {
	const context = useContext(ProjectDataContext);
	return context;
}
export function useProjectUpdate() {
	const context = useContext(ProjectUpdateContext);
	return context;
}
export function useProjectAdd() {
	const context = useContext(ProjectAddContext);
	return context;
}
export function useProjectDelete() {
	const context = useContext(ProjectDeleteContext);
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
export function useUserAuthDispatch() {
	const context = useContext(UserAuthChangeContext);
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

export const userContext = createContext<ProjectUserObj | undefined>(undefined);
const userDispatchContext = createContext<Dispatch<ProjectUserObj>>(() => {});

export const UserContextProvider = ({ children } : childrenObj) => {
	const [id, setUserID] = useState<ProjectUserObj>({
		ID: 1,
		Name: 'heeeun',
		Icon: 'pet',
		GitID: 'gmldms784@naver.com',
		AuthLVL: 2
	});
	/*
	const a = 1;
	const pid = usePIDState();

	useEffect(() => {
		// pid와 세션 정보가 바뀔 때마다 user 정보 다시 받아오기
		// 세션 정보 없으면 로그인 페이지로
		axios.
	}, [a, pid]);
	*/
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
