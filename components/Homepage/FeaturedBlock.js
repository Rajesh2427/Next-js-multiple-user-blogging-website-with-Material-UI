import { Grid, Box, Typography, Link } from '@mui/material'
 
 const FeaturedBlock = ({posts}) => {
   return (
    <Grid container spacing={{sm:1}} >
    <Grid height={{xs:'300px', sm:'300px', md:'400px'}} item xs={12} sm={6}>
              <PostPreview post={posts[0]} width={'100%'} height={'100%'} />
     </Grid>
     <Grid  container item  height={{xs:'200px', sm:'300px', md:'400px'}} xs={12} sm={6} overflow={'hidden'}>
        <Box className='hideScrollbar' style={{overflow:'scroll'}} gap={{md:1}} width={'100%'} height={'100%'} display='flex' flexWrap={'wrap'}>
        <PostPreview post={posts[1]} width={{xs:'50%',sm:'49%'}} height={{xs:'100%', sm:'50%'}}/>
        <PostPreview post={posts[2]} width={{xs:'50%',sm:'49%'}}height={{xs:'100%', sm:'50%'}}/>
        <PostPreview post={posts[3]} width={{xs:'50%',sm:'49%'}}height={{xs:'100%', sm:'50%'}}/>
        <PostPreview post={posts[4]} width={{xs:'50%',sm:'49%'}}height={{xs:'100%', sm:'50%'}}/>
        </Box>
     </Grid>
    </Grid>
   )
 }
 
 export default FeaturedBlock
 
 
 
 export const PostPreview = (props) =>{
    return(
      

      <Box display={'flex'} flexDirection='row' width={props.width || '100%'} height={props.height ||'100%'}   borderRadius='7px'
        sx={{'&:hover':{'.category':{backgroundColor:'primary.main'}}, position:'relative', }}
        >
          
            <div className='mainBackgroundImage' style={{position:'absolute', zIndex:'-1', borderRadius:'7px',  backgroundImage: `url(${props.post.featuredImage})` , backgroundPositon:'center', backgroundSize:'cover', backgroundRepeat:'no-repeat', width:'100%', height:'100%',}}></div>  
           
            <Link href={props.post.slug} style={{position:'absolute', width:'100%', height:'100%',zIndex:'0'}}></Link>
            <Box  width={'100%'} style={{alignSelf:'flex-end', background:'linear-gradient(0deg, black, transparent)'  }} >
                   <Link href={`/category/${props.post.category}`} style={{textDecoration:'none', zIndex:'1'}}>
                    <Typography className='category' width='max-content' borderRadius={'10px'} marginBottom={2} paddingX={1} backgroundColor='black' color='white' 
                    variant='body1'
                    sx={{
                     transition: 'all 0.5s'}}>
                      {props.post.category}
                    </Typography>
                    </Link>
                    <Typography  style={{ width:'100%', letterSpacing:'0px', }} fontSize='15px' fontWeight={'bold'}   color='white'
                    >
                     {props.post.title}
                    </Typography>
                    </Box>
                  
                    </Box>  
            
              
                 
    )
  }

 