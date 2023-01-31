import {Typography, Card, CardContent, CardMedia, CardActions, Grid, Box, Link} from '@mui/material'
import React from 'react'

const Block = ({posts}) => {
 
  return (
    <div >
        <Grid container marginTop={'40px'} height={{xs:'auto', sm:'auto',}}>
        <Box width={'90%'} height={'25px'} borderBottom='2px solid black' marginBottom={'20px'}>
                <Typography variant='body1' width={'max-content'} paddingX='5px' fontWeight={'bold'} color='white' backgroundColor='black'>
                    Dont Miss
                </Typography>
               </Box>
          <Grid container item xs={12} md={8}>

            <Grid item xs={12} sm={6} >

            <Box display={'flex'} flexDirection={'row'}  justifyContent={'center'}>
           <Link href={posts[0].slug} style={{textDecoration:'none'}}>  
            <Card  sx={{maxWidth: 345,'&:hover':{'.postTitle':{color:'primary.main'}}, }}>
      <CardMedia
        component="img"
        height="190"
        image={posts[0].featuredImage}
        alt="green iguana"
      />
      <CardContent>
        <Typography className='postTitle' gutterBottom variant="h2" component="div">
          {posts[0].title}
        </Typography>
       
      </CardContent>
     
    </Card>
    </Link>

    </Box>
            </Grid>

            <Grid item xs={12} sm={6}  >
            <Box width={'100%'} marginTop={{xs:'20px', sm:'0px'}} display={'flex'} flexDirection={'row'} flexWrap='wrap' justifyContent={'center'}>
               {posts? posts.slice(0,4).map((post, i) =>(
               
                <Box key={i} marginLeft={{sm:'15px'}} marginBottom={'15px'} width={'100%'} display={'flex'} justifyContent={'center'}
                sx={{'&:hover':{'.postTitle':{color:'primary.main'}}, }}
                >
            <Link href={post.slug} style={{textDecoration:'none', display:'flex', justifyContent:'center', color:'inherit'}}>
                <img src={post.featuredImage}
                 width={'100px'} height={'70px'} alt='image' style={{borderRadius:'4px'}}/>
                 <Box marginLeft={'10px'} >
                    <Typography className='postTitle' variant='h3' fontWeight='bold'>
                        {post.title}
                    </Typography>
                    <Typography variant='caption'>
                     {new Date(post.createdAt).toDateString()}
                    </Typography>
                 </Box>
                 </Link>
            </Box>
         
               )) : null}
                
                </Box>

             </Grid>       

          </Grid>

          <Grid container item xs={12} md={4} height='100%'>

           <Box marginTop={{xs:'20px', sm:'0px'}} className='hideScrollbar' width={'100%'} height={'100%'} overflow='auto' display={'flex'} flexDirection={'row'} flexWrap='wrap' justifyContent={'center'}
           
           >
           
          {posts? posts.slice(4,8).map((post, i) =>(
                <Box key={i} marginLeft={'15px'} marginBottom={'15px'} width={'150px'} height={{xs:'150px',sm:'150px'}} display={'flex'} flexDirection={'column'}
                sx={{'&:hover':{'.postTitle':{color:'primary.main'}}, }}
                >
 <Link href={post.slug} style={{textDecoration:'none', display:'flex', flexDirection:'column', color:'inherit'}}>
                <img src={post.featuredImage}
                 width={'100%'} height={'100%'} alt='image' style={{borderRadius:'4px'}}/>
                 
                    <Typography gutterBottom className='postTitle' variant='caption' fontWeight='bold'>
                        {post.title}
                    </Typography>
               </Link>
                 
            </Box>
               )) : null}
         </Box>
          </Grid>
        </Grid>

    </div>
  )
}

export default Block