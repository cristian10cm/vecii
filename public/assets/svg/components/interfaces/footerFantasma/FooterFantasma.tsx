'use client'
import React, { useEffect } from 'react'
import './index.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import GoTo from '@/components/logics/GoTo'
import { toast } from 'react-toastify'
const FooterFantasma =({ref}:{ref?:React.RefObject<HTMLDivElement | null>})=>{
    const token = Cookies.get('token');  
    const goToPath = GoTo()
const verifySession = async () => {
      try {
        const response = await axios.get('https://api.vecii.com.co/api/v1/auth/me', {
        headers: {
          Authorization:`Bearer ${token}`
        }
        });
    } catch (error) {
                  localStorage.clear()
                sessionStorage.clear()
                Cookies.remove('token')
                Cookies.remove('id')
                Cookies.remove('userInfo')
                goToPath({path:'/'})
                toast.info('Su sesión ha caducado. Por favor, vuelva a iniciar sesión')
                console.log('Error al verificar sesión:');
    }
  };   
    useEffect(()=>{
        verifySession()
    },[])
    return(
        <div ref={ref} className='footer_fantasma'>
    
        </div>
    )
}
export default FooterFantasma