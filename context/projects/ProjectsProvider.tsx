import { useReducer, useEffect } from 'react';
import { ProjectsContext, projectsReducer } from './';
import { pmApi } from '../../config';
import { Project, Task, User } from '../../interfaces';
import Cookies from 'js-cookie';

// import { io, Socket } from 'socket.io-client'
// let socket : Socket;
interface Props {
   children: React.ReactNode
}

export interface ProjectsState {
    projects: Project[];
    project : Project | undefined;
    task: Task | undefined;
    contributor: User | undefined;
}

const PROJECTS_INITIAL_STATE: ProjectsState = {
   projects:[],
   project: undefined,
   task: undefined,
   contributor: undefined
}

export const ProjectsProvider: React.FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(projectsReducer, PROJECTS_INITIAL_STATE);
    
    //open socket-io connection
    // useEffect(() => {
    //   socket = io(import.meta.env.VITE_BACKEND_URL);
    // }, [])
    
    
    // Get user projects and set them in the state
    useEffect(() => {
        const getUserProjects = async () => {
            try {
                const token = Cookies.get('token');
                if(!token) return;
                const config = {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await pmApi.get<Project[]>('/projects', config);
                dispatch({type: '[PROJECTS]-LOAD_PROJECTS', payload: data});
            } catch( error) {
                console.log({error});
                Cookies.remove('token');
            }
        }
        getUserProjects()
    }, []);
    

 

    const loadProjectsInState = async () => {
        try {
            const token = Cookies.get('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.get<Project[]>('/projects', config);
            dispatch({type: '[PROJECTS]-LOAD_PROJECTS', payload: data});
        } catch( error) {
            console.log({error});
        }

    }

    const cleanProjectsState = () => {
        dispatch({ type: '[PROJECTS]-LOAD_PROJECTS', payload:[]});
        dispatch({ type: '[PROJECTS]-LOAD_PROJECT', payload: undefined});
        dispatch({ type: '[PROJECTS]-SET_TASK', payload: undefined});
        dispatch({ type: '[PROJECTS]-SET_CONTRIBUTOR', payload: undefined});
    }

    const createProject  = async (project: Project) => {
    
        try {
            const token = Cookies.get('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await pmApi.post<Project>('/projects', project , config);
            dispatch({type: '[PROJECTS]-ADD_PROJECT', payload: data});

        } catch (error) {
            console.log({error});
        }
    }

    // const setProjectToState = async (project: Project) => {
    //     dispatch({ type: '[PROJECTS]-LOAD_PROJECT', payload: project });
    // }
    const setTaskToState = async (task: Task) => {
        dispatch({ type: '[PROJECTS]-SET_TASK', payload: task });
    }

    const updateProject = async (project: Project) => {
        try {
            const token = Cookies.get('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.put<Project>(`/projects/${state.project?._id}`, project , config);
            dispatch({ type: '[PROJECTS]-UPDATE_PROJECT', payload: data });
        } catch (error) {
            console.log({error});
        }
    }

    const deleteProject = async (id: string) => {
        try {
            const token = Cookies.get('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.delete<Project>(`/projects/${id}`, config);
            console.log(data);
            dispatch({ type: '[PROJECTS]-DELETE_PROJECT', payload: id });
        } catch (error) {
            console.log({error});
        }
    }

    const createNewTask = async (task: Task) => {
        try {
            const token = Cookies.get('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.post<Task>(`/task`, task, config);
            
            //SOCKET-IO
            // socket.emit('add task', data);
            

        } catch (error) {
            console.log({error});
        }
    }


    const updateTask = async (task: Task) => {
        try {
            const token = Cookies.get('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.put<Task>(`/task/${state.task?._id}`, task, config);
            // socket.emit('update task', data);
        }catch (error) {
            console.log({error});
        }

    }
    const getProjectById = async (id: string) => {
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'authorization': `Bearer ${Cookies.get('token')}`
            }
        }
    
    try{
        const { data } = await pmApi.get<Project>(`/projects/${id}`, config);
        dispatch({ type: '[PROJECTS]-LOAD_PROJECT', payload: data });
    } catch (error) {
        console.log({error});
        }
    }


    const deleteTask = async (task: Task) => {
        try {
            const token = Cookies.get('token');
                if(!token) return;
                const config = {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await pmApi.delete<Task>(`/task/${task._id}`, config);
                console.log(data);
                
                // socket.emit('delete task', task);
            } catch (error) {
            console.log({error});
        }
    }

    const findContributor = async(email: string) => {
        try {
            const token = Cookies.get('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.post('/projects/contributors', {email}, config);
            dispatch({ type: '[PROJECTS]-SET_CONTRIBUTOR', payload: data });
        } catch (error) {
            console.log({error});
        }
    }

    const addContributor = async(email: string) => {
        try {
            const token = Cookies.get('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.post(`/projects/contributors/${state.project?._id}`, {email, id: state.project?._id}, config);
            console.log(data);
            dispatch({ type: '[PROJECTS]-ADD_CONTRIBUTOR', payload: state.contributor as User });
        } catch (error) {
            console.log(error);
        }
    }

    const deleteContributor = async(id: string) => {
       
        try {
            const token = Cookies.get('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.post(`/projects/delete-contributor/${state.project?._id}`,{ id }, config);
            console.log(data)
            dispatch({ type: '[PROJECTS]-DELETE_CONTRIBUTOR', payload: id });
            console.log(state.project?.contributors)
        } catch (error) {
            console.log({error});
        }
    }

    const changeTaskState = async (id: string) => {
        try {
            const token = Cookies.get('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.post<Task>(`/task/state/${id}`,{}, config)
            // socket.emit('complete task', data);

        } catch (error) {
            console.log(error);
        }
    }

    const searchProject = (query: string) => {
        const projectsAux = state.projects;
        if(query === '') {
            return;
        }
        const filteredProjects = state.projects.filter(project => project.name.toLowerCase().includes(query.toLowerCase()));
        dispatch({ type: '[PROJECTS]-LOAD_PROJECTS', payload: filteredProjects });
        setTimeout(() => {
            dispatch({ type: '[PROJECTS]-LOAD_PROJECTS', payload: projectsAux });
        },15000)
        
    }


    //Socket-IO

    const addTaskSocket = (task: Task) => {
        dispatch({ type: '[PROJECTS]-ADD_TASK', payload: task });
    }

    const deleteTaskSocket = (task: Task) => {
            dispatch({ type: '[PROJECTS]-DELETE_TASK', payload: task?._id as string});
            dispatch({ type: '[PROJECTS]-SET_TASK', payload: undefined });
    }

    const updateTaskSocket = (task: Task) => {
        dispatch({ type: '[PROJECTS]-UPDATE_TASK', payload: task });
        dispatch({ type: '[PROJECTS]-SET_TASK', payload: undefined });
    }

    const changeTaskStateSocket = (task: Task) => {
        dispatch({ type: '[PROJECTS]-CHANGE_TASK_STATE', payload: task });
    }

    return ( 
        <ProjectsContext.Provider
            value={{
                    ...state,
                    projects: state.projects,
                    project: state.project,
                    task: state.task,
                    contributor: state.contributor,
                    createProject,
                    setTaskToState,
                    loadProjectsInState,
                    getProjectById,
                    updateProject,
                    deleteProject,
                    createNewTask,
                    updateTask,
                    deleteTask,
                    findContributor,
                    addContributor,
                    deleteContributor,
                    cleanProjectsState,
                    changeTaskState,
                    searchProject,
                    addTaskSocket,
                    deleteTaskSocket,
                    updateTaskSocket,
                    changeTaskStateSocket
                }}>
            {children}
        </ProjectsContext.Provider>
    )
}
