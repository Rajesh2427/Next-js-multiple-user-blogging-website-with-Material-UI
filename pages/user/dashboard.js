import React, {useState, useEffect} from 'react'
import { Stack, Box, Typography, Link, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import CachedIcon from '@mui/icons-material/Cached';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import {ApiBaseUrl} from '../../utilities/api'
import {isAuthorized} from '../../utilities/token'
import { useRouter } from 'next/router';
import Head from 'next/head';
import PendingPosts from '../../components/PendingPosts';

const dashboard = () => {
    const user = isAuthorized()
    const [posts, setPosts] = useState()
    const [pendingPosts, setPendingPosts] = useState(false)
     const router = useRouter()


const getPosts = async (id)=>{
await fetch(`${ApiBaseUrl}/posts/?author=${id}`)
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
        getPosts(user._id)
    }
   
},[])

console.log(posts)
if(!posts) return <h1>Loading</h1>
  return (
    <Stack paddingX={{md:'50px',lg:'150px'}}>
        <Head>
       <title>Dashboard - Site Name</title>
<meta name="keywords" content="Dashboard, Dashboard in trustednews.in, Site Name account signup, best news website, write articles,"/>
<meta property="og:title" content="Dashboard - Site Name"/>

        </Head>

       {user ? (
        <Box>
        <Typography variant='h1' style={{display:'inline', color:'grey'}}> welcome Back </Typography>
        <Typography variant='h1' style={{display:'inline'}}>Rajesh</Typography>
       </Box>
        ) : null}

       <Box>
        <Box marginY='20px' display={'flex'} flexDirection='row' justifyContent={'space-between'} width={'100%'} height={'auto'}>
        <Typography variant='h1' style={{background:'#e8e8e8', padding:'5px', borderTopRightRadius:'20px'}} >Posts</Typography>
       
 {user.role === 'admin' && !pendingPosts ?  <Button onClick={()=> setPendingPosts(true)}  variant='contained'>Show Pending Posts</Button> : null }      
 {user.role === 'admin' && pendingPosts ?       <Button onClick={()=> setPendingPosts(false)}  variant='contained'>Close Pending Posts</Button> : null } 
            
             <Box>
                <Link href='/post/createpost' style={{textDecoration:'none'}}>
                <Button  startIcon={<AddIcon/>} variant='contained'>Create Post</Button>
                </Link>
             </Box>
            <Box>
                <Link href='/user/changepassword' style={{textDecoration:'none'}}>
                <Button  startIcon={<CachedIcon/>} variant='contained'>Change Password</Button>
                </Link>
             </Box>
        </Box>
      
      {pendingPosts ? <PendingPosts/> : null}

 { posts.length > 0 ? posts.map((post)=>{
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
                <Link href={`/post/updatepost/?postid=${post.id}`} style={{textDecoration:'none'}}>
                <Button color='info' startIcon={<EditIcon/>}>Edit</Button>
                </Link>
                <Link href={`/post/updatepost/?postid=${post.id}`} style={{textDecoration:'none'}}>
                <Button color='error' startIcon={<DeleteOutlineIcon/>}>Delete</Button>
                </Link>
             </Box>
             </Box>
         </Box>
        
            )
        }) : null}


       </Box>
    </Stack>
  )
}

export default dashboard