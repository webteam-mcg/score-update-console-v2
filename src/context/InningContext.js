import { createContext, useReducer, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import _ from 'lodash';

import { db } from "../firebase/config";

export const InningContext = createContext()

const inningReducer = (state, action) => {
  switch (action.type) {
    case 'SETUP_INNING':
        return {
            ...state,
            team: action.payload.team,
            field: action.payload.team === 'mcg' ? 'rcg':'mcg',
            inning: action.payload.inning
        }
      case 'SETUP_MATCH':
        return {
          ...state,
          player1: action.payload.player1,
          player2: action.payload.player2,
          bowler: action.payload.bowler
        }
      case 'INNING_IS_READY':
        return {
          ...state,
          inningIsReady: true,
          team: _.get(action.payload, 'team', null),
          inning: _.get(action.payload, 'inning', null),
          player1: _.get(action.payload, 'player1.name', null),
          player2: _.get(action.payload, 'player2.name', null),
          bowler: _.get(action.payload, 'bowler', null),
          field: _.get(action.payload, 'team', null) === 'mcg' ? 'rcg':'mcg',
        }
    default:
        return state
  }
}

export function InningContextProvider({ children }) {
  const [state, dispatch] = useReducer(inningReducer, {
    team: '',
    field: '',
    inning: '',
    player1: '',
    player2: '',
    bowler: '',
    inningIsReady: false
  })

  const setupInning = (inning) => {
    dispatch({ type: 'SETUP_INNING', payload: inning })
  }

  const setupMatch = (match) => {
    dispatch({ type: 'SETUP_MATCH', payload: match });
  }

  useEffect(() => {
  const unsub = onSnapshot(doc(db, "main", "live"), (doc) => {
      dispatch({ type: 'INNING_IS_READY', payload: doc.data() });
      unsub();
  });
  }, []);

  return (
    <InningContext.Provider value={{...state, setupInning, setupMatch}}>
      {children}
    </InningContext.Provider>
  )
}