import { createContext } from 'react';


interface ContextProps {
    isMenuOpen: boolean;
    isModalOpen: boolean;
    toggleMenu: () => void;
    toggleModal: () => void;
}

export const UiContext = createContext({} as ContextProps);