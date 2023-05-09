import { useReducer } from 'react';
import { UiContext, uiReducer } from './';


interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface UiState {
    isMenuOpen: boolean;
    isModalOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
   isMenuOpen: false,
   isModalOpen: false
}

export const UiProvider: React.FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleMenu = () => {
        dispatch({type: '[UI]-TOGGLE_MENU'})
    }

    const toggleModal = () => {
        dispatch({type: '[UI]-TOGGLE_MODAL'})
    }

return (
    <UiContext.Provider
        value={{
                ...state,
                // methods:
                toggleMenu,
                toggleModal,
                
            }}>
        {children}
    </UiContext.Provider>
    )
}
