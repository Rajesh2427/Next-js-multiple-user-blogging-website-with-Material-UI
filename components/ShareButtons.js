import { Box, IconButton } from "@mui/material"

import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

const ShareButtons = ({url}) => {
  
  return (
    <Box display={'flex'} flexDirection='column' width={"max-content"} backgroundColor={'#ededed'} style={{borderTopRightRadius:'10px', borderBottomRightRadius:'10px'}}>
    
   <FacebookShareButton url={url}>
   <IconButton className="scaleElement" >
    <FacebookIcon style={{color:'blue'}}/>
   </IconButton>
   </FacebookShareButton>
   <TwitterShareButton url={url}>
   <IconButton  className="scaleElement">
    <TwitterIcon style={{color:'#1DA1F2'}}/>
   </IconButton>
   </TwitterShareButton>
   <WhatsappShareButton url={url}>
   <IconButton  className="scaleElement">
    <WhatsAppIcon style={{color:'green'}}/>
   </IconButton>
   </WhatsappShareButton>
    </Box>
  )
}

export default ShareButtons