import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Dashboard from '../../components/Dashboard';

export default function Home() {
    return (
        <Dashboard>
            <Grid item xs={12} md={12} lg={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                <Typography
                    variant="h6" 
                    color="textSecondary"
                    component="h2"
                    gutterBottom
                >
                    LQ.LK
                </Typography>
                </Paper>
            </Grid>
        </Dashboard>
    )
}