import React, {
	useState, createContext, useContext, Dispatch, useEffect
} from 'react';
import axios from 'axios';

/*
	todo : model에서 reducer로 관리하기
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
	ID : number;
	Name : string;
	Icon : string;
	GitID : string;
}

export type ProjectUserObj = {
	ID : number;
	Name : string;
	Icon : string;
	GitID : string;
	AuthLVL: number;
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

export type ProjectMap = {
	[projectID : number] : {
		BGColor: string;
		IsPrivate: boolean;
		BookMark: boolean;
		Name: string;
		RepoOwner: string;
		RepoName: string;
		Auth: number;
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
	ID: number;
	CreatedAt: string;
	DeletedAt: null;
	UpdatedAt: string | null;
	Lists: Array<ImportListObj>;
	BGColor: string;
	IsPrivate: boolean;
	BookMark: boolean;
	Name: string;
	RepoOwner: string;
	RepoName: string;
}

type ProjectObj = {
	BGColor: string;
	IsPrivate: boolean;
	BookMark: boolean;
	Name: string;
	RepoOwner: string;
	RepoName: string;
	Auth: number;
}

const ProjectDataContext = createContext<ProjectMap | undefined>(undefined);
const ProjectUpdateContext = createContext<(id: number, p: ProjectMap) => void>(() => {});
const ProjectAddContext = createContext<(name : string, pri : boolean) => void>(() => {});
const ProjectDeleteContext = createContext<(id: number) => void>(() => {});
const ProjectCopyContext = createContext<(id: number) => void>(() => {});
const TeamContext = createContext<ProjectTeamObj | undefined>(undefined);
const TeamDispatchContext = createContext<Dispatch<ProjectTeamObj>>(() => {});
const UserAuthChangeContext = createContext<(uid: number, auth: number) => void>(() => {});
const ExitProjectContext = createContext<(projectID : number, uid: number) => void>(() => {});
const ListContext = createContext<ProjectListObj | undefined>(undefined);
const ListDispatchContext = createContext<Dispatch<ProjectListObj>>(() => {});
const TaskContext = createContext<ProjectTaskObj | undefined>(undefined);
const TaskDispatchContext = createContext<Dispatch<ProjectTaskObj>>(() => {});

export const ProjectContextProvider = ({ children } : childrenObj) => {
	const [update, forceUpdate] = useState(true);

	const [project, setProject] = useState<ProjectMap>({});

	const [team, setTeam] = useState<ProjectTeamObj>([]);

	const [list, setList] = useState<ProjectListObj>([]);

	const [task, setTask] = useState<ProjectTaskObj>({});

	// todo : test data 다시 생성

	const pid = usePIDState();
	const user = useUserState();

	useEffect(() => {
		// 선택한 project가 바뀌면 project, 팀 정보 다시 받아오기
		if (user === undefined || pid < 0) {
			return;
		}
		getTeam();
		getListTask();
	}, [pid]);

	useEffect(() => {
		// user가 바뀌면 project 다시 받아오기
		getProject();
	}, [user]);

	/* project api 함수 */

	const getProject = () => {
		// 현재 user의 project 정보 받아오기
		// list, task를 제외한 project 정보 + 해당 project에 대한 user의 auth 저장
		if (user === undefined) {
			return;
		}
		axios.get('http://localhost:8080/v1/works-in-api/works-in-user', { withCredentials: true })
			.then(async (res) => {
				const data = res.data;
				const tmpProjectMap : ProjectMap = {};
				for (let i = 0; i < data.auths.length; i += 1) {
					const tmpProject : ProjectObj = {
						BGColor: data.projects[i].BGColor,
						IsPrivate: data.projects[i].IsPrivate,
						BookMark: data.projects[i].BookMark,
						Name: data.projects[i].Name,
						RepoOwner: data.projects[i].RepoOwner,
						RepoName: data.projects[i].RepoName,
						Auth: data.auths[i]
					};
					tmpProjectMap[data.projects[i].ID] = tmpProject;
				}
				setProject(tmpProjectMap);
			})
			.catch((e) => {
				console.dir(e);
			});
	};

	const getTeam = () => {
		// 현재 pid에 해당하는 team 정보 받아오기

		axios.get(`http://localhost:8080/v1/works-in-api/works-in-project/${pid}`)
			.then((res) => {
				console.log(res);
				setTeam(res.data);
			})
			.catch((e) => {
				console.dir(e);
			});
	};

	const getListTask = () => {
		// 현재 pid에 해당하는 task, list 정보 받아오기

		axios.get(`http://localhost:8080/v1/project-api/project/${pid}`)
			.then((res) => {
				console.log(res);
				const tmpList : ProjectListObj = [];
				const tmpTask : ProjectTaskObj = {};

				res.data.Lists.forEach((listData: ImportListObj) => {
					tmpList.push({
						listID: listData.ID,
						name: listData.Name,
						index: listData.Rank
					});
					listData.Tasks.forEach((taskData : ImportTaskObj) => {
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
				setList(tmpList);
				setTask(tmpTask);
			})
			.catch((e) => {
				console.dir(e);
			});
	};

	const changeProject = (id : number, p : ProjectMap) => {
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
				tmpProject[data.ID] = data;
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
				// id에 해당하는 프로젝트 삭제
				const tmpProject = project;
				delete tmpProject[id];
				setProject(tmpProject); // 다시 받아오기
				forceUpdate(!update);
			})
			.catch((e) => {
				console.dir(e);
			});
	};

	const copyProject = (id : number) => {
		axios.post('http://localhost:8080/v1/project-api/copy', {
			ProjectID: id.toString()
		})
			.then((res) => {
				console.dir(res);
				const data : ProjectObj = res.data;
				const tmpProject : ProjectMap = project;
				setProject(tmpProject);
				forceUpdate(!update);
			})
			.catch((e) => {
				console.dir(e);
			});
	};

	/*
		todo : project 랑 works-in api 분리하기
	*/
	/* team api 함수 */
	const userAuthChange = (uid: number, auth: number) => {
		// 관리자는 유저로, 유저는 관리자로
		const resultAuth = auth === 1 ? 2 : 1;
		axios.post('http://localhost:8080/v1/works-in-api/works-in/setAuth', {
			'ProjectID': pid.toString(),
			'UserID': uid.toString(),
			'AuthLVL': resultAuth.toString()
		})
			.then((res) => {
				console.dir(res);
				getTeam();
				// forceUpdate(!update);
			})
			.catch((err) => {
				console.dir(err);
			});
	};

	const exitProject = (projectID : number, uid: number) => {
		if (user === undefined) {
			return;
		}

		axios.post('http://localhost:8080/v1/works-in-api/exit', {
			'UserID': uid.toString(),
			'ProjectID': projectID.toString()
		})
			.then((res) => {
				console.dir(res);
				getTeam();
				forceUpdate(!update);
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
						<ProjectCopyContext.Provider value={copyProject}>
							<TeamContext.Provider value={team}>
								<TeamDispatchContext.Provider value={setTeam}>
									<UserAuthChangeContext.Provider value={userAuthChange}>
										<ExitProjectContext.Provider value={exitProject}>
											<ListContext.Provider value={list}>
												<ListDispatchContext.Provider value={setList}>
													<TaskContext.Provider value={task}>
														<TaskDispatchContext.Provider value={setTask}>
															{children}
														</TaskDispatchContext.Provider>
													</TaskContext.Provider>
												</ListDispatchContext.Provider>
											</ListContext.Provider>
										</ExitProjectContext.Provider>
									</UserAuthChangeContext.Provider>
								</TeamDispatchContext.Provider>
							</TeamContext.Provider>
						</ProjectCopyContext.Provider>
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
export function useProjectCopy() {
	const context = useContext(ProjectCopyContext);
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
export function useExitProject() {
	const context = useContext(ExitProjectContext);
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

export const PIDContext = createContext<number>(-1);
export const PIDDispatchContext = createContext<Dispatch<number>>(() => {});

export const PIDContextProvider = ({ children } : childrenObj) => {
	const [pid, setPID] = useState<number>(-1);

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

export const userContext = createContext<UserObj | undefined>(undefined);
const userDispatchContext = createContext<Dispatch<UserObj>>(() => {});
const loginContext = createContext<() => void>(() => {});

export const UserContextProvider = ({ children } : childrenObj) => {
	const [user, setUser] = useState<UserObj | undefined>(undefined);

	useEffect(() => {
		// 페이지가 변환될 때마다 user 정보 다시 저장하기
		getUserInfo();
	}, [window.location.href]);

	const login = () => {
		// 로그인
		axios.post('http://localhost:8080/v1/user-api/login', {
			ID: 'heejin',
			Password: '1234'
		}, { withCredentials: true })
			.then((res) => {
				// 토큰 발급됨
				console.dir(res);
				window.location.href = `${window.origin}/home`; // home으로 redirect
			})
			.catch((e) => {
				console.dir(e);
			});
	};

	const getUserInfo = () => {
		// 새로고침, 토큰으로 user 정보 받아오기
		axios.get('http://localhost:8080/v1/user-api/user', { withCredentials: true })
			.then((res) => {
				const tmpUser : UserObj = {
					ID: res.data.ID,
					Name: res.data.Name,
					Icon: res.data.Icon,
					GitID: res.data.GitID
				};
				setUser(tmpUser);
			})
			.catch((e) => {
				console.dir(e);
				// window.location.href = `${window.origin}`; // login으로 redirect
			});
	};

	return (
		<userContext.Provider value={user}>
			<userDispatchContext.Provider value={setUser}>
				<loginContext.Provider value={login}>
					{children}
				</loginContext.Provider>
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
export function useLogin() {
	const context = useContext(loginContext);
	return context;
}
