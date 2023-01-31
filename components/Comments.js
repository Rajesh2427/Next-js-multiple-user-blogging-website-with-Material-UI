import ComponentTitle from "./ComponentTitle"
import { Box, FormControl, TextField, Button, Typography } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { ApiBaseUrl } from "../utilities/api"
import { revalidate } from "../utilities/token"


const Comments = ({commentsData, postId, postSlug}) => {
const [comment , setComment] = useState({
  name :'',
  email: '',
  comment: '',
  post:postId
})
const handleChange =(e)=>{

  setComment({
    ...comment,
    [e.target.name]: e.target.value
  })
// console.log(e.target.name)
}
const handleSubmit = async (e)=>{
  e.preventDefault()

  
    await axios.post(`${ApiBaseUrl}/comments`, comment)
    .then((response) => {
     setComment({
      ...comment,
      name:'',
      email:'',
      comment:''
     })

     
      
    })
    .catch(error => {
        // displayAlert(true, error.response.data.message, 'error')
        // console.log(error.response.data)
    })
    await revalidate(postSlug)



  // console.log(comment) 
}
  return (
    

    <Box >
       <ComponentTitle title={'Leave Your Comment'}/>
        <form onSubmit={handleSubmit}>
          <Box display={'flex'} flexDirection={{xs:'column', sm:'row'}} gap margin={5}>
          <InputFeild label='Name' name='name' type='string' value={comment.name} onchange={handleChange} />
            <InputFeild label='Email' name='email' type='email' value={comment.email} onchange={handleChange} />
            
          </Box>
          <Box display={'flex'} flexDirection='column' gap marginX={5}>
          
          <TextField multiline fullWidth label='Comment' type='string' name='comment' required variant="outlined"  value={comment.comment} onChange={handleChange}/>
            <Button
            sx={{marginTop:5}}
             variant="outlined"  type="submit">Submit</Button>
          </Box>
          
        </form>
    <ComponentTitle title="Comments"/>
   { commentsData ? commentsData.map((comment, i)=>{
    return (
        <Box key={i} margin={'20px'}>
      <Box display='flex' gap >
          
          <Typography variant="body2" fontWeight='bold'>{comment.name}</Typography>
          <Typography variant="body2" fontWeight='normal'>{new Date(comment.createdAt).toDateString()}</Typography>
         
      </Box>
      <Typography variant="body2" fontWeight='bold'sx={{wordBreak:'break-all'}} >{comment.comment}</Typography>
          
      </Box>
    )
   })
      
       :null}
    </Box>
  )
}

export default Comments


export const InputFeild = ({label, type, name,  onchange, value}) =>{
   return(
    <Box>
      <TextField fullWidth label={label} type={type} name={name} required variant="outlined"  value={value} onChange={onchange}/>
    </Box>
   )
}