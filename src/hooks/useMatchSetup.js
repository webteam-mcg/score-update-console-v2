import { useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { useInning } from "./useInning";


export const useMatchSetup = () => {
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const { team, inning, setupMatch } = useInning();

    const liveRef = doc(db, 'main', 'live');
    const battingRef = collection(db, 'batting');
    const bowlingRef = collection(db, 'bowling');

    const setMatch = async (player1, player2, bowler) => {

        const liveDoc = {
            "player1.name": player1,
            "player1.balls": 0,
            "player1.score": 0,
            "player2.name": player2,
            "player2.balls": 0,
            "player2.score": 0,
            "bowler.name": bowler,
            "bowler.score": 0,
            "bowler.balls": 0,
            "bowler.wickets": 0,
            "balls": 0,
            "wickets": 0,
            "score": 0,
            "currentPlayer": "player1",
            "thisOver": {}
        }

        const player1Doc = {
            timestamp: serverTimestamp(),
            team: team,
            inning: inning,
            name: player1,
            balls: 0,
            score: 0,
            four: 0,
            six: 0,
            status: "not out"
        }

        const player2Doc = {
            timestamp: serverTimestamp(),
            team: team,
            inning: inning,
            name: player2,
            balls: 0,
            score: 0,
            four: 0,
            six: 0,
            status: "not out"
        }

        const bowlerDoc = {
            timestamp: serverTimestamp(),
            team: team,
            inning: inning,
            name: bowler,
            balls: 0,
            score: 0,
            wickets: 0,
            maiden: 0
          }

        await updateDoc(liveRef, liveDoc)
        .catch(err => {
            setError(err.message);
        });

        await addDoc(battingRef, player1Doc)
        .catch(err => {
            setError(err.message);
        });

        await addDoc(battingRef, player2Doc)
        .catch(err => {
            setError(err.message);
        });

        await addDoc(bowlingRef, bowlerDoc)
        .catch(err => {
            setError(err.message);
        });

        setupMatch({
            player1: player1,
            player2: player2,
            bowler: bowler
        });
        navigate("/");
    }

    return { setMatch, error };
}