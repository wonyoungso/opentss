import React, {createContext, useReducer} from 'react';

const initialState = {
  windowWidth: 1024,
  windowHeight: 768,
  menuOpen: false
}

const actions = {
  SET_WINDOW_DIMENSION: "SET_WINDOW_DIMENSION",
  SET_MENU_OPEN: "SET_MENU_OPEN"
}

const reducer = (state, action) => {
  switch(action.type) {
    case actions.SET_WINDOW_DIMENSION:
      return {
        ...state,
        windowWidth: action.windowWidth,
        windowHeight: action.windowHeight
      }
    case actions.SET_MENU_OPEN:
      return {
        ...state,
        menuOpen: action.menuOpen
      }
    default:
      return state;
  }
}

const store = createContext(initialState)
const { Provider } = store;

const TSSProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const value = {
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight,
    menuOpen: state.menuOpen,
    setWindowDimension: (value) => {
      dispatch({ 
        type: actions.SET_WINDOW_DIMENSION, 
        windowWidth: value.windowWidth,  
        windowHeight: value.windowHeight
      })
    },
    setMenuOpen: (menuOpen) => {
      dispatch({
        type: actions.SET_MENU_OPEN,
        menuOpen: menuOpen
      })
    }
  }

  return (
    <Provider value={value}>
      { children }
    </Provider>
  )
}

export { store, TSSProvider };