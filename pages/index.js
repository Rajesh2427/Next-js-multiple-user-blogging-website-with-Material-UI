

import styles from '../styles/Home.module.css'
import { Stack } from '@mui/material'
import FeaturedBlock from '../components/Homepage/FeaturedBlock'
import Block from '../components/Homepage/Block'
import { ApiBaseUrl } from '../utilities/api'



export default function Home({posts}) {
   let featuredPosts ;
   let blockPosts;
  if(posts){
    featuredPosts = posts.slice(0, 6)
    blockPosts = posts.slice(5,14)
  }

  return (
    <Stack height={'auto'} marginTop={'10px'} paddingX={{lg:'100px'}}>
    <FeaturedBlock posts={featuredPosts}/>
    <Block posts={blockPosts}/> 
          
    </Stack>
  )
}



export async function getStaticProps(context){

  

   const response = await fetch(`${ApiBaseUrl}/posts/?limit=14`)
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

