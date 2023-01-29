import { useReducer, useEffect, useState } from "react"
import { db } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
        return {success: false, isPending: true, error: null, document: null}
    case "ERROR":
        return {success: false, isPending: false, error: action.payload, document: null}
    case "ADDED_DOCUMENT":
        return {success: true, isPending: false, error: null, document: action.payload}
    default:
        return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = db.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }
  
  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
        const addedDocument = await ref.addDocument(doc);
        dispatchIfNotCancelled({ type: "ADDED_DOCUMENT"});
    }
    catch (err) {
        dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  }

  // delete a document
  const deleteDocument = async (id) => {

  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, []);

  return { addDocument, deleteDocument, response }

}