import { createContext } from 'react';
import { User } from '../../interfaces';

interface ContextProps {
    isLogged: boolean;
    user?: User;
    // methods
    signOut: () => void;
    loginUser: (email: string, password: string) => Promise<{ hasError: boolean, message?:string }>;
    createAccount: ( name: string, email:string, password:string ) => Promise<{ hasError: boolean, message?:string }>;
}


export const AuthContext = createContext({} as ContextProps);

