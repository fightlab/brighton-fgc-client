import { createMuiTheme } from '@material-ui/core/styles'
import { deepOrange, orange } from '@material-ui/core/colors'

// Configure Material UI theme
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: deepOrange,
    accent: orange,
    type: 'dark'
  }
})

export default theme
