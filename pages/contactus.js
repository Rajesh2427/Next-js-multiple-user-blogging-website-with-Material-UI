import React from 'react'
import Head from 'next/head'
import { Box, Link, Typography } from '@mui/material'
const contactus = () => {
  return (
    <Box padding={5}>
        <Head>
        <title>Contact Us - Site Name</title>
<meta name="description" content="Get in touch with us at Site Name. Contact us by  email or through our online website for any questions or concerns."/>
<meta name="keywords" content="contact Site Name, contact us, contact rajesh,, rajesh reddy"/>
<meta property="og:title" content="Contact Us - Site Name" />
<meta property="og:description" content="Get in touch with us at Site Name. Contact us by  email or through our online website for any questions or concerns." />
        </Head>
    <Typography variant='h1'>
        Contact us
    </Typography>
    <Typography variant='body1' style={{marginTop:'20px'}}>
    We would love to hear from you! If you have any questions, comments, or concerns, please don't hesitate to reach out to us.
    </Typography>
    <Link href='mailto:demo@gmail.com' style={{marginTop:'20px', display:'block'}}>
      <Typography variant='h6'>
      contact
        </Typography>
    </Link>
    <Typography variant='body' style={{marginTop:'20px'}}>
    We will do our best to respond to your inquiry as soon as possible. Thank you for visiting our website
    </Typography>

    </Box>
  )
}

export default contactus