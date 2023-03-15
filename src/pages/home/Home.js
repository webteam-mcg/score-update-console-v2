import React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";

import Dashboard from '../../components/Dashboard';
import { useInning } from '../../hooks/useInning';
import { useAddScore } from '../../hooks/useAddScore';

export default function Home() {

    const { player1, player2, currentPlayer, updateStriker } = useInning();
    const { updateScore, updateCurrentPlayer, addExtra, addWicket } = useAddScore();
    let navigate = useNavigate();

    const [extra, setExtra] = useState(0);
    const [striker, setStriker] = useState(currentPlayer);

    const handleStriker = (event) => {
        setStriker(event.target.value);
        updateStriker({
            player: event.target.value
        });
        updateCurrentPlayer(event.target.value);
    }

    return (
        <Dashboard>
            <Grid item xs={12} md={12} lg={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box 
                        sx={{ '& > :not(style)': { m: 2 } }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={striker}
                            onChange={handleStriker}
                        >
                            <FormControlLabel value="player1" control={<Radio />} label={player1} />
                            <FormControlLabel value="player2" control={<Radio />} label={player2} />
                        </RadioGroup>                        
                    </Box>
                    <Box 
                        sx={{ '& > :not(style)': { m: 2 } }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Fab color="primary" aria-label="score0" onClick={e => updateScore(0)}>
                            .
                        </Fab>
                        <Fab color="primary" aria-label="score1" onClick={e => updateScore(1)}>
                            1
                        </Fab>
                        <Fab color="primary" aria-label="score2" onClick={e => updateScore(2)}>
                            2
                        </Fab>
                        <Fab color="primary" aria-label="score3" onClick={e => updateScore(3)}>
                            3
                        </Fab>
                        <Fab color="primary" aria-label="score4" onClick={e => updateScore(4)}>
                            4
                        </Fab>
                        <Fab color="primary" aria-label="score5" onClick={e => updateScore(5)}>
                            5
                        </Fab>
                        <Fab color="primary" aria-label="score6" onClick={e => updateScore(6)}>
                            6
                        </Fab>
                    </Box>
                    <Box 
                        sx={{ '& > :not(style)': { m: 2 } }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Fab color="secondary" aria-label="wide" onClick={e => addExtra(extra, 'wd')}>
                            WIDE
                        </Fab>
                        <Fab color="secondary" aria-label="nb" onClick={e => addExtra(extra, 'nb')}>
                            NB
                        </Fab>
                        <Fab color="secondary" aria-label="b" onClick={e => addExtra(extra, 'b')}>
                            B
                        </Fab>
                        <Fab color="secondary" aria-label="lb" onClick={e => addExtra(extra, 'lb')}>
                            LB
                        </Fab>
                        <Select
                            labelId="team-label"
                            id="team-select"
                            label="Team"
                            value={extra}
                            onChange={(e) => setExtra(e.target.value)}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                        <Fab color="error" aria-label="w" onClick={e => addWicket()}>
                            W
                        </Fab>
                        <Fab color="warning" aria-label="over" onClick={e => navigate("/over")}>
                            OVER
                        </Fab>
                    </Box>
                </Paper>
            </Grid>
        </Dashboard>
    )
}