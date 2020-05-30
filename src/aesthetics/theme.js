import { createMuiTheme } from '@material-ui/core';
// import { purple, orange, yellow } from '@material-ui/core/colors'

const primary = '#A6ACCD'
const secondary = '#3FBEB2'

const theme = createMuiTheme({
    palette: {
        secondary: {
          main: secondary,
          dark: secondary,
          light: secondary,
          text: secondary
        },
        primary: {
            main: primary,
            dark:primary,
            light:primary,
            text: primary
          }
        },
    overrides: {
      MuiOutlinedInput: {
        root: {
          position: 'relative',
          '& $notchedOutline': {
          borderColor: secondary,
          },
          '&:hover $notchedOutline': {
            borderColor: secondary,
            }
        }
      }
    }
})

export default theme
