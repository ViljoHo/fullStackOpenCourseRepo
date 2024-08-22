import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#4E31AA',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'radial-gradient(circle, rgba(150,200,244,1) 0%, rgba(42,176,227,1) 23%, rgba(229,251,255,1) 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientAnimation 10s ease infinite',
          margin: 0,
          padding: 0,
          height: '100vh',
        },
        '@keyframes gradientAnimation': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '25% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      },
    },
  },
})

export default theme
