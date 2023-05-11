import { createContext } from 'react';
import { Project, Task, User } from '../../interfaces';


interface ContextProps {
    projects              : Project[];
    project               : Project | undefined;
    task                  : Task | undefined;
    contributor           : User | undefined;
    createProject         : (project: Project) => void;
    getProjectById        : (id: string) => void;
    setTaskToState        : (task: Task) => void;
    loadProjectsInState   : () => void;
    updateProject         : (project: Project) => void;
    deleteProject         : (id: string) => void;
    createNewTask         : (task: Task) => void;
    updateTask            : (task: Task) => void;
    deleteTask            : (task: Task) => void;
    findContributor       : (contributorEmail: string) => void;
    addContributor        : (contributorEmail: string) => void;
    deleteContributor     : (id: string) => void;
    cleanProjectsState    : () => void;
    changeTaskState       : (id: string) => void;
    searchProject         : (query: string) => void;
    //socket. 
    addTaskSocket         : (task: Task) => void;
    deleteTaskSocket      : (task: Task) => void;
    updateTaskSocket      : (task: Task) => void;
    changeTaskStateSocket : (task: Task) => void;
}

export const ProjectsContext = createContext({} as ContextProps);