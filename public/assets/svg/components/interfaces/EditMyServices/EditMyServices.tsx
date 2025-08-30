'use client'
import './index.css'
import { useBtnEdit } from '@/components/stores/storeEditInput'
import UpdateTextArea from '../UpdateTextArea/UpdateTextArea'
import UpdateData from '../updateData/updateData'
import { useEffect, useRef, useState } from 'react'
import NoApiData from '../NoApiData/NoApiData'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
type dataService = {
  createdAt:string,
  id: string,
  title: string,
  description: string,
  price: string,
  backgroundImage: [],
  author: {
    id: string,
    firstName: string,
    lastName: string,
    email: string
  },
  images: []
}

const EditMyServices = ()=>{
    const titleRef = useRef<HTMLInputElement>(null!)
    const descriptionRef = useRef<HTMLInputElement>(null!)
    const priceRef = useRef<HTMLInputElement>(null!)
    const [useData,setData] = useState<dataService>()
    const [useModal,setModal]=useState<boolean>(false)
    const [useContK,setContK] = useState<number>(1)
    const verifyHistory = () => history.back()
    const [useId,setId] = useState<string>()
    const numberRegex = /^[\d]+$/;
    const token = Cookies.get('token')
     const verifyInfo = useBtnEdit((state)=>{
              const filterForm = state.state.form[`myService_community`]?.btnEdit || {}
              const values = Object.values(filterForm)
               return values.length >0 && values.some((x)=>x === true && x !== undefined) 
      })
    
      const updateService =async ()=>{
        console.log('ok')
            if(titleRef.current.value.length<4 || titleRef.current.value.length>50 ){
                toast.error('La longitud del titulo debe ser de 5 a 50 caracteres.')
                return
            }
             if(descriptionRef.current.value.length<9 || descriptionRef.current.value.length>500){
                toast.error('La longitud de la descripción debe ser de mínimo 10 caracteres y máximo 200.')
                return
            }
            if(parseInt(priceRef.current.value)<=0 || parseInt(priceRef.current.value)>10000000 || priceRef.current.value == ''){
                  toast.error('Escribe un valor valido');
                  return;
            }
            if(useData?.title == titleRef.current.value && useData.price === priceRef.current.value && useData.description == descriptionRef.current.value ){
                   toast.info('Modifica algún campo para actualizar');
                  return;  
            }
            try{
                const uptade = await axios.patch(`https://api.vecii.com.co/api/v1/community-services/${useId}`,
                    {
                                "title": titleRef.current.value.trim(),
                                "description": descriptionRef.current.value.trim(),
                                "price": priceRef.current.value.trim(),         
                    },{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                toast.success('Información actualizada correctamente')
                setContK(useContK+1)
                setData(uptade.data)

            }catch(err){
                console.log(err)
                console.log(useId)
                toast.error('No pudo realizar la actualización del servicio')
            }
         
      }
      const deleteService = async()=>{
            try{
                const peticion = await axios.delete(`https://api.vecii.com.co/api/v1/community-services/${useId}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setTimeout(()=>{
                    verifyHistory()
                },1000)
                toast.success('Servicio eliminado correctamente')
                setModal(false)
                
            }catch(err){
                console.log(err)
                toast.error('No se pudo eliminar el servicio.')
            }
      }
        const service = async(id:string)=>{
            try{
                const peticion = await axios.get(`https://api.vecii.com.co/api/v1/community-services/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                const {data} = await peticion
                setData(data)
                console.log(data)
            }catch(err){
                console.log(err)
            }
        }
    useEffect(()=>{
        const idService = localStorage.getItem('idServiceCommunity')
        if(!idService) return
        if(!token) return
        setId(idService)
        service(idService)
    },[token])
    return(
        useData ? 
        
        <div  className='container_edit_myService'>
            <img className='img_myService' src="https://todocedritos.com/servicio_domicilio_supermercado_barrio_cedritos_bogota/fruver_belmira_supermercado_fruteria_barrio_belmira_cedritos_norte_bogota_2b.jpg" alt="" />
            <div className='container_edit_myService_separator'></div>
       
         <UpdateData
                refElement={titleRef}
                key={`kName:${useData.id+useContK}`}
                label='Nombre del servicio'
                numBtn={1}
                type='text'
                information={useData?.title || 'Cargando..'}
                formName='myService_community'
        />
             <UpdateData
                key={`kDescription:${useData.id+useContK}`}
                refElement={descriptionRef}
                label='Descripción'
                numBtn={2}
                type='text'
                information={useData?.description || 'Cargando..'}
                formName='myService_community'

            />
        <UpdateData
                key={`kPrice:${useData.id+useContK}`}
                refElement={priceRef}
                type='number'
                label='Precio del servicio'
                numBtn={3}
                information={useData?.price || 'Cargando..'}
                formName='myService_community'

            />
            {
                useModal ? 
                <div className='modal_deleteMyservice'>
               <div className='modal_deleteMyservice_info'>
                 <p>{`¿Estas seguro de eliminar el servicio?`} </p>
                <div className='modal_deleteMyservice_btns'>
                    <button className='modal_deleteMyservice_delete' onClick={()=>deleteService()}>Eliminar</button>
                    <button className='modal_deleteMyservice_cancel' onClick={()=>setModal(false)} >Cancelar</button>
                </div>
               </div>
            </div>:''
            }
            <div className='container_edit_myService_btn'>
                {
            verifyInfo ? 
                <button onClick={()=>updateService()} className='container_edit_myService_send' >
                    <b>Editar</b>
                </button>:''
            }
            <button onClick={()=>setModal(true)} className='container_edit_myService_delete' >
                    <b>Eliminar</b>
                </button>
            </div>
        </div> :
        <NoApiData message='Cargando información..'/>

     
    )
}
export default EditMyServices