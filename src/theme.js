import { createMuiTheme } from 'material-ui/styles'
import { deepOrange, orange } from 'material-ui/colors'

// Configure Material UI theme
const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    accent: orange,
    type: 'dark'
  }
})

export default theme
