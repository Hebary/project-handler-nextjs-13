import { UiState } from './';


type UiActionType = 
| {type: '[UI]-TOGGLE_MENU'}
| {type: '[UI]-TOGGLE_MODAL'}


export const uiReducer = (state: UiState, action: UiActionType): UiState => {


   switch (action.type) {
        case '[UI]-TOGGLE_MENU':
            return{
              ...state,
              isMenuOpen: !state.isMenuOpen
            }
        case '[UI]-TOGGLE_MODAL':
            return{
              ...state,
              isModalOpen: !state.isModalOpen
            }
    default: 
            return state; 
    }
}