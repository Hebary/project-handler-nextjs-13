import { useReducer, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Cookies from 'js-cookie';
import { pmApi } from '../../config';
import { User } from '../../interfaces';
import { AuthContext, authReducer } from './';

interface Props {
   children: React.ReactNode
}

export interface AuthState {
    user: User
    isLogged: boolean;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLogged: false,
    user:{
        _id: '',
        name: '',
        email: '',
        token : '',
    }
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    
    const router = useRouter();
    // Check if user was already auth
    useEffect(() => {
        checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const checkToken = async () => {

        if( !Cookies.get('token') ) return;

        try {
            const { data } = await pmApi.get<User>('/users/profile');
            
            
            Cookies.set('token', data.token);
                    dispatch({
                        type: '[AUTH]-LOGIN',
                        payload: data
                    })
            router.push('/');
        } catch (error) {
            Cookies.remove('token');
        }
    }

    const loginUser = async ( email: string, password: string ): Promise<{ hasError: boolean, message?: string }> => {
        try {
            const { data } = await pmApi.post<User>('/users/login', { email, password })    
            
            Cookies.set('token', data.token);

            dispatch({
                type: '[AUTH]-LOGIN',
                payload: data
            })
            return {
                hasError: false
            }

        } catch (error: any) {
            if( axios.isAxiosError(error) ){
                return {
                    hasError:true,
                    message: error.response?.data.msg
                }
            } else return {
                hasError:true,
                message: 'Something went wrong'
            }
        }
    }

    const createAccount = async ( name: string, email: string, password: string ): Promise<{ hasError: boolean, message?: string }> => {
        try {
            const { data } = await pmApi.post<User>('/users/registry', { name, email, password })    
            Cookies.set('token', data.token);
            dispatch({ 
                    type: '[AUTH]-LOGIN', 
                    payload: data 
                })
            return { 
                hasError: false,
            }
        } catch (error) {
            if( axios.isAxiosError(error) ){
                return {
                    hasError:true,
                    message: error.response?.data.msg
                }
            } else return {
                hasError:true,
                message: 'Something went wrong, user coud not be created'
            }
        }
    }

    const signOut = () => {
        Cookies.remove('token');
        console.log('signOut', AUTH_INITIAL_STATE.user);
        dispatch({ type: '[AUTH]-LOGOUT', payload: AUTH_INITIAL_STATE.user as User });
    }

    return (
    
    <AuthContext.Provider
        value={{
                ...state,
                signOut,
                loginUser,
                createAccount
            }}>
        {children}
    </AuthContext.Provider>
    )
}
