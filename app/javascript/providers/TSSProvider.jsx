import React, {createContext, useReducer} from 'react';

const initialState = {
  windowWidth: 1024,
  windowHeight: 768
}

const actions = {
  SET_WINDOW_DIMENSION: "SET_WINDOW_DIMENSION"
}

const reducer = (state, action) => {
  switch(action.type) {
    case actions.SET_WINDOW_DIMENSION:
      
      return {
        ...state,
        windowWidth: action.windowWidth,
        windowHeight: action.windowHeight
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
    setWindowDimension: (value) => {
      dispatch({ 
        type: actions.SET_WINDOW_DIMENSION, 
        windowWidth: value.windowWidth,  
        windowHeight: value.windowHeight
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