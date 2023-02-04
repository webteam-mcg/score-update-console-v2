import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Dashboard from '../../components/Dashboard';
import { useFirestore } from '../../hooks/useFirestore';

export default function Players() {

    const [playerName, setPlayerName] = useState('');
    const [team, setTeam] = useState('');
    const [captain, setCaptain] = useState(false);
    const [wk, setWK] = useState(false);

    const { addDocument, response } = useFirestore('players');

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({
            playerName,
            team,
            captain,
            wk
        });
    }

    useEffect(() => {
        if (response.success) {
            setPlayerName('');
            setTeam('');
            setCaptain(false);
            setWK(false);
        }
      }, [response.success]);

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
                    Players
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="playerName"
                        label="Player Name"
                        name="playerName"
                        autoFocus
                        onChange={(e) => setPlayerName(e.target.value)}
                        value={playerName}
                    />
                    <InputLabel id="team-label">Team</InputLabel>
                    <Select
                        labelId="team-label"
                        id="team-select"
                        required
                        fullWidth
                        value={team}
                        label="Team"
                        onChange={(e) => setTeam(e.target.value)}
                    >
                        <MenuItem value={"MCG"}>MCG</MenuItem>
                        <MenuItem value={"RCG"}>RCG</MenuItem>
                    </Select>
                    <FormControlLabel
                        control={<Checkbox checked={captain} onChange={(e) => setCaptain(e.target.checked)} color="primary" />}
                        label="Captain"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={wk} onChange={(e) => setWK(e.target.checked)} color="primary" />}
                        label="Wicket Keeper"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add Player
                    </Button>
                    </Box>
                    </Box>
                </Paper>
            </Grid>
        </Dashboard>
    )
}