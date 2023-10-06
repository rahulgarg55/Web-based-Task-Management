// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Your primary color
    },
    secondary: {
      main: '#ff6f61', // Your secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Your preferred font family
  },
  // Other theme configurations...
});

export default theme;
