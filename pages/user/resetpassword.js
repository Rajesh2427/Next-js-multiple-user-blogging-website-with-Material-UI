import { Box, Alert, Collapse, IconButton, Button, Typography, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React,{useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ApiBaseUrl } from '../../utilities/api'


const resetpassword = () => {
 
  const router = useRouter()
  const data = router.query
   console.log(router.query)

   const [user, setUser] = useState({
   password:'',
    confirmPassword:'',
     })
  
  
    const [alert, setalert] = useState({status:false, message:'', style:''})

    // const verify = async () =>{
    //   console.log(data.token)
    //   if(!router.query.token){
    //     setalert({status:true, message:'Invalid Url or Token not found', style:'error'})
    //     return;
    //   }
    //     try{
    //      axios.get(`${ApiBaseUrl}/users/resetpassword/${router.query.token}`)
    //     .then((response)=>{
    //       console.log(response)
    //       if(response.data.status === 'error'){
    //         setalert({status:true, message:response.data.message, style:'error'})
    //         return
    //       }
    //       if(response.data.status === 'success'){
    //        setalert({status:true, message:response.data.message, style:'success'})
          
    //         return
    //       }
            
    //     })
    //     .catch((error)=>{
    //         setalert({status:true, message:error.message, style:'error'})
    //         console.log(error)
    //         return;
    //     })
    //   }catch(error){
    //     setalert({status:true, message:error.message, style:'error'})
    //     console.log(error)
    //   }

    // }
 
const handleChange = (e) => {
        setUser({
          ...user,
          [e.target.name] : e.target.value
        })
          return
      }

 const handleSubmit = async (e) =>{
    e.preventDefault()
       
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;


    if(user.password.length < 8){
        setalert({status:true, message:'password must be at least 8 characters or more'})
        return;
    }
   if(user.password !== user.confirmPassword){
    setalert({status:true, message:'Password and confirm Password must be same'})
        return;
       }
  
       try{
        axios.post(`${ApiBaseUrl}/users/resetpassword/${router.query.token}`,{currentPassword: user.password})
       .then((response)=>{
         console.log(response)
         if(response.data.status === 'error'){
           setalert({status:true, message:response.data.message, style:'error'})
           return
         }
         if(response.data.status === 'success'){
          setalert({status:true, message:response.data.message, style:'success'})
          
           return
         }
           
       })
       .catch((error)=>{
           setalert({status:true, message:error.message, style:'error'})
           console.log(error)
           return;
       })
     }catch(error){
       setalert({status:true, message:error.message, style:'error'})
       console.log(error)
     } 

 }


  return (
    <Box minHeight={'60vh'}>
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
   
   <Box display='flex' width={'100%'} height='100%' justifyContent='center' alignItems='center'>
   <form  onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'10px',width:'auto', }}>
   <Typography variant='h1'>Set New Password</Typography>
                 <TextField color='secondary' fullWidth required label={'New Password'} type='password' name='password' value={user.password} onChange={handleChange} />
                 <TextField color='secondary' fullWidth required label={'Confirm Password'} type='password' name='confirmPassword' value={user.confirmPassword} onChange={handleChange} />
               
                 
                
                  <Button type='submit' fullWidth variant='contained'>Submit</Button>
                 </form>
   </Box>
    </Box>
  )
}

export default resetpassword