import Cookies from "js-cookie";

export const setCookie = (key, value) =>{
    if(typeof window === 'undefined'){
    Cookies.set(key, value, {expires:1})
    return
    }
    Cookies.set(key, value, {expires:1})
}

export const getCookie = (key) =>{
    if(typeof window === "undefined"){
       return Cookies.get(key)
    }
    if(process.browser){
        return Cookies.get(key)
    }
    return Cookies.get(key)
}

export const removeCookie = (key) =>{
    if(typeof window === "undefined"){
    Cookies.remove(key)
    return
    }
    Cookies.remove(key)
}

//localStorage
export const setLocalStorage = (key, value) =>{
    if(typeof window === 'undefined'){
    localStorage.setItem(key, JSON.stringify(value), )
    return
    }
    localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorage = (key) =>{
    if(typeof window === "undefined"){
    localStorage.removeItem(key)
    return
    }
    localStorage.removeItem(key)
}

//User Authentication

export const authenticate  = (data, next) =>{
 setCookie('token', data.token)
 setLocalStorage('user', data.user)
 next()
}

// check if user is Logged in
export const isAuthorized = () =>{
const tokenCookie = getCookie('token')

      if(tokenCookie){
        if(localStorage.getItem('user') ){
            return JSON.parse(localStorage.getItem('user'))
        }else{
            return false
        }
      }else{
        return false
      }

}

export const signOutClientSide =(next)=>{
    removeCookie('token')
    removeLocalStorage('user')
    next()
}

//Revalidate
export const revalidate = async(slug)=> { 
    await fetch(`http://localhost:3000/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_KEY}&path=/${slug}`)
    .then(re => console.log(re.json()))
    .catch(err => console.error(err))
  }