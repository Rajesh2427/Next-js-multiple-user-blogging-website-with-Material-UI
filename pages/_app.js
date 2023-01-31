 import '../styles/globals.css'

import Layout from '../components/Layout';
import muiTheme from '../components/muiTheme';
import { ThemeProvider, responsiveFontSizes, } from '@mui/material';


let Theme = responsiveFontSizes(muiTheme)
export default function App({ Component, pageProps }) {
  return <>
  <ThemeProvider theme={Theme}>
 
  <Layout>
       <Component {...pageProps} />
       </Layout>
 
  </ThemeProvider>
  </>

}
