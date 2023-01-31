import { Box, Stack } from "@mui/material"
import ComponentTitle from "./ComponentTitle"

const Tags = ({allTags}) => {
    
  return (
    <Stack >
   <ComponentTitle title={'Tags'}/>
    <Box width='auto' height='auto'  display={'flex'} flexWrap='wrap' >
       {allTags ? allTags.map((tag, i) => {
        return  (
            <Box key={i} className='text-nowrap ' sx={{cursor:'pointer', '&:hover':{background:'#4DB2EC', color:'white'}}} paddingX={'5px'} margin='2px' border='1px solid black'
            > 
                <span>{tag}</span>
            </Box>

        )
       }): null}
    </Box>
    </Stack>
  )
}

export default Tags