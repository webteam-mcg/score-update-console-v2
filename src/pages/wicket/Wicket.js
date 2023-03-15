import React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Dashboard from '../../components/Dashboard';
import { useInning } from '../../hooks/useInning';
import { useCollection } from '../../hooks/useCollection';
import { useAddWicket } from "../../hooks/useAddWicket";

export default function Wicket() {

    const { player1, player2, currentPlayer, team, field } = useInning();
    const { addWicket } = useAddWicket();

    const [striker, setStriker] = useState(currentPlayer);
    const [wicketType, setWicketType] = useState('');
    const [takenBy, setTakenBy] = useState('');
    const [newPlayer, setNewPlayer] = useState('');

    const { documents } = useCollection('players');

    const handleSubmit = (e) => {
        e.preventDefault();
        addWicket(
            wicketType,
            newPlayer,
            striker,
            takenBy
        )
    }

    return (
        <Dashboard>
            <Grid item xs={12} md={12} lg={12}>
                <Paper
                    sx={{
                        p: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                        component="form" 
                        onSubmit={handleSubmit}
                    >
                        <Typography component="h1" variant="h5" gutterBottom>
                            Wicket
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
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
                                        onChange={e => setStriker(e.target.value)}
                                    >
                                        <FormControlLabel value="player1" control={<Radio />} label={player1} />
                                        <FormControlLabel value="player2" control={<Radio />} label={player2} />
                                    </RadioGroup>  
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <InputLabel id="team-label">Wicket Type</InputLabel>
                                <Select
                                    labelId="team-label"
                                    id="team-select"
                                    required
                                    fullWidth
                                    value={wicketType}
                                    label="Team"
                                    onChange={(e) => setWicketType(e.target.value)}
                                >
                                    <MenuItem value={"b"}>Bowled</MenuItem>
                                    <MenuItem value={"c"}>Caught</MenuItem>
                                    <MenuItem value={"run"}>Run Out</MenuItem>
                                    <MenuItem value={"st"}>Stumping</MenuItem>
                                    <MenuItem value={"lbw"}>LBW</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="team-label">Taken By</InputLabel>
                                    <Select
                                        labelId="team-label"
                                        id="team-select"
                                        required
                                        fullWidth
                                        value={takenBy}
                                        label="Team"
                                        onChange={(e) => setTakenBy(e.target.value)}
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="team-label">New Player</InputLabel>
                                <Select
                                    labelId="team-label"
                                    id="team-select"
                                    required
                                    fullWidth
                                    value={newPlayer}
                                    label="Team"
                                    onChange={(e) => setNewPlayer(e.target.value)}
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
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Add Wicket
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Dashboard>
    )
}