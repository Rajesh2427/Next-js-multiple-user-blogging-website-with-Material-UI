import { Box, Typography } from "@mui/material"
import Link from "next/link"


 function Footer()  {


 
  return (
    <Box  display={'flex'} marginTop='20px' flexWrap='wrap' justifyContent='space-between' width={'100%'} height='auto' backgroundColor='#272727'
    sx={{borderStartEndRadius:'50px'}}
    >

      <Box marginX={'50px'} height={'auto'} marginTop='10px' sx={{width:{xs:'100%', sm:'65%', md:'40%'} }}>
       <Typography variant="h2" color={'whitesmoke'}>
       About us
       </Typography>
       <Typography variant="body1" color={'whitesmoke'} className='aboutus'>
       Hey guys, This is Rajesh, A web developer. This platform was created to provide a space for individuals  to share their thoughts, ideas, and experiences with the world. With Site Name, users can easily create and manage your own blogs.
       </Typography>
      </Box>
       
      <Box  paddingTop='10px' display={'flex'} marginTop='10px' flexWrap='wrap' justifyContent='space-between' width={'100%'} height='auto' backgroundColor='black'  >
       
      <Box sx={{width:{xs:'100%', sm:'auto'}}} display={'flex'} alignItems='center' justifyContent={'center'} >
      <Link href={'/'}>
          <Typography  variant="auto" color={'white'} sx={{cursor:'pointer', '&:hover':{color:'primary.main'}}}>
          {`© ${new Date().getFullYear()} TrustedNews`}
          </Typography>
          </Link>
         </Box>


         <Box sx={{width:{xs:'100%', sm:'auto'}}} justifyContent='center' display={'flex'} marginY='10px'>
         
        <Link href={'/'}>
        <Typography  variant="auto" color={'white'} marginX='10px' sx={{cursor:'pointer', '&:hover':{color:'primary.main'}}}>Home</Typography>
        </Link>
        <Link href={'/terms&conditions'}>
        <Typography  variant="auto" color={'white'} marginX='10px' sx={{cursor:'pointer', '&:hover':{color:'primary.main'}}}>Terms & Conditions</Typography>
        </Link>
        <Link href={'/contactus'}>
        <Typography  variant="auto" color={'white'} marginX='10px' sx={{cursor:'pointer', '&:hover':{color:'primary.main'}}}>Contact us</Typography>
        </Link>
        
         
         </Box>

         

      </Box>
    </Box>
  )
}

export default Footer