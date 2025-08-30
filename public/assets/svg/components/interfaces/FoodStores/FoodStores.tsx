'use client'
import './index.css'
import GoTo from '@/components/logics/GoTo';
import { useOrderFood } from '@/components/stores/storePedido';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
interface typeStore {
    createdAt: string,
    id: string,
    name: string,
    description: string,
    address: string,
    nit: string,
    phoneNumber: string,
    location: {
        type: string,
        coordinates: [
            Number,
            Number  
        ]
    },
    logo: null | string
}
const FoodStore = ({imgStore,nameStore,gradeStore,timeOrder,pathStore,idStore}:{imgStore:string;nameStore:string,gradeStore?:string,timeOrder?:string,pathStore:string,idStore:string})=>{
    const [useStore,setStore] = useState<typeStore>()
    const goToPath = GoTo()
    const {setOrder} = useOrderFood()
    const goToOrder = ()=>(  
        // sessionStorage.setItem('idStoreCatalog',useStore?.id || 'Cargando..'),
        setOrder({
             nameFoodStore : nameStore,
             gradeStoreFood: gradeStore,
             imgStoreFood: imgStore,
             id:idStore,
             description: useStore?.description || '',
             numberStore: useStore?.phoneNumber || '',
             adressStore:useStore?.address || ''
        }),
        goToPath({path:pathStore})
        
    )
    const getStore =async ()=>{
        try{
            const peticion = await axios.get(`https://api.vecii.com.co/api/v1/stores/${idStore}`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                },params:{
                    limit:6
                }
            })
            setStore(peticion.data)
            console.log(peticion.data)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getStore()
    },[])
    return( 
        <div className='container_section_stores' onClick={goToOrder}>
            <div className='container_section_stores_image'>
                <img src={imgStore} alt="restaurant image"  />
            </div>
            <div className='container_section_stores_infoStore'>
                <p className='container_section_stores_nameStore'>{nameStore || 'Cargando..'}</p>
                <div className='container_section_stores_timeGrade'>
                    <p className='container_section_stores_grade'>📍{useStore?.address || 'Cargando..'}</p>
                     
                </div>
            </div>
        </div>
    )
}
export default FoodStore