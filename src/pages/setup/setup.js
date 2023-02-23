import React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Dashboard from '../../components/Dashboard';
import { useMatchSetup } from "../../hooks/useMatchSetup";
import { useCollection } from '../../hooks/useCollection';
import { useInning } from '../../hooks/useInning';

export default function Setup() {

    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [bowler, setBowler] = useState('');

    const { setMatch } = useMatchSetup();
    const { team, field } = useInning();
    const { documents } = useCollection('players');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMatch(
            player1,
            player2,
            bowler
        )
    }


    return (
        <Dashboard>
            <Grid item xs={12} md={12} lg={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                 <Box
                    sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" gutterBottom>
                    Inning Setup
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <InputLabel id="team-label">Player 1</InputLabel>
                    <Select
                        labelId="team-label"
                        id="team-select"
                        required
                        fullWidth
                        value={player1}
                        label="Team"
                        onChange={(e) => setPlayer1(e.target.value)}
                    >
                        {documents && team && documents.filter(player => player.team === team).map((player) => (
                            <MenuItem 
                                value={player.playerName}
                                key={player.id}
                            >
                                    {player.playerName}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel id="team-label">Player 2</InputLabel>
                    <Select
                        labelId="team-label"
                        id="team-select"
                        required
                        fullWidth
                        value={player2}
                        label="Team"
                        onChange={(e) => setPlayer2(e.target.value)}
                    >
                        {documents && team && documents.filter(player => player.team === team).map((player) => (
                            <MenuItem 
                                value={player.playerName}
                                key={player.id}
                            >
                                    {player.playerName}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel id="team-label">Bowler</InputLabel>
                    <Select
                        labelId="team-label"
                        id="team-select"
                        required
                        fullWidth
                        value={bowler}
                        label="Team"
                        onChange={(e) => setBowler(e.target.value)}
                    >
                        {documents && team && documents.filter(player => player.team === field).map((player) => (
                            <MenuItem 
                                value={player.playerName}
                                key={player.id}
                            >
                                    {player.playerName}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Start Inning
                    </Button>
                    </Box>
                    </Box>
                </Paper>
            </Grid>
        </Dashboard>
    )
}