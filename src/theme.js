import { createMuiTheme } from 'material-ui/styles'
import indigo from 'material-ui/colors/purple'
import orange from 'material-ui/colors/orange'

// Configure Material UI theme
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    accent: orange,
    type: 'dark'
  }
})

export default theme
