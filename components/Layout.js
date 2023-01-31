import Header from "./Header"
import Footer from "./Footer"
import { Box } from "@mui/material"

export default function Layout({ children }) {
    return (
      <Box height={'100vh'} display={'flex'} flexDirection='column' >
        <Header />
        <main>{children}</main>
        <Box justifySelf={'flex-end'}>
        <Footer />
        </Box>
      </Box>
    )
  }