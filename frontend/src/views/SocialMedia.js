// ** MUI Imports
import Box from '@mui/material/Box'
// import Button from "src/views/Button.js";
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CopyrightIcon from '@mui/icons-material/Copyright';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography'
// import { makeStyles } from "@material-ui/core/styles";
// import basicsStyle from "/styles/jss/nextjs-material-kit-pro/pages/componentsSections/basicsStyle.js";

// const useStyles = makeStyles(basicsStyle);

const SocialMedia = () => {
  return (
    <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          mx: 'auto',
          marginBottom: 10,
          marginRight: 10,
        }}>

      {/* // <Box sx={{ mx: 'auto', marginBottom: 2 }}> */}
      {/* <Button color="twitter" justIcon>
        <i className="fab fa-twitter" />
      </Button> */}
      <Stack>
        <Stack direction='row' spacing={2}>
          <IconButton aria-label="Telegram" href="https://telegram.org/">
            <TelegramIcon color="info" fontSize="medium"/>
          </IconButton>
          <IconButton aria-label="Github" href="https://github.com/pulkitnsit/deepbook-maxi">
            <GitHubIcon color="info" fontSize="medium"/>
          </IconButton>
        </Stack>
        <Divider variant="middle" />
        <Stack direction='row' spacing={1}>
          <CopyrightIcon fontSize='small'/>
          <Typography variant='body2' sx={{ mt: 1 }}>2022 DeepBook Maxi</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SocialMedia
