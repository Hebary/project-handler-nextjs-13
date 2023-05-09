import { User } from '../../interfaces';
import { AuthState } from './';


type AuthActionType = 
| {type: '[AUTH]-LOGIN', payload: User}


export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {


   switch (action.type) {
       case '[AUTH]-LOGIN':
            return{
              ...state,
              user: action.payload,
              isLogged: true
           }

    default: 
            return state; 
    }
}