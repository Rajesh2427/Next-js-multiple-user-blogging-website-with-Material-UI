
import { Stack, Box, Typography, Button, TextField, Grid, Alert, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useRef, useState } from 'react'
import { StorageReference } from 'firebase/storage';
import storage from '../../utilities/firebase'
import Compressor from 'compressorjs';
import { getDownloadURL,deleteObject, ref, uploadBytesResumable } from 'firebase/storage';

import { ApiBaseUrl } from '../../utilities/api'
import axios from 'axios'
import Head from 'next/head';

const Signup = () => {

const userImage = useRef(null)

 
    const [user, setUser] = useState({
        userName:'',
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        photo:''

    })
   const [imageUrl, setImageUrl] = useState('/demo-user.jpg')
   const  [userPhoto, setUserPhoto] = useState(null)
   const [uploadProgress, setUploadProgress] = useState(0)
   const [alert, setalert] = useState({status:false, message:'', style:''})

    const handleImage = () => {
        
        const file = userImage.current.files[0]
        
        
        if(file){
            // setUserPhoto(file)
            // console.log(file)
            const url = URL.createObjectURL(file)
            setImageUrl(url)
            // console.log(url)

            new Compressor(file, {
              quality: 0.5,
              success: (compressedResult) => {
                setUserPhoto(compressedResult)
              },
            });
        }
        
  }
  
  const handleRemoveImage = ()=>{
     if(user.photo !== ''){
    let imageRef = ref(storage, user.photo)

    deleteObject(imageRef).then(() => {
      // console.log('File deleted successfully');
    }).catch((error) => {
      // console.log(error)
    });

  }

    userImage.current.value = ''
    setUserPhoto(null)
    setImageUrl('/demo-user.jpg')
    setUser({
      ...user,
      photo:''
    })
    setUploadProgress(0)
    // console.log(imageUrl)
    // console.log(userPhoto)
  }


   const uploadImage = () =>{
    if(!userPhoto) return;
    
    const storageRef = ref(storage, `/files/user/${userPhoto.name}-${new Date().toUTCString()}`)
    const uploadTask = uploadBytesResumable(storageRef, userPhoto)
     uploadTask.on("state_changed",(snapshot)=>{
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setUploadProgress(progress)
      },
      (error)=> console.log(error),
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url => {
          setUser({
            ...user,
            photo:url
          })
          // console.log(url)
        })
      }
    
    
    )
   }

    const handleChange = (e) => {
        setUser({
            ...user,
        [e.target.name]: e.target.value
         })

    }

    const handleSubmit = async (e) => {
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
        if(user.photo === ''){
          setalert({status:true, message:'Upload your photo'})
            return;
           }
           
           
           try{
            await axios.post(`${ApiBaseUrl}/users/signup`, user)
            .then((response) => {
              
              setalert({status:true, message:response.data.message, style:'success'})
              setImageUrl('/demo-user.jpg')
              return;
            })
            // .catch(error => {
              

            // })
        
        
          }catch(error){
            if(error.response.data.message.userName === 1){
              setalert({status:true, message:'User Name already used by some, try different one', style:'error'})
              return;
            }
            if(error.response.data.message.email === 1){
              setalert({status:true, message:'This Email have already an Account ', style:'error'})
              return;
            }

            setalert({status:true, message:error.response.data.error, style:'error'})
              // console.log(error.response.data.message)
          }  
           
        
    }

   




  return (
    <Stack alignItems='center' width={'100%'} height='auto' paddingTop='50px' >
      <Head>
        <title>Create Account - Site Name</title>
<meta name="keywords" content="Signup, create account in trustednews.in, Site Name account signup, best news website, write articles,"/>
<meta property="og:title" content="Create Account - Site Name"/>

        </Head>
               <Typography variant='h1' style={{marginBottom:'10px'}}>Create Account</Typography>
        <Collapse in={alert.status}  sx={{marginBottom:'20px'}}>
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
            <Grid container  maxWidth='700px'   spacing={{xs:'5',sm:'5'}} >
              
               <Grid item width={'100%'} xs={12} sm={6} sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
               
               <Box display={'flex'} justifyContent='center' width={'100%'} marginBottom='20px'>
                <img src={imageUrl} width={'150px'} height='150px' style={{border:'1px solid black', borderRadius:'50%'}}/> 
                <input  onChange={handleImage} ref={userImage} type={'file'} accept='jpg' style={{display:'none'}}/>
            </Box>
            
            {uploadProgress > 0 ? <h6>uploaded {uploadProgress} %</h6> : null}
            <Box display={'flex'} justifyContent='center' gap={2}>
               {userPhoto === null ?
                <Button onClick={()=> userImage.current.click()} size='small' variant='outlined'>
                Choose Image
               </Button>
                  : null}

                  { userPhoto === null ? null:
               <Button startIcon={<CloseIcon/>} onClick={handleRemoveImage} name='remove'
                size='small' variant='outlined'>
                Remove Image
               </Button>
               
                   }
                 { userPhoto === null ? null:
               <Button size='small' variant='contained' onClick={uploadImage}>
               Upload
               </Button>
               }
            </Box>
               </Grid>

               <Grid item  xs={12} sm={6} sx={{marginTop:{xs:'20px', sm:'0px'}}}  >
                    
               <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'10px',paddingLeft:'50px', paddingRight:'50px'}}>
            
           
            <TextField color='secondary' fullWidth required label={'User Name'} type='text' name='userName' value={user.userName} onChange={handleChange} />
            <TextField color='secondary' fullWidth required label={'Name'} type='text' name='name' value={user.name} onChange={handleChange} />
            <TextField color='secondary' fullWidth required label={'E-mail'} type='email' name='email' value={user.email} onChange={handleChange} />
            <TextField color='secondary' fullWidth required label={'Password'} type='password' name='password' value={user.password} onChange={handleChange} />
            <TextField color='secondary' fullWidth required error={user.password !== user.confirmPassword}  label={'Confirm Password'} type='password' name='confirmPassword' value={user.confirmPassword} onChange={handleChange} />
            <p>
                {user.password !== user.confirmPassword ? 'confirm password must be same as password' : ''}
            </p>
           
             <Button type='submit' fullWidth variant='contained'> SIGN UP</Button>
            </form>
               </Grid>
            </Grid>
            
       
    </Stack>
  )
}

export default Signup

export const InputFeild = ({label, type, name,  onchange, value}) =>{
    return(
     <Box>
       <TextField  fullWidth label={label} type={type} name={name} required variant="outlined"  value={value} onChange={onchange}
        sx={{margin:'5px'}}
       />
     </Box>
    )
 }