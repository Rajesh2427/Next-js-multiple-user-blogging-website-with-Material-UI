import { Box,  FormControl, Select, MenuItem, Button, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ComponentTitle from '../ComponentTitle'
import { ApiBaseUrl } from '../../utilities/api'
const Category = ({handleCategory, selectedCategory}) => {
    const [cat, setCat] = useState('')
    const [customCategory, setCustomCategory] = useState({status:false, value:''})
    const demoCategories = ['Technology', ]
    const [listCategories, setListCategories] = useState([])

    
    const getCateories = async() =>{
      await fetch(`${ApiBaseUrl}/posts/categories`)
      .then(res => res.json())
      .then((data)=>{
              setListCategories(data.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    useEffect(()=>{
        getCateories()
    },[])
    const handleChange = (e) => {
        if(e.target.value === 'others'){
            setCustomCategory({
                ...customCategory,
                status: true,
            })
            return;
        }
        setCustomCategory({
            ...customCategory,
            status: false,
        })
        setCat(e.target.value)
        handleCategory(e.target.value)
    }
    // console.log(cat)
  return (
    <div style={{ marginBottom:'10px'}}>
        <ComponentTitle title={'Category'} />
        <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={cat}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
            {selectedCategory !== '' ?
            <MenuItem value={selectedCategory }>
            <em>{selectedCategory }</em>
          </MenuItem>
            :  <MenuItem value="">
            <em>None</em>
          </MenuItem>
          }
         
          <MenuItem value={'others'}>Others</MenuItem>
          {listCategories.length > 0 ? listCategories.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>) : null}
         
        </Select>
    
      </FormControl>
      
     {customCategory.status ?
        (<Box>
            <input placeholder='Enter your category' type={'text'} value={customCategory.value} onChange={(e)=> setCustomCategory({...customCategory,value:e.target.value})} />
            <Button onClick={()=>handleCategory(customCategory.value)}>Add</Button>
        </Box>
         ) : null}
        </Box>
    </div>
  )
}

export default Category