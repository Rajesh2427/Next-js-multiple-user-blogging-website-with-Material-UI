import { Box, Alert, Collapse, IconButton, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React,{useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ApiBaseUrl } from '../../utilities/api'
import { useSearchParams } from 'react-router-dom'

const verifyemail = () => {
 
  const router = useRouter()
  const data = router.query
   console.log(router.query)
  
    const [alert, setalert] = useState({status:false, message:'', style:''})
    const verify = async () =>{
      console.log(data.token)
      if(!router.query.token){
        setalert({status:true, message:'Invalid Url or Token not found', style:'error'})
        return;
      }
        try{
         axios.get(`${ApiBaseUrl}/users/verifyemail/?token=${router.query.token}`)
        .then((response)=>{
          console.log(response)
          if(response.data.status === 'error'){
            setalert({status:true, message:response.data.message, style:'error'})
            return
          }
          if(response.data.status === 'success'){
           setalert({status:true, message:'Email Verified. You will be redirected to Login Page', style:'success'})
           setTimeout(()=> {
                router.push('/user/login')
            }, 3000)
            return
          }
            
        })
        .catch((error)=>{
            setalert({status:true, message:error.message, style:'error'})
            console.log(error)
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
          <Button variant='contained' onClick={()=>{
            verify()
          }}>
            Verify Email address
          </Button>
   </Box>
    </Box>
  )
}

export default verifyemail