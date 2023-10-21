// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';

import { ConnectButton } from '@rainbow-me/rainbowkit';

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: "end" }}>
      <Grid container>
        <Grid item xs={6}> 
          <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            {hidden ? (
              <IconButton
                color='inherit'
                onClick={toggleNavVisibility}
                sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
              >
                <Menu />
              </IconButton>
            ) : null}
            {/* <Typography sx={{ mr: 2 }}>
              <Box component='span' >
                The protocol is currently under beta testing phase. 
              </Box>
            </Typography> */}
            {/* <TextField
              size='small'
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
            /> */}
          </Box>
        </Grid>
        <Grid item xs={6}> 
          <Stack direction="row" justifyContent="end" sx={{ marginBottom: 2, marginRight: 2, marginTop: 2 }}>
            <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
              {/* {hiddenSm ? null : (
                <Box
                  component='a'
                  target='_blank'
                  rel='noreferrer'
                  sx={{ mr: 4, display: 'flex' }}
                  href='https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free'
                >
                  <img
                    height={24}
                    alt='github stars'
                    src='https://img.shields.io/github/stars/themeselection/materio-mui-react-nextjs-admin-template-free?style=social'
                  />
                </Box>
              )} */}
              {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
              {/* <NotificationDropdown /> */}
              {/* <UserDropdown /> */}
              <ConnectButton />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AppBarContent
