import { Box, TextField, Button, Collapse, Alert, IconButton, Typography, Link } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Head from 'next/head';
import axios from 'axios'
import { useRouter } from "next/router";
import React, {useState} from 'react'
import { authenticate } from '../../utilities/token'
import { ApiBaseUrl } from '../../utilities/api'
const login = () => {
  const router = useRouter();
    const [user, setUser] = useState({
       
        email:'',
        password:'',
    })

    const [alert, setalert] = useState({status:false, message:'', style:''})
    const handleChange = (e) => {
      setUser({
        ...user,
        [e.target.name] : e.target.value
      })
        return
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      
  try{
    await axios.post(`${ApiBaseUrl}/users/signin`, user)
    .then((response) => {
      // console.log(response.data)
      setalert({status:true, message:'Login Successfull. You will be redirected to Homepage', style:'success'})
      authenticate(response.data, setTimeout(()=> {
          router.push('/')
      }, 3000))
      
    })
    .catch(error => {
      if(error.response.data.error){
        setalert({status:true, message:error.response.data.error, style:'error'})
        return;
      }
      setalert({status:true, message:error.response.data.message, style:'error'})
      // console.log(error.response.data)
    })


  }catch(error){
   return;
  }
      
  
        return
    }
    
   
  return (
    <>
    <Head>
        <title>Login - Site Name</title>
<meta name="keywords" content="Login, Login to trustednews, Site Name account login, best news website, write articles,"/>
<meta property="og:title" content="Login - Site Name"/>

        </Head>

    <Collapse in={alert.status}  marginBottom='20px'>
        <Alert variant="filled" severity={alert.style || "warning"}>
        {alert.message}
        <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setalert({...alert, status:false});
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>

      </Alert>
   </Collapse>
  
    <Box minHeight={'70vh'} display={'flex'} width='100%' justifyContent={'center'} >
    
   

 
         <Box  maxWidth={'500px'}   sx={{marginTop:{xs:'50px',}}}  >
          
                    
                    <form  onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'10px',width:'auto', }}>
                 
                    <Typography variant='h1'>Login</Typography>
                 <TextField color='secondary' fullWidth required label={'E-mail'} type='email' name='email' value={user.email} onChange={handleChange} />
                 <TextField color='secondary' fullWidth required label={'Password'} type='password' name='password' value={user.password} onChange={handleChange} />
               
                 <Typography variant='body2'>
       <Link href='/user/forgetpassword' style={{textDecoration:'none'}}>
       Forget Password ?
       </Link>
                 </Typography>
                
                  <Button type='submit' fullWidth variant='contained'> LOGIN</Button>
                 </form>
                    </Box>
       </Box>
       </>
  
  )
}

export default login