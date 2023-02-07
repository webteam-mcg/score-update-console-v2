import { useState } from "react";
import { doc, setDoc, arrayUnion, addDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase/config";

const displayName = (team, inning) => {
    if (team === "mcg" && inning === 1) {
        return "MCG 1st Inning";
    } else if (team === "rcg" && inning === 1) {
        return "RCG 1st Inning";
    } else if (team === "mcg" && inning === 2) {
        return "MCG 2nd Inning";
    } else if (team === "rcg" && inning === 2) {
        return "RCG 2nd Inning";
    }
}

export const useInningSelector = () => {
    const [error, setError] = useState(null);

    const liveRef = doc(db, 'main', 'live');
    const docRef = doc(db, 'main', 'config');
    const inningsRef = collection(db, 'innings');
    
    const setInning = async (team, inning) => {

        const liveDoc = {
            team: team,
            inning: inning,
            thisOver: {},
            balls: 0,
            message: "",
            day: 1,
            score: 0,
            wickets: 0
        };

        const configDoc = {
            inningOrder: arrayUnion({
                team: team,
                inning: inning,
                displayName: displayName(team, inning)
            })
        }

        const inningDoc = {
            timestamp: serverTimestamp(),
            team: team,
            inning: inning,
            score: 0,
            wickets: 0,
            balls: 0,
            extra: {
              total: 0,
              b: 0,
              lb: 0,
              nb: 0,
              wd: 0
            }
        }

        await setDoc(liveRef, liveDoc)
        .catch(err => {
            setError(err.message);
        });

        await setDoc(
            docRef,
            configDoc, 
            { 
                merge:true 
            })
        .catch(err => {
            setError(err.message);
        });

        await addDoc(inningsRef, inningDoc)
        .catch(err => {
            setError(err.message);
        })
    }

    return { setInning, error };
}