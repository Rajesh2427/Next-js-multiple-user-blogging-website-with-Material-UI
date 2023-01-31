import { Box, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React,{useRef, useState} from 'react'

import storage from '../../utilities/firebase'
import { uploadBytesResumable } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { ref } from 'firebase/storage';
import { deleteObject } from 'firebase/storage';

import ComponentTitle from '../ComponentTitle'
import Compressor from 'compressorjs';

const FeaturedImage = ({updateFeaturedImage, deleteImageUrl, displayAlert}) => {
    
   const [rawImage, setRawImage] = useState(null)

    const imageRef = useRef(null)
    const [userPhoto, setUserPhoto] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [uploadProgress, setUploadProgress] = useState(0)

       
     const handleImage = () =>{
        const file = imageRef.current.files[0]
        
        if(file){
         
          // setUserPhoto(file)
          // console.log(file)
          const url = URL.createObjectURL(file)
          setImageUrl(url)
          // console.log(url)

          
    new Compressor(file, {
      quality: 0.5,
      success: (compressedResult) => {
        setUserPhoto(compressedResult)
      },
    });

            
        }
    }




    
    const handleRemoveFile = async () =>{
        if(deleteImageUrl !== ''){
            let fileRef = ref(storage, deleteImageUrl)
         
            deleteObject(fileRef).then(() => {
             displayAlert(true, 'File deleted successfully')
              // console.log('File deleted successfully');
            }).catch((error) => {
              console.log(error)
            });
        }

        imageRef.current.value = ''
        setUserPhoto(null)
        setImageUrl('')
        updateFeaturedImage('')
        setUploadProgress(0)
        // console.log(imageUrl)
        // console.log(userPhoto)

    }

    const uploadFile = () => {
        if(!userPhoto) return;
    
    const storageRef = ref(storage, `postfeaturedimages/${userPhoto.name}-${new Date().toUTCString()}`)
    const uploadTask = uploadBytesResumable(storageRef, userPhoto)
      uploadTask.on("state_changed",(snapshot)=>{
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setUploadProgress(progress)
      },
      (error)=> {
        displayAlert(true, 'Upload failed, please try again later')
        alert('Upload failed, please try again later')
        // console.log(error)
      },
       ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url => {
            console.log(url)
            updateFeaturedImage(url)
        })
      }
    
    
    )

    }

    
  return (
    <Box width={'100%'}>
      <ComponentTitle title={'Featured Image'}/>
         <Box display={'flex'} justifyContent='center' width={'100%'} marginBottom='20px'>
                <img src={imageUrl} width={'200px'} height='auto' style={{border:'1px solid black', borderRadius:'5%'}}/> 
                <input  onChange={handleImage} ref={imageRef} type={'file'} accept='jpg' style={{display:'none'}}/>
            </Box>
            
            {uploadProgress > 0 ? <h6>uploaded {uploadProgress} %</h6> : null}
            <Box display={'flex'} justifyContent='center' gap={2}>
               {userPhoto === null ?
                <Button onClick={()=> imageRef.current.click()} size='small' variant='outlined'>
                Choose Image
               </Button>
                  : null}

                  { userPhoto === null ? null:
               <Button startIcon={<CloseIcon/>} onClick={handleRemoveFile} name='remove'
                size='small' variant='outlined'>
                Remove Image
               </Button>
               
                   }
                 { userPhoto === null ? null:
               <Button size='small' variant='contained' onClick={uploadFile}>
               Upload
               </Button>
               }
            </Box>
    </Box>
  )
}

export default FeaturedImage