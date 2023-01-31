import { Box, TextField, Button, Collapse, Alert, IconButton, Typography, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import { useRouter } from "next/router";
import React, {useState} from 'react'
import { authenticate, getCookie, } from '../../utilities/token'
import { ApiBaseUrl } from '../../utilities/api'
import { removeLocalStorage, removeCookie } from '../../utilities/token';

const changepassword = () => {
    const router = useRouter();
    const [user, setUser] = useState({
       
        currentPassword:'',
        newPassword:'',
    })

    const [alert, setalert] = useState({status:false, message:'', style:''})

    const token = getCookie('token')
    // console.log(token)
    const headers = {
        "authorization": `Bearer ${token}`
    };
    // console.log(headers)
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
    await axios.post(`${ApiBaseUrl}/users/updatepassword`, user,{
        headers
    })
    .then((response) => {
      // console.log(response.data)
      setalert({status:true, message:'Your Password updated successfully, You will be redirected to Login page', style:'success'})
      removeCookie('token')
      removeLocalStorage('user')
      setTimeout(()=> {
          router.push('/user/login')
      }, 3000)
      
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
  
        return;
    }

  return (
    <>
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
  
    <Box display={'flex'} width='100%' height='70vh' justifyContent={'center'} >
    
   

 
         <Box  maxWidth={'500px'}   sx={{marginTop:{xs:'50px',}}}  >
          
                    
                    <form  onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'10px',width:'auto', }}>
                 
                    <Typography variant='h1'>Change Password</Typography>
                 <TextField color='secondary' fullWidth required label={'Existing Password'} type='password' name='currentPassword' value={user.currentPassword} onChange={handleChange} />
                 <TextField color='secondary' fullWidth required label={'New Password'} type='password' name='newPassword' value={user.newPassword} onChange={handleChange} />
               
                 
                
                  <Button type='submit' fullWidth variant='contained'> LOGIN</Button>
                 </form>
                    </Box>
       </Box>
       </>
  )
}

export default changepassword