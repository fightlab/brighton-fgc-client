import {
  createMuiTheme
} from '@material-ui/core/styles'
import { deepOrange, orange } from '@material-ui/core/colors'

export class MetaService {
  static toTitleCase (str = '') {
    const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i
    return str.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, (match, index, title) => {
      if (index > 0 && index + match.length !== title.length &&
        match.search(smallWords) > -1 && title.charAt(index - 2) !== ':' &&
        (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
        title.charAt(index - 1).search(/[^\s-]/) < 0) {
        return match.toLowerCase()
      }

      if (match.substr(1).search(/[A-Z]|\../) > -1) {
        return match
      }

      return match.charAt(0).toUpperCase() + match.substr(1)
    })
  }

  static tableDarkThemePadding () {
    return createMuiTheme({
      typography: {
        useNextVariants: true
      },
      palette: {
        primary: deepOrange,
        accent: orange,
        type: 'dark'
      },
      overrides: {
        MuiTableCell: {
          root: {
            padding: '4px',
            textAlign: 'center'
          }
        },
        MUIDataTableHeadCell: {
          fixedHeader: {
            backgroundColor: 'inherit'
          }
        },
        MUIDataTableViewCol: {
          label: {
            color: '#FFF'
          },
          title: {
            color: '#FFF'
          }
        },
        MUIDataTableFilter: {
          title: {
            color: '#FFF'
          },
          resetLink: {
            color: deepOrange[600],
            backgroundColor: 'inherit'
          }
        }
      }
    })
  }

  static getImage (player) {
    if (player.imageUrl) return player.imageUrl
    return `https://www.gravatar.com/avatar/${player.emailHash}?d=robohash`
  }
}
