import React,{useEffect, useState} from 'react'
import axios from "axios"
import { Box, Typography, Link } from '@mui/material'
import ComponentTitle from './ComponentTitle'
import { ApiBaseUrl } from "../utilities/api"

const PopularPosts = () => {


   const [posts, setPosts] = useState()
   useEffect(() => {
      
      axios.get(`${ApiBaseUrl}/posts/?limit=4`)
       .then((response)=> {
        setPosts([...response.data.data])
        // console.log(response.data.data)
        // console.log(posts)
        
      })
     
    }, [])

  return (
    <>
     <ComponentTitle title='Latest Posts'/>
    <Box width={'100%'} height='auto' marginTop={{xs:'20px', sm:'0px'}} display={'flex'} flexDirection={'row'} flexWrap='wrap' justifyContent={'center'}>
    
    
    {posts ? posts.map((post, i) =>(
      <Link underline='none' color='inherit' key={i} href={`/${post.slug}`} >
     <Box  marginLeft={{sm:'15px'}} marginBottom={'15px'} width={'100%'} display={'flex'} justifyContent={'center'}
     sx={{'&:hover':{'.postTitle':{color:'primary.main'}}, }}
     >
     <img src={post.featuredImage}
      width={'100px'} height={'70px'} alt='image' style={{borderRadius:'4px'}}/>
      <Box marginLeft={'10px'} >
         <Typography className='postTitle' variant='body2' fontWeight='bold'>
             {post.title}
         </Typography>
         <Typography variant='caption'>
            {new Date(post.createdAt).toDateString()}
         </Typography>
      </Box>
 </Box>
 </Link>

    )) : null}
     
     </Box>

     </>
  )
}

export default PopularPosts