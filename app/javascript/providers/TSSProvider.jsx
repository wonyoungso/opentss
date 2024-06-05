import React, {createContext, useReducer} from 'react';
import defaultSubmission from "./default_submission";
import defaultCriteria from "./default_criteria";

const initialState = {
  windowWidth: 1024,
  windowHeight: 768,
  submissionStep: 1,
  submission: defaultSubmission,
  criteria: defaultCriteria,
  menuOpen: false,
  revisitedSubmission: {
    1: false,
    2: false,
    3: false, 
    4: false,
    5: false
  },
  headerMode: "normal",
  selectedScreeningDocument: null
}

const actions = {
  SET_WINDOW_DIMENSION: "SET_WINDOW_DIMENSION",
  SET_MENU_OPEN: "SET_MENU_OPEN",
  SET_SUBMISSION_STEP: "SET_SUBMISSION_STEP",
  SET_SUBMISSION: "SET_SUBMISSION",
  SET_CRITERIA: "SET_CRITERIA",
  SET_SELECTED_SCREENING_DOCUMENT: "SET_SELECTED_SCREENING_DOCUMENT",
  RESET_CRITERIA: "RESET_CRITERIA",
  SET_REVISITED_SUBMISSION: "SET_REVISITED_SUBMISSSION",
  RESET_SUBMISSION: "RESET_SUBMISSION",
  SET_HEADER_MODE: "SET_HEADER_MODE"

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
    case actions.SET_SUBMISSION_STEP:
      return {
        ...state,
        submissionStep: action.submissionStep
      }
    case actions.SET_SELECTED_SCREENING_DOCUMENT:
      return {
        ...state,
        selectedScreeningDocument: action.selectedScreeningDocument
      }
    case actions.SET_CRITERIA:
      return {
        ...state,
        criteria: action.criteria
      }
    case actions.RESET_CRITERIA:
      return {
        ...state,
        criteria: {...defaultCriteria},
      }
    case actions.SET_SUBMISSION:
      return {
        ...state,
        submission: action.submission
      }
    case actions.SET_REVISITED_SUBMISSION:
      return {
        ...state,
        revisitedSubmission: action.revisitedSubmission
      }
    
    case actions.RESET_SUBMISSION:
      return {
        ...state,
        submission: {...defaultSubmission, files: []},
        revisitedSubmission: {
          1: false,
          2: false,
          3: false, 
          4: false,
          5: false
        }
      }
    case actions.SET_HEADER_MODE:
      return {
        ...state,
        headerMode: action.headerMode
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
    submission: state.submission,
    submissionStep: state.submissionStep,
    criteria: state.criteria,
    selectedScreeningDocument: state.selectedScreeningDocument,
    revisitedSubmission: state.revisitedSubmission,
    headerMode: state.headerMode,
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
    },
    setSubmissionStep: (submissionStep) => {
      dispatch({
        type: actions.SET_SUBMISSION_STEP,
        submissionStep: submissionStep
      })
    },
    setCriteria: (criteria) => {
      dispatch({
        type: actions.SET_CRITERIA,
        criteria: criteria
      })
    },
    setSelectedScreeningDocument: (selectedScreeningDocument) => {
      dispatch({
        type: actions.SET_SELECTED_SCREENING_DOCUMENT,
        selectedScreeningDocument: selectedScreeningDocument
      })
    },

    resetCriteria: () => {
      dispatch({
        type: actions.RESET_CRITERIA
      })
    },
    setSubmission: (submission) => {
      dispatch({
        type: actions.SET_SUBMISSION,
        submission: submission
      })
    },
    setRevisitedSubmission: (revisitedSubmission) => {
      dispatch({
        type: actions.SET_REVISITED_SUBMISSION,
        revisitedSubmission: revisitedSubmission
      })
    },
    resetSubmission: () => {
      dispatch({
        type: actions.RESET_SUBMISSION
      })
    },
    setHeaderMode: (headerMode) => {
      dispatch({
        type: actions.SET_HEADER_MODE,
        headerMode: headerMode
      })
    },
  }

  return (
    <Provider value={value}>
      { children }
    </Provider>
  )
}

export { store, TSSProvider };