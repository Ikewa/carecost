import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00897b', // Teal - Represents Health & Wealth
      light: '#4ebaaa',
      dark: '#005b4f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff7043', // Coral - Use for "Buy" buttons or Alerts
      light: '#ffa270',
      dark: '#c63f17',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f6f8', // Light grey background (easier on eyes than pure white)
      paper: '#ffffff',   // Cards will be white
    },
    text: {
      primary: '#1c2e36', // Dark Slate for main text
      secondary: '#546e7a', // Grey for subtitles
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    button: {
      textTransform: 'none', // Stops buttons from being ALL CAPS
      fontWeight: 600,
    },
  },
  components: {
    // Customize MUI Components globally here
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Modern rounded corners
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Soft, expensive-looking shadow
        },
      },
    },
  },
});

export default theme;