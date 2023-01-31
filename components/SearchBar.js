import { IconButton, Paper, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/SearchBar.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';

const SearchBar = () => {
    const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchTerm  = (e)=>{
 e.preventDefault();
  
    setSearchTerm(e.target.value);
  }
  return (
    <Paper  sx={{width:{xs:'auto', sm:'250px', md:'400px'},border: '1px solid orange',borderRadius:'40px', transition:'all 0.2s linear', '&:hover':{transform:'scale(1.1, 1)'}}}>
       <Box width={'100%'} display={'flex'} justifyContent='space-between' >
        <input  className={styles.searchBar} type='text' placeholder='Search...'
         onChange={handleSearchTerm}
        />
        <Button   onClick={()=> router.push(`/search/${searchTerm}`) }>
            <SearchIcon  />
        </Button>
        </Box>
    </Paper>
  )
}

export default SearchBar