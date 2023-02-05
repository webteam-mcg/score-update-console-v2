import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';

import Dashboard from '../../components/Dashboard';
import { useInningSelector } from '../../hooks/useInningSelector';

export default function Innings() {

    const { setInning } = useInningSelector();

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
                        Innings
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginLeft={20}>
                            <Grid xs={6} bgcolor="primary">
                                <Button variant="contained" size="large" onClick={e => setInning("MCG", 1)}>
                                    Start MCG First Inning
                                </Button>
                            </Grid>
                            <Grid xs={6}>
                                <Button variant="contained" size="large" onClick={e => setInning("MCG", 2)}>
                                    Start MCG Second Inning
                                </Button>
                            </Grid>
                            <Grid xs={6}>
                                <Button variant="contained" size="large" onClick={e => setInning("RCG", 1)}>
                                    Start RCG First Inning
                                </Button>
                            </Grid>
                            <Grid xs={6}>
                                <Button variant="contained" size="large" onClick={e => setInning("RCG", 2)}>
                                    Start RCG Second Inning
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Dashboard>
    )
}