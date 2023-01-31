import React, {useState} from 'react'
import { Box, TextField, Button, Collapse, Alert, IconButton, Typography, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Head from 'next/head';
import axios from 'axios';
import { ApiBaseUrl } from '../../utilities/api';

const forgetpassword = () => {

    const [user, setUser] = useState({
       email:''
    })

    const [alert, setalert] = useState({status:false, message:'', style:''})

    
  
      const handleSubmit = async (e) => {
        console.log(user.email)
        e.preventDefault()
        
    try{
      await axios.post(`${ApiBaseUrl}/users/forgetpassword`, user)
      .then((response) => {
      
        if(response.data.status === 'error'){
          setalert({status:true, message:response.data.message, style:'error'})
          return;
        }
        console.log('sumit clicked')
        console.log(response)
        setalert({status:true, message:'Password reset link sended', style:'success'})
       
        return;
      })
      .catch(error => {
        if(error.response.data.error){
          setalert({status:true, message:error.response.data.error, style:'error'})
          return;
        }
      //   setalert({status:true, message:error.response.data.message, style:'error'})
      //   // console.log(error.response.data)
      // })
      return
    })
  
    }catch(error){
      setalert({status:true, message:error.response.data.message, style:'error'})
      console.log(error.response.data.message)
     return;
    }
    
          return;
      }



  return (
    <div>
     <Head>
       <title>Forget Password - Site Name</title>
<meta name="keywords" content="Forget Password, Forget Password in trustednews.in, Site Name account reset password, best news website, write articles,"/>
<meta property="og:title" content="Forget Password - Site Name"/>
        </Head>

        <Box height={'80vh'}>
        <Collapse in={alert.status} sx={{marginBottom:'20px'}} >
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
  
    <Box display={'flex'} width='100%' justifyContent={'center'} >
 
         <Box  maxWidth={'500px'}   sx={{marginTop:{xs:'50px',}}}  >
          
                    
                    <form  onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'10px',width:'auto', }}>
                 
                    <Typography variant='h1'>Forget Password</Typography>
                 
                   <TextField color='secondary' fullWidth required label={'Email'} type='email' name='email' value={user.email} onChange={(e)=> setUser({email:e.target.value})} />
               
                 
                
                  <Button type='Submit' fullWidth variant='contained'> Submit</Button>
                 </form>
                    </Box>
       </Box>
        </Box>
    </div>
  )
}

export default forgetpassword