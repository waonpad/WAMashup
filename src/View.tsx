import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { appTheme } from './Theme';

type ViewProps = {
    children: React.ReactNode;
};

function View(props: ViewProps):React.ReactElement {
    const {children} = props;

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default View;