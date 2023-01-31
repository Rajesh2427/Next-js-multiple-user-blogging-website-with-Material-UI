import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import Parser from "html-react-parser"
import Head from 'next/head'
const termsconditions = () => {
    const data = `

    <p>Welcome to Site Name!</p>
    
    `
  return (
    <div style={{padding:'50px'}}>
        <Head>
        <title>Terms & Conditions - Site Name</title>
        <meta name="description" content="Read our terms and conditions before using our website and services. Learn about our policies, guidelines and user agreements."/>
<meta name="keywords" content="Read our terms and conditions before using our website and services. Learn about our policies, guidelines and user agreements"/>
<meta property="og:title" content="Terms & Conditions - Site Name" />
<meta property="og:description" content="Read our terms and conditions before using our website and services. Learn about our policies, guidelines and user agreements." />
        </Head>
         <Typography variant='h1'>
            Terms & Conditions
        </Typography>
        {Parser(data)}
        </div>
  )
}

export default termsconditions