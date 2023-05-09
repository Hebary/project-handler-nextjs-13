import { useReducer, useEffect } from 'react';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import { pmApi } from '../../config';
import { User } from '../../interfaces';
import { AuthContext, authReducer } from './';
import axios from 'axios';



interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface AuthState {
    user?: User
    isLogged: boolean;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLogged: false
}

export const AuthProvider: React.FC<Props> = ({ children }) => {

    const router = useRouter();
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    // Check if user was logged in
    useEffect(() => {
        checkToken();
    },[])

    const checkToken = async () => {

        if( !Cookies.get('token') ) return;

        try {
            const { data } = await pmApi.get('/user/validate-jwt');
            const { user, token } = data;
            
            Cookies.set('token', token);
                    dispatch({
                        type: '[AUTH]-LOGIN',
                        payload: user
                    })
                    router.push('/');
            
        } catch (error) {
            Cookies.remove('token');
        }
    }


    const signOut = () => {
        localStorage.removeItem('token');
        dispatch({ type: '[AUTH]-LOGIN', payload: AUTH_INITIAL_STATE.user as User });
    }

    const loginUser = async ( email: string, password: string ): Promise<{ hasError: boolean, message?: string }> => {
        try {
            const { data } = await pmApi.post('/user/login', { email, password })    
            const { user, token} = data;
            
            Cookies.set('token', token);

            dispatch({
                type: '[AUTH]-LOGIN',
                payload: user
            })

            return {
                hasError: false
            }

        } catch (error: any) {
            if( axios.isAxiosError(error) ){
                return {
                    hasError:true,
                    message: error.response?.data.message
                }
            } else return {
                hasError:true,
                message: 'Something went wrong'
            }
        }

    }

    const createAccount = async ( name: string, email: string, password: string ): Promise<{ hasError: boolean, message?: string }> => {
        try {
            const { data } = await pmApi.post('/user/create-account', { name, email, password })    
            const { user, token  } = data;
            Cookies.set('token', token);
            dispatch({ type: '[AUTH]-LOGIN', payload: user })
            return { 
                hasError: false,
            }
        } catch (error) {
            if( axios.isAxiosError(error) ){
                return {
                    hasError:true,
                    message: error.response?.data.message
                }
            } else return {
                hasError:true,
                message: 'Something went wrong, user coud not be created'
            }
        }
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
