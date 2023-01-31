import { Box, Typography } from "@mui/material"

const ComponentTitle = ({title}) => {
  return (
    <Box width={'90%'} height={'25px'} borderBottom='2px solid black' marginBottom={'20px'}>
                <Typography variant='body1' width={'max-content'} paddingX='5px' fontWeight={'bold'} color='white' backgroundColor='black'>
                    {title}
                </Typography>
               </Box>
  )
}

export default ComponentTitle