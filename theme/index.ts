import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import { backdropClasses } from '@mui/material';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: '#5D6ED7',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation:0,
      },
    
      styleOverrides: {
        root: {
          backgroundColor: '#2A528A',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          padding:'0 5px'
        }
      }
    }
  }
});

export default theme;

// pallete in order dsc
// #2A528A
// #5D6EC7
// #9F71DB
// #E9D498