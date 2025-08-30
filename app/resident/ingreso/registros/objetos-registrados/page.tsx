'use client'
import './index.css'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader'
import UpdateData from '@/components/interfaces/updateData/updateData'
import UpdateOptions from '@/components/interfaces/UpdateOptions/UpdateOptions'
import NoApiData from '@/components/interfaces/NoApiData/NoApiData'
import { useBtnEdit } from '@/components/stores/storeEditInput'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import { getDate } from 'date-fns'
type ObjectLocker = {
  id: string
  description: string
  type: 'entrance' | 'output'
  entryDate: string
  createdAt: string 
  needsApprovement: boolean
  approvedDate: string | null
  approvedBy: string | null
  housing: {
    id: string
    name: string
    unit: {
      id: string
      name: string
    }
  }
}
const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
let today = new Date().toISOString().split('T')[0];
const EditObjectMovement = () => {
    const descriptionRef = useRef<HTMLInputElement>(null!)
    const entryDateRef = useRef<HTMLInputElement>(null!)
    const typeRef = useRef<HTMLSelectElement>(null!)
    
    const [useData, setData] = useState<ObjectLocker>()
    const [useModal, setModal] = useState<boolean>(false)
    const [useContK, setContK] = useState<number>(1)
    const verifyHistory = () => history.back()
    const [useId, setId] = useState<string>()
    const token = Cookies.get('token')

    const verifyInfo = useBtnEdit((state) => {
        const filterForm = state.state.form[`objectLocker`]?.btnEdit || {}
        const values = Object.values(filterForm)
        return values.length > 0 && values.some((x) => x === true && x !== undefined)
    })

    const updateMovement = async () => {

        if (descriptionRef.current.value.length < 2 || descriptionRef.current.value.length > 100) {
            toast.error('El nombre del objeto debe tener como minimo 3 caracteres y maximo 100')
            return
        }
        
        if (!regexFecha.test(entryDateRef.current.value) || entryDateRef.current.value< today) {
            toast.error('Debes seleccionar una fecha válida')
            return
        }
        
        if (!['Entrada', 'Salida'].includes(typeRef.current.value)) {
            toast.error('Tipo de movimiento inválido')
            return
        }
         const status = typeRef.current.value === 'Entrada' ? 'entrance':'output'
        if (useData?.description === descriptionRef.current.value && 
            useData.entryDate === entryDateRef.current.value && 
            useData.type === status) {
            toast.info('No hay cambios para actualizar')
            return
        }

        try {
           
            const response = await axios.patch(
                `https://api.vecii.com.co/api/v1/object-movements/${useId}`,
                {
                    "description": descriptionRef.current.value.trim(),
                    "entryDate": entryDateRef.current.value,
                    "type": status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            
            toast.success('Movimiento actualizado correctamente')
            setContK(useContK + 1)
            setData(response.data)
        } catch (err) {
            console.error(err)
            toast.error('Error al actualizar el movimiento')
        }
    }

    const deleteMovement = async () => {
        try {
            await axios.delete(`https://api.vecii.com.co/api/v1/object-movements/${useId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            toast.success('Movimiento eliminado correctamente')
            setTimeout(() => verifyHistory(), 1000)
            setModal(false)
        } catch (err) {
            console.error(err)
            toast.error('Error al eliminar el movimiento')
        }
    }

    const getData = async (id: string) => {
        try {
            const response = await axios.get(`https://api.vecii.com.co/api/v1/object-movements/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const id = localStorage.getItem('idLocker')
        if(!id) return
        setId(id)
        getData(id)
    }, [token])
   const statusObject = useData?.approvedDate != null ? true:false
    const type = useData?.type === 'entrance' ? true:false
    return (
      <>
          <VeciiHeader
                srcImg="/assets/svg/historial.svg"
                name="Registros"
                transparent = {false}
        />

        <div className='container_objectLocker_info'>
            <div className={`container_objectLocker_info_img ${type ? 'enter':'exit'}`}>
                <img  src={type ? '/assets/svg/sign-in-bold.svg':'/assets/svg/sign-out-bold-white.svg'} alt="Icono registro" />     
            </div>           
            {
                statusObject ? 
                    useData ? 
                   <div className='container_objectLocker_info_aprob'>
                    <p className='container_objectLocker_info_object'>{`Registro ${type?'entrada':'salida'}`}</p>
                    <div className='container_objectLocker_edit_separator'></div>
                    <div className='container_objectLocker_info_items'>
                        <p className='container_objectLocker_info_items_paragraphe'>Nombre del objeto: <span>{useData.description}</span></p>
                        
                        <p className='container_objectLocker_info_items_paragraphe'>Fecha de aprobación: <span className='item_aprob'>{useData.approvedDate}</span></p>
                        <p className='container_objectLocker_info_items_paragraphe'>Fecha de {type ? 'entrada': 'salida'}: <span >{ useData.entryDate}</span></p>
                        
                    </div>
                   </div>
                    
                    :<NoApiData message='Cargando información...'/>

                
                :
                useData ? 
                
                 <div className='container_objectLocker_edit'>
                     <p className='container_objectLocker_info_object'>{`Registro ${type?'entrada':'salida'}`}</p>
                <div className='container_objectLocker_edit_separator'></div>

                        <UpdateData
                            key={`kname:${useContK}`}
                            refElement={descriptionRef}
                            type='text'
                            label='Nombre del objeto'
                            numBtn={1}
                            information={useData?.description || 'Cargando..'}
                            formName='objectLocker'

                         />
                        <UpdateData
                            key={`kdate:${useContK}`}
                            refElement={entryDateRef}
                            type='date'
                            label={`Fecha de ${type ? 'Entrada': 'Salida'}`}
                            numBtn={2}
                            information={useData?.entryDate || 'Cargando..'}
                            formName='objectLocker'
                         />
                         <UpdateOptions
                            key={`kTipe:${useContK}`}
                            label={'Tipo de movimiento'}
                            refElement={typeRef}
                            numBtn={3}
                            formName='objectLocker'
                            option = {type?['Entrada','Salida']:['Salida','Entrada']}
                         />


                <div className='container_objectLocker_btns'>
                    {verifyInfo ? 
                        <button onClick={updateMovement} className='container_objectLocker_btns_send'>
                            <b>Actualizar</b>
                        </button>:''
                    }

                </div>
            </div> :  <NoApiData message='Cargando información...'/>
         
            }
        </div>
      </>
    )
}

export default EditObjectMovement