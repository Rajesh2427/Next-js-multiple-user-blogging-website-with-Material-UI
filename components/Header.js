import {colors, Box, IconButton, Stack, Typography,Button, ButtonGroup, TextField, Paper, Drawer, Hidden, Slide, Link } from "@mui/material"

import { useRouter } from "next/router";

import LoginIcon from '@mui/icons-material/Login';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoIcon from '@mui/icons-material/Info';
import RecentActorsIcon from '@mui/icons-material/RecentActors';


import {primaryMenu, secondaryMenu} from '../utilities/menuList'
import SearchBar from "./SearchBar";
import styles from '../styles/Header.module.css'
import { useState } from "react";
import { isAuthorized, signOutClientSide } from "../utilities/token";


function Header () {
const router = useRouter();
const [search , setsearch] = useState(false)
const [drawer , setDrawer] = useState(false)

let data = isAuthorized()

const signOut = () =>{
  signOutClientSide(()=>{
    router.push('/user/login')
  })
}
  return (
  <>
    <Stack position={'static'} direction='column'
    alignItems="center">
      
  <Box  width={'100%'} paddingY='5px' display={'flex'} direction="row"  justifyContent="space-between" > 
      <Box display={'flex'}  >
        <Box width={{xs:'150px', sm:'200px'}} height='100%'  display={'flex'} alignItems='center'
         >
          <Link href="/">
          <img width={'100%'} height='auto' src='/Headerlogo.png'/>
          </Link>
          
        
        
        </Box>
       
      </Box >
      
    <Hidden smDown>
    <Box display={'flex'} flexDirection='row' gap={5} width={'100%'} height={'auto'} alignItems='center' justifyContent={'end'} >
      <Box width={'100%'} height={'50px'}  display='flex' flexDirection={'row'} alignItems='center' justifyContent='end'>
         <Link id="navLink" href="/" sx={{textDecoration:'none', fontWeight:'bold', marginRight:'15px', '.hover':{color:'black'},}}>
          Home
         </Link>
         <Link id="navLink" href="/terms&conditions" style={{textDecoration:'none', fontWeight:'bold', marginRight:'15px'}}>
         Terms & Conditions
         </Link>
         <Link id="navLink" href="/contactus" style={{textDecoration:'none', fontWeight:'bold', marginRight:'15px'}}>
          Contact us
         </Link>
         <Link id="navLink" href="/aboutus" style={{textDecoration:'none', fontWeight:'bold', marginRight:'15px' }}>
         About us
         </Link>
         
         
      </Box>
    <Box height={'50px'} display='flex' alignItems={'center'} >
    {isAuthorized() === false ?
      <ButtonGroup size="small" sx={{margin:'0px', }}>
        
        <Button startIcon={<LoginIcon/>}  variant="outlined" onClick={(e)=> router.push('/user/login') } 
         sx={{width:'max-content', borderRadius:'40px', padding:'7px'}}  aria-label="Login"
        >Login</Button>
        <Button  variant="contained" onClick={(e)=> router.push('/user/signup')}
        sx={{width:'max-content', borderRadius:'40px', padding:'7px'}}  aria-label="Sign up"
        >Sign Up</Button>
      </ButtonGroup>
      : null}
      {data  ?(
        <Box display='flex' gap alignItems={'center'} >
          <Link href={`/user/dashboard`} style={{display:'flex', textDecoration:'none'}}>
          <Button startIcon={<ManageAccountsIcon/>}></Button>
          <img src={data.photo} width={'50px'}  height='50px' style={{borderRadius:'50%'}} />
          </Link>
            
            <Button onClick={signOut} variant="outlined" style={{width:'max-content', borderRadius:'50px', paddingX:'5px', height:'40px'}}>Sign out</Button> 
        </Box>
       
      
      ): null}
     </Box>
     </Box>
    </Hidden>
      <Hidden smUp>
       <IconButton onClick={()=> setDrawer(true)}  aria-label="Menu">
      <MenuIcon/>
      </IconButton>
      </Hidden>
   </Box> 
   
   <Stack paddingX={{md:'50px',lg:'150px'}} width='100%' direction={'row'} justifyContent='space-between' >
   <Hidden smDown>
   <Box paddingTop={2}  display={'flex'} justifyContent='center' gap={3} width={'auto'} >
       
       
    </Box>
  
    <Slide direction="left" in={search} mountOnEnter unmountOnExit>
     <Box justifySelf={'flex-end'} ><SearchBar/></Box>
    </Slide>
    <Button style={{borderRadius:'50px'}} variant="outlined" sx={{marginRight:'0px'}}  aria-label="Search" onClick={()=> setsearch(!search)}>
      {!search ? <SearchIcon/>: <CloseIcon/> }
    </Button>
    </Hidden>
    
   </Stack>
   
    </Stack>

   {/* For Mobile devices */}

    <Drawer  anchor="right" open={drawer} onClose={()=> setDrawer(false)}>
    <Slide direction="left" in={search} mountOnEnter unmountOnExit>
     <Box justifySelf={'flex-end'} marginTop='20px' ><SearchBar/></Box>
    </Slide>
    <IconButton disableRipple  onClick={()=> setsearch(!search)}>
      {!search ? <SearchIcon/>: <CloseIcon/> }
    </IconButton>



   <Box marginTop={'20px'}  onClick={()=> setDrawer(false)} display={'flex'} flexDirection={'column'} justifyContent='space-around' width={'70vw'} height={'100%'} 
   style={{positon:'relative'}}
   >
       
   {isAuthorized() === false ?
      <ButtonGroup size="small" sx={{margin:'20px', }}>
        <Typography>
          
        </Typography>
  
        <Button startIcon={<LoginIcon/>}  variant="outlined" onClick={(e)=> router.push('/user/login') } 
         sx={{borderRadius:'40px', padding:'7px'}}  aria-label="Login"
        >Login</Button>

        <Button  variant="contained" onClick={(e)=> router.push('/user/signup')}
        sx={{borderRadius:'40px', padding:'7px'}}  aria-label="Sign up"
        >Sign Up</Button>

      </ButtonGroup>
      : null}

         {/* //categories */}

         <Box display={'flex'} flexDirection={'column'} gap paddingLeft='10px' width={'100%'} height={'100%'}>
          <Link href='/' style={{textDecoration:'none'}}>
          <Button  className="scaleElement" startIcon={<HomeIcon/>} sx={{'.hover':{backgroundColor:'primary.light', border:'1px solid black', maxWidth:'150px'}, backgroundColor:'primary.light'}}>Home</Button>
          </Link>
          <Link href='/terms&conditions' style={{textDecoration:'none'}}>
          <Button  className="scaleElement" startIcon={<MenuBookIcon/>} sx={{'.hover':{backgroundColor:'primary.light', border:'1px solid black', maxWidth:'150px'}, backgroundColor:'primary.light'}}>Terms & Conditions</Button>
          </Link>
          
          <Link href='/aboutus' style={{textDecoration:'none'}}>
          <Button  className="scaleElement" startIcon={<InfoIcon/>} sx={{'.hover':{backgroundColor:'primary.light', border:'1px solid black', maxWidth:'150px'}, backgroundColor:'primary.light'}}>Aboutus</Button>
          </Link>
          <Link href='/contactus' style={{textDecoration:'none'}}>
          <Button  className="scaleElement" startIcon={<RecentActorsIcon/>} sx={{'.hover':{backgroundColor:'primary.light', border:'1px solid black', maxWidth:'150px'}, backgroundColor:'primary.light'}}>Contact us</Button>
          </Link>
         </Box>





      {data  ?(
        <Box display='flex' paddingBottom={'10px'} width={'100%'} gap  flexDirection={'row'} justifyContent='space-between'
         style={{position:'absolute', bottom:'0'}}
         
         >
          <Link href={`/user/dashboard`} style={{display:'flex', textDecoration:'none'}}>
          <Button startIcon={<ManageAccountsIcon/>}></Button>
          <img src={data.photo} width={'50px'}  height='50px' style={{borderRadius:'50%'}} />
          </Link>
            
            <Button onClick={signOut} variant="outlined" style={{borderRadius:'50px', paddingX:'5px', height:'40px'}}>Sign out</Button> 
        </Box>
       
      
      ): null}
 
 </Box>
 
    </Drawer>
</>
  )
}

export default Header