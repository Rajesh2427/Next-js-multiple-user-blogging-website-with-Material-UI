import { Stack, Box, Button, Grid, Collapse, Alert, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';

import dynamic from "next/dynamic";
const JoditEditor = dynamic(import('jodit-react'), { ssr: false })


import FeaturedImage from '../../components/createPost/FeaturedImage';
import UploadImages from '../../components/createPost/UploadImages';
import Tags from '../../components/createPost/Tags';
import Category from '../../components/createPost/Category';
import axios from 'axios';
import { ApiBaseUrl } from '../../utilities/api';
import { isAuthorized, revalidate } from '../../utilities/token';

const createpost = () => {
    let user = isAuthorized()

    const router = useRouter()

useEffect(()=>{
    if(user === false) {
        router.push('/user/login')
    }
},user)
   

   

const [post, setPost] = useState({
    title :'',
    featuredImage:'',
    content:'',
    contentImages:[],
    category:'',
    tags:[],
    author:user._id

})
const [alert, setalert] = useState({status:false, message:''})
const editor = useRef(null);


const displayAlert = (status, message, style) =>{
    setalert({
        ...alert,
        status:status,
        message:message,
        style: style || undefined,
    })
}	

const updateFeaturedImage = (featuredImageUrl) =>{
    setPost({
        ...post,
        featuredImage:featuredImageUrl,
    })
}
const updateContentImages = (url, del) => {
if(url === '') {
    return;
}
if(del === true){
    
    setPost({
        ...post,
        contentImages: post.contentImages.filter(image => image !== url)
     })
     return 
  }
  setPost({
    ...post,
    contentImages: [...post.contentImages, url]
 })
}

const handleTags = (tag, del) => {
    if(tag === '') {
        return;
    }
    if(del === true){
       
        setPost({
            ...post,
            tags: post.tags.filter(item => item !== tag)
         })
         return 
      }
      setPost({
        ...post,
        tags: [...post.tags, tag]
     })
    }
 const handleCategory = (category) =>{
 setPost({
    ...post,
    category: category
 })
 }

 const handleSave = async () => {
    try{
        await axios.post(`${ApiBaseUrl}/posts`, post)
        .then((response) => {
          // console.log(response.data)
          displayAlert(true, 'Post saved', 'info')
         
          
        })
        .catch(error => {
            displayAlert(true, error.response.data.message, 'error')
            console.log(error.response.data)
        })
    
    
      }catch(error){
        console.log(error)
      }
 }
 const handlePublish = async () =>{
    if(post.title.length ==='') return displayAlert(true, 'Title is Mandatory')
    if(post.title.length < 3) return displayAlert(true, 'Title is too short')
    if(post.content.length < 20) return displayAlert(true, 'Content is Too short, Try to writ more content')
    if(post.featuredImage =='') return displayAlert(true, 'Featured Image is Mandatory, Please upload Featured Image', 'error')
    if(post.category =='') return displayAlert(true, 'Select Category', )
    if(post.tags.length < 2) return displayAlert(true, 'Enter atleast 2 Tags', )
   
 
    try{
        await axios.post(`${ApiBaseUrl}/posts`, post)
        .then((response) => {
          // console.log(response.data)
          displayAlert(true, 'Post Published', 'success')
         
          
        })
        .catch(error => {
            displayAlert(true, error.response.data.message, 'error')
            console.log(error.response.data)
        })
    
    
      }catch(error){
        console.log(error)
      }
  

    
 }
// console.log(post)
// console.log(post.content.length)
  return (
    <div>
        <Collapse in={alert.status}  marginBottom='20px'>
        <Alert variant="filled" severity={alert.style ? alert.style : "warning"}>
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
        <Stack padding={'50px'}>
            <Box display={'flex'} gap='5px' justifyContent='end'>
                {/* <Button onClick={handleSave} >Save</Button> */}
                <Button onClick={handlePublish} variant='contained'>Publish</Button>
            </Box>
            <Box>
                <textarea value={post.title} onChange={(e)=> setPost({...post, title:e.target.value})}  placeholder='Title' type={'Text'} style={{width:'100%', height:'auto', overflow:'visible', fontSize:'30px', fontWeight:'bold'}}/>
            </Box>
            <Grid container>
                  <Grid item sm={9} border='1px solid black'>
                    
                  <JoditEditor
			ref={editor}
			value={post.content}
			// config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setPost({...post, content:newContent})} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => setPost({...post, content:newContent})}
		/>
                  
                  </Grid>
                  <Grid item sm={3} width='100%' border='1px solid black'>
                     <FeaturedImage displayAlert updateFeaturedImage={updateFeaturedImage} deleteImageUrl={post.featuredImage} />
                     <Category handleCategory={handleCategory} selectedCategory={post.category}/>
                     <UploadImages displayAlert updateContentImages={updateContentImages} allContentImages={post.contentImages} />
                     <Tags allTags={post.tags} handleTags={handleTags}/>
                     
                  </Grid>
            </Grid>
        </Stack>

    </div>
  )
}

export default createpost