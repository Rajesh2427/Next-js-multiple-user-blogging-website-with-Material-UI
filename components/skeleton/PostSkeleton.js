import { Box, Skeleton } from '@mui/material'
import React from 'react'

const PostSkeleton = () => {
  return (
    <Box width='100%' height='100%'>
        
        <Skeleton animation="pulse" variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton animation="pulse" variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton animation="pulse" variant="circular" width={50} height={50} />
        <Skeleton animation="pulse" variant="text" sx={{ fontSize: '3rem' }} />
        <Skeleton animation="pulse" variant="rectangular" width={'100vw'} height={'100vh'} />
      

    </Box>
  )
}

export default PostSkeleton