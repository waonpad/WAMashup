import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';

import { Box, Typography, Button, CircularProgress } from '@mui/material';

const ErrorFallback = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Typography variant='h2' fontWeight='bold'>Ooops, something went wrong :(</Typography>
            <Button sx={{mt: 4}} onClick={() => window.location.assign(window.location.origin)}>
                Refresh
            </Button>
        </Box>
    );
};

type AppProviderProps = {
    children: React.ReactNode;
};
  
export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense
            fallback={
                <Box
                    sx={{
                        height: '100vh',
                        width: '100vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <CircularProgress />
                </Box>
            }
        >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Router>{children}</Router>
            </ErrorBoundary>
        </React.Suspense>

    )
};