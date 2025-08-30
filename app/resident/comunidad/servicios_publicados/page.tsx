'use client'
import './index.css'
import EditMyServices from '@/components/interfaces/EditMyServices/EditMyServices'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg'
const serviciosPublicados = ()=>{
    return(
        <>
        <VeciiHeaderImg
        srcImg='https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        name='Publicados'
        detail=''
      />
        <EditMyServices
        />

        </>

    )
}
export default serviciosPublicados