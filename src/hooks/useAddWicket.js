import { useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc, query, where, getDocs, increment, getCountFromServer } from "firebase/firestore";

import { db } from "../firebase/config";
import { useInning } from '../hooks/useInning';

export const useAddWicket = () => {
    const [error, setError] = useState(null);
    const { inning, team, bowler, player1, player2, updatePlayer1, updatePlayer2} = useInning();
    
    const addWicket = async (wicket, newPlayer, outPlayer, takenBy) => {

        const battingRef = collection(db, 'batting');
        const liveRef = doc(db, 'main', 'live');

        const inningQuery = query(collection(db, "innings"), where("inning", "==", inning), where("team", "==", team));
        const bowlingQuery = query(collection(db, "bowling"), where("inning", "==", inning), where("name", "==", bowler));

        let liveDoc = {};
        let outPlayerName = null;
        let outPlayerStatus = null;

        switch (wicket) {
            case "b":
                outPlayerStatus = "b " + bowler;
                break;
            case "c":
                outPlayerStatus = "c " + takenBy + " b " + bowler;
                break;
            case "run":
                outPlayerStatus = "run out(" + takenBy + ")";
                break;
            case "lbw":
                outPlayerStatus = "lbw b " + bowler;
                break;
            default:
                break;
        }

        const playerDoc = {
            timestamp: serverTimestamp(),
            team: team,
            inning: inning,
            name: newPlayer,
            balls: 0,
            score: 0,
            four: 0,
            six: 0,
            status: "not out"
        }

        if (outPlayer === "player1"){

            outPlayerName = player1
            liveDoc = {
                "player1.name": newPlayer,
                "player1.balls": 0,
                "player1.score": 0
            }
            updatePlayer1({
                player: newPlayer
            })
        }else {
            outPlayerName = player2
            liveDoc = {
                "player2.name": newPlayer,
                "player2.balls": 0,
                "player2.score": 0
            }
            updatePlayer2({
                player: newPlayer
            })
        }

        await updateDoc(liveRef, liveDoc)
        .catch(err => {
            setError(err.message);
        });

        await addDoc(battingRef, playerDoc)
        .catch(err => {
            setError(err.message);
        });

        const battingQuery = query(collection(db, "batting"), where("inning", "==", inning), where("name", "==", outPlayerName));
        const battingSnapshot = await getDocs(battingQuery);
        battingSnapshot.forEach(async (batiingDoc) => {
            await updateDoc(doc(db, "batting", batiingDoc.id), {
                status: outPlayerStatus
            });
        });

        const inningSnapshot = await getDocs(inningQuery);
        inningSnapshot.forEach(async (inningDoc) => {
            await updateDoc(doc(db, "innings", inningDoc.id), {
                balls: increment(1),
                wickets: increment(1)
            });
        });

        const bowlingSnapshot = await getDocs(bowlingQuery);
        bowlingSnapshot.forEach(async (bowlingDoc) => {
            await updateDoc(doc(db, "bowling", bowlingDoc.id), {
                balls: increment(1),
                wickets: increment(1)
            });
        });
    }

    return {
        addWicket,
        error
    }
}