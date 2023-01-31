import React from "react"

import { Box, Grid,  Avatar, Typography,  Stack } from "@mui/material"
import Head from "next/head"

import Parser from "html-react-parser"
import ShareButtons from "../components/ShareButtons"

import BreadcrumbsCustom from "../components/BreadcrumbsCustom"
import Comments from "../components/Comments"
import PopularPosts from "../components/PopularPosts"
import Tags from "../components/Tags"
import { ApiBaseUrl } from "../utilities/api"
import PostSkeleton from "../components/skeleton/PostSkeleton"

function Post ({post}){
  

  

 
 const getURL = (url) => {
    if(process.browser){
      return window.location.href
    }
 }
 let pageUrl = getURL()
 
   


 if(!post) return <PostSkeleton />
    return (
       <div key={post._id}>
        <Head>
        <title>{post.title} - Site Name</title>

<meta name="keywords" content={post.tags}/>
<meta property="og:title" content={`${post.title} - Example Website`}/>

        </Head>
       
    <Box height={'auto'}    position={'static'} marginTop={'20px'} paddingX={{xs:'5px', sm:'10px', md:'25px',lg:'75px'}}>
         
          <Grid container marginTop={'10px'} spacing='5' height={'100vh'} position='sticky' >
           <Grid container item xs={12} md={8} component='article'  height={'100%'} className='hideScrollbar' overflow='scroll'  >
           <Box width={'100%'} height='auto'>
         {BreadcrumbsCustom({name:post.category, link:`category/${post.category}`}, {name:post.title, link:post.slug})}
       
      </Box>
      {/* //author  */}
      <Box width={'100%'} height='auto' display={'flex'} flexDirection={'row'} flexWrap='wrap' alignItems={'center'} marginTop={'10px'}>
                     <Box width={'auto'} height='auto'>
                           <Avatar alt={'Author'} src={post.author.photo} sx={{width:'40px', height:'auto'}}  />   
                     </Box>
                   <Typography variant="body2" fontWeight={'bold'} style={{marginLeft:'10px'}}>
                          {` written by ${post.author.userName}`}
                   </Typography>
                      <Typography variant="body2" style={{marginLeft:'10px'}}>
                        { new Date(post.updatedAt).toDateString() }
                      </Typography>
                  </Box>
              
               <Box width='100%' height='auto' >
                
                 <Typography variant="h1" >
                   {post.title} Sample title
                  </Typography >
                 
                 
                  <Box width={'100%'} height={'auto'}>
                    <img src={post.featuredImage} alt={post.title} 
                      width='100%' height={'auto'}
                    />
                  </Box>
                  
                  <Box paddingX={'10px'}>
                      {Parser(post.content)}
                  </Box>
                 <Comments commentsData={post.comments}
                postId={post._id} postSlug={post.slug}
                 />
                </Box>
               
               
           </Grid>






           {/* //Advertisements and related posts section */}
           <Grid container item xs={12} md={4} position='sticky'  >
                
                <Stack width={'100%'} position='sticky' height='auto' gap='3'  >
                <Box width={'auto'} border='1px solid black'>
                        
                        </Box>
                <PopularPosts />
                <Tags allTags={post.tags} />
                
                </Stack>

                  
           </Grid>
          </Grid>
          
    </Box> 
    <Box position={'fixed'} top='50%'>
           <ShareButtons url={pageUrl}/>
           </Box>
    </div>
    )
}
export default Post

export async function getStaticPaths(){
    return {
     paths :[],
       fallback: true,
    }
}


export async function getStaticProps(context){
    const slug = context.params.slug
   

     const response = await fetch(`${ApiBaseUrl}/posts/${slug}`)
   const data = await response.json()
  
   if (!data.data) {
    return {
      notFound: true,
    }
  }

 return{
    props:{
      post : data.data
    }
 }
}