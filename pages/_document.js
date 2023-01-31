import Document , { Html, Head, Main, NextScript } from 'next/document'


 class MyDocument extends Document  {
  render(){
  
    return (
      <Html lang="en">
        <Head>
         
          <meta key='title' title='Site Name' />
          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
  
}

export default MyDocument