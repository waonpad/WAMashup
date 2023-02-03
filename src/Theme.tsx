import { createTheme, ThemeProvider } from '@mui/material/styles';

export const globalTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        // mode: 'dark',
        // primary: {
        //     main: green[400],
        //     contrastText: '#fff'
        // },
        background: {
            default: '#f5f5f5',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                'img': {verticalAlign: 'bottom'}
            }
        },
    }
});