"use client";
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import './index.css';
import { useEffect, useRef, useState } from 'react';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import { toast } from 'react-toastify';
import InputForm from '@/components/interfaces/InputForm/InputForm';
import { MdDriveFileRenameOutline,MdOutlinePermIdentity,MdOutlinePermContactCalendar,MdCreditCard  } from "react-icons/md";
import axios from 'axios';
import ModalWindow from '@/components/interfaces/ModalWindow/ModalWindow';
import { setHousing } from '@/components/stores/StoreHousing';
import Cookies from 'js-cookie';

const NewVisitor = () => {
    const nameRef = useRef<HTMLInputElement>(null)
    const lasNameRef = useRef<HTMLInputElement>(null)
    const identificationRef = useRef<HTMLInputElement>(null)
    const fechaEntradaRef = useRef<HTMLInputElement>(null)
    const fechaSalidaRef = useRef<HTMLInputElement>(null)
    const [useBoton,setBoton] = useState<boolean>(false)
    const information = setHousing() 
    const crearVisita =async({fechaEntrada,fechaSalida,idVisita}:{fechaEntrada:string,fechaSalida:string,idVisita:string})=>{
            try{
                const post = axios.post('https://api.vecii.com.co/api/v1/visit-logs',
                    {
                          "entryDate": fechaEntrada,
                          "departureDate": fechaSalida,
                          "housingId": information.information?.location.housing.id,
                          "visitorId": idVisita
                    },
                    {
                        headers:{
                            Authorization: `Bearer ${Cookies.get('token')}`,
                            Accept: 'application/json'
                        }
                    }
                )
                console.log((await post).data)
                                
                toast.success('Se registro correctamente la visita')
            }catch(error){
                    console.log(error)
            }}
    const crearVisitante = async()=>{
      const stringRegex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇçÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÅåÆæØøß\s]+$/;
        const numberRegex = /^[\d]+$/;
        if(nameRef.current){
            if(nameRef.current.value.length<=3 || nameRef.current.value.length > 30 || !stringRegex.test(nameRef.current.value)  ){
                        toast.error('El nombre del visitante ingresado es invalido')
                       
                        return 
                }
        }
        if(lasNameRef.current){
            if(lasNameRef.current.value.length<=3 || lasNameRef.current.value.length > 30 || !stringRegex.test(lasNameRef.current.value)  ){
                    toast.error('El Apellido del visitante ingresado es invalido')
                    return 
                }
        }
        if(identificationRef.current){
            if(identificationRef.current.value.length !== 10 || !numberRegex.test(identificationRef.current.value)){
                toast.error("El número de identificación ingresado es inválido");
                return ;   
                }
        }
        if(fechaEntradaRef.current){
            const dateToday = new Date().toISOString().split('T')[0]
            if(fechaEntradaRef.current.value < dateToday ){
                    toast.error('La fecha de ingreso debe ser mayor o igual a la actual')
                    return
            }
        }
         if(fechaSalidaRef.current){
            const dateToday = new Date().toISOString().split('T')[0]
            if(fechaSalidaRef.current.value < dateToday){
                    toast.error('La fecha de salida debe ser mayor o igual a la actual')
                    return
            }
        }
        
            try{
                const registrar = await axios.post('https://api.vecii.com.co/api/v1/visitors',{
                        "firstName": nameRef.current?.value,
                        "lastName": lasNameRef.current?.value,
                        "documentNumber": identificationRef.current?.value,
                        "housingId": "f3a54e33-b898-4d34-8efe-e0fbcb91f681"
                    },
                   { headers:{
                        'Authorization':`Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json',
                    }}
                )
                setBoton(true) 
                const fechaEntrada = fechaEntradaRef.current?.value || ''
                const fechaSalida = fechaSalidaRef.current?.value || ''
                const idVisita = registrar.data.id
                crearVisita({fechaEntrada,fechaSalida,idVisita})
                console.log('okkkk')
                 
            }catch(error){
                toast.error('No se pudo registrar la visita')
            }      
            }
    return (
        <>
            <VeciiHeader
                srcImg='/assets/svg/nuevo ingreso.svg'
                name='Ingreso de visitante'
            />
             {
                useBoton?
                <ModalWindow
                imgIcon='/assets/svg/nuevo ingreso.svg'
                nameUser={`${nameRef.current?.value} ${lasNameRef.current?.value}` || ''}
                date={fechaEntradaRef.current?.value || ''}
                stateBoton = {true}
                code='21313231231'
                title='¡Ingreso exitoso Vecii!'
                />: ''
            }
        
            <div className='container_newVisitor'>
                <h2 className='container_newVisitor_title'>Datos del visitante</h2>
                <div className='separator_newVisitor'></div>
                    <InputForm
                        nameInput='Nombre: '
                        placeHolder='Ejem. Juanita'
                        icon={MdOutlinePermIdentity}
                        refInput={nameRef}
                        typeInput = 'text' 
                    />
                      <InputForm
                        nameInput='Apellido: '
                        placeHolder='Ejem. Perez'
                        icon={MdDriveFileRenameOutline}
                        refInput={lasNameRef}
                        typeInput = {'text'}
                    />
                    <InputForm
                        nameInput='Cedula: '
                        placeHolder='Ejem. 1234567890'
                        icon={MdCreditCard}
                        refInput={identificationRef}
                        typeInput = {'text'}
                    /> 
                    <InputForm
                        nameInput='Fecha de ingreso: '
                        placeHolder=''
                        icon={MdOutlinePermContactCalendar}
                        refInput={fechaEntradaRef}
                        typeInput = {'date'}
                    /> 
                    <InputForm
                        nameInput='Fecha de salida: '
                        placeHolder=''
                        icon={MdOutlinePermContactCalendar}
                        refInput={fechaSalidaRef}
                        typeInput = {'date'}
                    /> 
                  
                    <button className='container_newVisitor_btn' onClick={crearVisitante} >Registrar visita</button>
            </div>
            <FooterFantasma/>
        </>
    )
    }

;
export default NewVisitor