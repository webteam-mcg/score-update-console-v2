import { createContext, useReducer } from 'react';

export const InningContext = createContext()

const inningReducer = (state, action) => {
  switch (action.type) {
    case 'SETUP_INNING':
        return {
            ...state,
            team: action.payload.team,
            inning: action.payload.inning
        }
    default:
        return state
  }
}

export function InningProvider({ children }) {
  const [state, dispatch] = useReducer(inningReducer, {
    team: '',
    inning: ''
  })

  const setupInning = (inning) => {
    dispatch({ type: 'SETUP_INNING', payload: inning })
}

  return (
    <InningContext.Provider value={{...state, setupInning}}>
      {children}
    </InningContext.Provider>
  )
}