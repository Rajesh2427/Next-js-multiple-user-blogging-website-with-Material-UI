import {Box, Card, CardMedia, Stack, CardContent, Typography, Link, Skeleton } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import BreadcrumbsCustom from '../../components/BreadcrumbsCustom'
import { ApiBaseUrl } from '../../utilities/api'


const category = ({posts}) => {
    const router = useRouter()  
    // console.log(posts)
    // console.log(router.query)
  return (
    <Stack>
      <Head>
       <title>category - Site Name</title>
<meta name="keywords" content="category, category in trustednews.in, Site Name category bar, best news website, search articles,"/>
<meta property="og:title" content={`Category - Site Name`}/>
        </Head>
        {BreadcrumbsCustom({name:router.query.category, link:`category/${router.query.category}`})}
      
        <Box display={'flex'} flexDirection='row'  gap flexWrap={'wrap'} padding={3}>
        
            {posts ? posts.map(post => {
                return(
            <Link underline='none'  href={`/${post.slug}`} sx={{borderRadius:'10px', height:'max-content'}}>
        <Card   sx={{maxWidth: 345, height:350, textOverflow:'ellipsis', '&:hover':{'.postTitle':{color:'primary.main'}}, }}>
      <CardMedia
        component="img"
        height="190"
        image={post.featuredImage}
        alt={post.title}
      />
      <CardContent>
        <Typography className='postTitle' gutterBottom variant="h2" component="div">
         {post.title}
        </Typography>
       
      </CardContent>
     
    </Card>
    </Link>
     ) })
   : (<Skeleton variant="rectangular" width={'350px'} height={'350px'} >
   </Skeleton>)}

        </Box>
    </Stack>
  )
}

export default category

export async function getStaticPaths(){
    return {
     paths :[],
       fallback: true,
    }
}



export async function getStaticProps(context){
    const category = context.params.category


     const response = await fetch(`${ApiBaseUrl}/posts/?category=${category}`)
   const data = await response.json()
   
   if (!data.data) {
    return {
      notFound: true,
    }
  }
 return{
    props:{
      posts : data.data
    }
 }
}