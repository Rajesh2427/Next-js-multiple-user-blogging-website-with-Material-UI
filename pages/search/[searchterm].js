import { Box, Grid, Typography, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Parser from "html-react-parser"
import axios from 'axios'
import { ApiBaseUrl } from '../../utilities/api'
const searchterm = () => {
    const router = useRouter()
    const [posts, setPosts] = useState(null)
    const [data, setData] = useState([1,2,3,4])
  
    const getData = async()=>{
      if(router.query.searchterm){
        await axios.get(`${ApiBaseUrl}/posts/search/${router.query.searchterm}`)
        .then(response => {
           setPosts(response.data.data)
          
           return;
        })
        .catch((error)=>{
          console.log(error)
        })
      }
     
    }
    // console.log(posts)
  useEffect(()=>{
    getData()
    
  },[router.query.searchterm])
  
if(!posts) return <h1>Loading</h1>
  return (
   <>
    <Head>
       <title>Search content - Site Name</title>
<meta name="keywords" content="Search, Search in trustednews.in, Site Name search bar, best news website, search articles,"/>
<meta property="og:title" content="Search - Site Name"/>
        </Head>
   <Box>
     <Grid container width={'100%'} height='100vh' >
            <Grid width={'100%'} item xs={12} md={8} >
            { posts.length > 0 ?(
                <Box  width={'100%'} marginBottom={2} >
                <Typography variant='h1' color={'gray'} style={{display:'inline-block'}}>Results for</Typography> 
                <Typography variant='h1' style={{display:'inline', wordWrap:'break-word'}} >{router.query.searchterm}</Typography>
                 </Box>
                 ):null}
                 
 { posts.length > 0 ? posts.map((post)=>{
 
           return (
                 <Box key={post._id} width='100%' height='auto' marginBottom={2} paddingBottom={1} borderBottom={'3px solid grey'}>
                    <Box>
                              <Typography variant='body2' style={{display:'inline', marginLeft:'20px'}}>
                               {post.author.userName}
                              </Typography>
                              <Typography variant='body2' style={{display:'inline', marginLeft:'20px'}}>
                               {new Date(post.createdAt).toDateString()}
                              </Typography>
                    </Box>
                
                    <Box width={'100%'} display={'flex'} flexDirection='row' justifyContent={'space-between'} >
                        <Box width={'100%'}   >
                        <Typography variant='h2'>
                        {post.title}
                        </Typography>
                     <Typography variant='body1' style={{textOverflow:'ellipsis', overflow:'hidden', height:'50px'}}>
                    {Parser(post.content)}
                     </Typography>
                        </Box>
                        
                        <Box   width={{xs:'100px', sm:'150px', md:'200px'}} height={{xs:'60px', sm:'80px', md:'100px'}} >
                               <img src={post.featuredImage} style={{objectFit:'cover'}} width={'100%'} height='100%' 
                              
                               />
                        </Box>
                        
                   
                     </Box>
                      
                      <Box width={'100%'}>
                        <Link href={`/category/${post.category}`} sx={{textDecoration:'none', cursor:'pointer'}}>
                        <Box width={'max-content'} borderRadius='20px' padding={1}  style={{backgroundColor:'#E6E6E6'}}>{post.category}</Box>
                        </Link>
                               
                      </Box>
                 </Box>
                 )
               }):(
                <Box  width={'100%'} marginBottom={2} >
                <Typography variant='h1' color={'gray'} style={{display:'inline-block'}}> No Results found for</Typography> 
                <Typography variant='h1' style={{display:'inline', wordWrap:'break-word'}} >{router.query.searchterm}</Typography>
                 </Box>
               )}
            </Grid>





            <Grid item xs={12} md={4} style={{border:'1px solid black'}}>

            </Grid>
     </Grid>
   </Box>
   </>
  )
}

export default searchterm