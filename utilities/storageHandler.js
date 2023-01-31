import storage from './firebase'
import { uploadBytesResumable } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { ref } from 'firebase/storage';

export const uploadImage = async (file, path) =>{
    if(!file) return;
    let uploadProgress;
    let fileUrl;
    const storageRef = ref(storage, `${path}/${file.name}-${new Date().toUTCString()}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
     await uploadTask.on("state_changed",(snapshot)=>{
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      uploadProgress =progress
      },
      (error)=> {
        alert('Upload failed, please try again later')
        console.log(error)},
       ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url => {
            // console.log(url)
           fileUrl = url
           return url
        })
      }
    
    
    )
   

   }

  export const handleRemoveImage = (url)=>{
    if(url !== ''){
   let imageRef = ref(storage, url)

   deleteObject(imageRef).then(() => {
    return{
        status:'success'
    }
    //  console.log('File deleted successfully');
   }).catch((error) => {
     console.log(error)
   });

 }

//    userImage.current.value = ''
//    setUserPhoto(null)
//    setImageUrl('/demo-user.jpg')
//    setUser({
//      ...user,
//      photo:''
//    })
//    setUploadProgress(0)
//    console.log(imageUrl)
//    console.log(userPhoto)
 }