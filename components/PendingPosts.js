import React, { useEffect, useState } from 'react'
import PublishIcon from '@mui/icons-material/Publish';
import { Box, Typography, Link, Button, } from '@mui/material'
import { useRouter } from 'next/router'
import { ApiBaseUrl } from '../utilities/api'
import { getCookie } from '../utilities/token';
import { isAuthorized } from '../utilities/token';
import axios from 'axios';

import { revalidate } from '../utilities/token';


const PendingPosts = () => {

    const user = isAuthorized()
   
    const [posts, setPosts] = useState(null)
     const router = useRouter()


  const getPosts = async ()=>{
  await fetch(`${ApiBaseUrl}/posts/?isPublished=false`)
   .then(res => res.json())
    .then(data => {
    setPosts(data.data)
     })
     .catch(err => console.log(err))
   }

useEffect(()=>{
    if(!user){
        router.push('/user/login')
        return;
    }else{
        getPosts()
    }
   
},[])


const token = getCookie('token')
    console.log(token)
    const headers = {
        "authorization": `Bearer ${token}`
    };
    console.log(headers)

 const handlePublish = async (id, title, category) =>{ 
  
    await axios.post(`${ApiBaseUrl}/posts/publish/${id}`,{}, {
        headers
    })
    .then(response => response.data)
    .then(data => {
        revalidate()
         revalidate(`category/${category}`)
        alert(`${data.message} - ${title}`)
        return
    })

    .catch(err => console.log(err))
    }
  
  return (
    <Box>
         <Typography variant='h2'>
             Not Published
         </Typography>
         {posts && posts.length > 0 ? posts.map((post)=>{
    return (
      
        <Box key={post._id} className='scaleElement'  marginBottom='5px' display={'flex'}  justifyContent={'space-between'} width={'100%'} height={'auto'}  sx={{flexDirection:{xs:'column', sm:'row'}}}>
            <Box width={{xs:'200px'}} height={{xs:'100px'}}  sx={{alignSelf:{xs:'flex-start',sm:'center'}}}>
                <img src={post.featuredImage} width={'100%'} height={'100%'} style={{borderRadius:'5px'}}/>
            </Box>
            <Box display={'flex'} flexDirection='row' justifyContent={'space-between'} width={'100%'} height={'auto'} >
             <Typography variant='h2'>
                 {post.title}
             </Typography>
             <Box display={'flex'} flexDirection='row' flexWrap={'nowrap'} style={{flexWrap:{xs:'wrap', sm:'nowrap'}}}>
                
                <Button onClick={()=>handlePublish(post._id, post.title, post.category)} color='info' startIcon={<PublishIcon/>}>Publish</Button>
                
             </Box>
             </Box>
         </Box>
        
            )
        }) : null}

    </Box>
  )
}


export default PendingPosts