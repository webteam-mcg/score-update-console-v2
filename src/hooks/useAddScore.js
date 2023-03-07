import { useState } from "react";
import { doc, updateDoc, increment, collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../firebase/config";
import { useInning } from '../hooks/useInning';

export const useAddScore = () => {
    const [error, setError] = useState(null);
    const { balls, currentPlayer, addScore, player1, player2, inning, bowler, team } = useInning();

    const liveRef = doc(db, 'main', 'live');

    const updateScore = async (score) => {

        const currentBall = balls+1;
        const strickerName = (currentPlayer == "player1") ? player1 : player2;
        const isFour = (score == 4) ? 1 : 0;
        const isSix = (score == 6) ? 1 : 0;

        const battingQuery = query(collection(db, "batting"), where("inning", "==", inning), where("name", "==", strickerName));
        const bowlingQuery = query(collection(db, "bowling"), where("inning", "==", inning), where("name", "==", bowler));
        const inningQuery = query(collection(db, "innings"), where("inning", "==", inning), where("team", "==", team));

        await updateDoc(liveRef, {
            balls: increment(1),
            score: increment(score),
            "bowler.score": increment(score),
            "bowler.balls": increment(1),
            [`thisOver.${currentBall}`]: score,
            [`${currentPlayer}.score`]: increment(
              score
            ),
            [`${currentPlayer}.balls`]: increment(1)
        });

        const battingSnapshot = await getDocs(battingQuery);
        battingSnapshot.forEach(async (batiingDoc) => {
            await updateDoc(doc(db, "batting", batiingDoc.id), {
                balls: increment(1),
                score: increment(score),
                four: increment(isFour),
                six: increment(isSix)
            });
        });

        const bowlingSnapshot = await getDocs(bowlingQuery);
        bowlingSnapshot.forEach(async (bowlingDoc) => {
            await updateDoc(doc(db, "bowling", bowlingDoc.id), {
                balls: increment(1),
                score: increment(score)
            });
        });

        const inningSnapshot = await getDocs(inningQuery);
        inningSnapshot.forEach(async (inningDoc) => {
            await updateDoc(doc(db, "innings", inningDoc.id), {
                balls: increment(1),
                score: increment(score)
            });
        });

        addScore({
            balls: currentBall
        });
    }

    const addExtra = async (score, type) => {

        const currentBall = balls+1;
        const totalExtra = score+1;

        const bowlingQuery = query(collection(db, "bowling"), where("inning", "==", inning), where("name", "==", bowler));
        const inningQuery = query(collection(db, "innings"), where("inning", "==", inning), where("team", "==", team));

        await updateDoc(liveRef, {
            score: increment(totalExtra),
            "bowler.score": increment(totalExtra),
            [`thisOver.${currentBall}`]: type
        });

        const bowlingSnapshot = await getDocs(bowlingQuery);
        bowlingSnapshot.forEach(async (bowlingDoc) => {
            await updateDoc(doc(db, "bowling", bowlingDoc.id), {
                score: increment(score)
            });
        });

        const inningSnapshot = await getDocs(inningQuery);
        inningSnapshot.forEach(async (inningDoc) => {
            await updateDoc(doc(db, "innings", inningDoc.id), {
                score: increment(score)
            });
        });

        addScore({
            balls: currentBall
        });
    }

    const updateCurrentPlayer = async (player) => {

        await updateDoc(liveRef, {
            "currentPlayer": player
        });
    }

    return { 
        updateScore,
        addExtra, 
        updateCurrentPlayer,
        error 
    }
}