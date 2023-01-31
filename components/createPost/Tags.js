
import { Box, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, {useState} from 'react'
import ComponentTitle from '../ComponentTitle'

const Tags = ({handleTags, allTags}) => {
  const [tag, setTag] = useState('')

  return (
    <Box width={'100%'} height={'100%'}>
      <ComponentTitle title={'Tags'} />
    <Box width={'100%'} height={'auto'}>
      <form onSubmit={(e)=> {
        e.preventDefault();
          if(tag !== ''){
            handleTags(tag)
            setTag('')
          }
         }}>
         <input type={'text'} value={tag} onChange={(e)=> setTag(e.target.value) } />
         <Button type='submit' variant='outlined'
         
         >
          Add
          </Button>
       </form>
     </Box>
     <Box width={'100%'} display={'flex'} gap flexDirection='row' flexWrap={'wrap'} justifyContent={'center'} marginY='10px'>
     {allTags.length ? allTags.map((item) => {
              return   (
                        <Box height={'30px'} padding='10px'   display={'flex'} flexDirection='row' justifyContent='center' alignItems={'center'} border='1px solid black' borderRadius={'10px'}>
                          <h6>{item}</h6>
                          
                          <IconButton size='small' onClick={()=> handleTags(item, true)}>
                          <CloseIcon/>
                          </IconButton>
                       </Box>
                       )
            }) : null}
     </Box>
    </Box>
  )
}

export default Tags