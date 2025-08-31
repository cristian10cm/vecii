"use client";
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import './index.css';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import InputForm from '@/components/interfaces/InputForm/InputForm';
// import { MdDriveFileRenameOutline,MdOutlinePermIdentity,MdOutlinePermContactCalendar,MdCreditCard,MdOutlineDataSaverOff   } from "react-icons/md";
import axios from 'axios';
import ModalWindow from '@/components/interfaces/ModalWindow/ModalWindow';
import { setHousing } from '@/components/stores/StoreHousing';
import Cookies from 'js-cookie';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import InputDate from '@/components/interfaces/InputDate/InputDate';
import { cleanForm } from './index';
const NewVisitor = () => {
    const nameRef = useRef<HTMLInputElement>(null!)
    const lasNameRef = useRef<HTMLInputElement>(null!)
    const identificationRef = useRef<HTMLInputElement>(null!)
    const fechaEntradaRef = useRef<HTMLInputElement>(null!)
    const fechaSalidaRef = useRef<HTMLInputElement>(null!)
    const [useBoton,setBoton] = useState<boolean>(false);
    const [useLoading,setLoading] = useState<boolean>(true)
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
            
    const crearVisitante = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
      const stringRegex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇçÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÅåÆæØøß\s]+$/;
      const dateToday = new Date().toISOString().split('T')[0]
        const numberRegex = /^[\d]+$/;
        if(nameRef.current){
            if(nameRef.current.value.length<=2 || nameRef.current.value.length > 30 || !stringRegex.test(nameRef.current.value)  ){
                        toast.error('El nombre del visitante ingresado es invalido')
                        return 
                }
        }
        if(lasNameRef.current){
            if(lasNameRef.current.value.length<=2 || lasNameRef.current.value.length > 30 || !stringRegex.test(lasNameRef.current.value)  ){
                    toast.error('El Apellido del visitante ingresado es invalido')
                    return 
                }
        }
        if(identificationRef.current){
            if(identificationRef.current.value.length <7 || identificationRef.current.value.length >10  || !numberRegex.test(identificationRef.current.value)){
                toast.error("El número de identificación ingresado es inválido");
                return ;   
                }
        }
        if(fechaEntradaRef.current){
            if(fechaEntradaRef.current.value < dateToday ){
                    toast.error('La fecha de ingreso debe ser mayor o igual a la actual')
                    return
            }
        }
         if(fechaSalidaRef.current && fechaEntradaRef.current){
            
            if(fechaSalidaRef.current.value < dateToday ||fechaSalidaRef.current.value < fechaEntradaRef.current?.value ){
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
                setLoading(false)
                const fechaEntrada = fechaEntradaRef.current?.value || ''
                const fechaSalida = fechaSalidaRef.current?.value || ''
                const idVisita = registrar.data.id
                crearVisita({fechaEntrada,fechaSalida,idVisita})   
                
                
            }catch(error){
                toast.error('No se pudo registrar la visita')
            }      
            }
            const  onClose = (data:boolean)=>{
                    setBoton(data)
                    cleanForm(nameRef,lasNameRef,fechaEntradaRef,fechaSalidaRef,identificationRef,data)
            }
     return (
        <>
            <VeciiHeader
                srcImg='/assets/svg/nuevo ingreso.svg'
                name='Ingreso de visitante'
                transparent = {true} 
            />
             {
                useBoton ?
                <ModalWindow
                imgIcon='/assets/svg/nuevo ingreso.svg'
                nameUser={`${nameRef.current?.value} ${lasNameRef.current?.value}` || 'Cargando..'}
                date={fechaEntradaRef.current?.value || 'Cargando..'}
                onClose={onClose}
                code='21313231231'
                title='¡Ingreso exitoso Vecii!'
                />: ''
            }
        
            <form className='container_newVisitor' onSubmit={crearVisitante}>
                <h2 className='container_newVisitor_title'>Datos del visitante</h2>
                <div className='separator_newVisitor'></div>
                    <InputForm
                        nameLabel='Nombre del visitante'
                        placeHolder='Nombre'
                        // icon={MdOutlinePermIdentity}
                        imgIcon='/assets/svg/user-circle.svg'
                        refInput={nameRef}
                        typeInput = 'text' 
                    />
                      <InputForm
                      nameLabel='Apellido del visitante'
                        placeHolder='Apellido'
                        // icon={MdDriveFileRenameOutline}
                        refInput={lasNameRef}
                        typeInput = {'text'}
                         imgIcon='/assets/svg/pencil-simple.svg'
                    />
                    <InputForm
                        nameLabel='Identificación del visitante '
                        placeHolder='Ejem. 1234567890'
                         imgIcon='/assets/svg/identification-card.svg'
                        // icon={MdCreditCard}
                        refInput={identificationRef}
                        typeInput = {'text'}
                    /> 
                    <InputForm    
                        imgIcon='/assets/svg/sign-in-bold.svg'
                        typeInput= 'date'
                        refInput= {fechaEntradaRef}
                        nameOnsubmit= {'fechaIngreso'}
                        nameLabel={'Fecha de ingreso'}
                    />
                    <InputForm    
                        imgIcon='/assets/svg/sign-out-bold.svg'
                        typeInput= 'date'
                        refInput= {fechaSalidaRef}
                        nameOnsubmit= {'fechaSalida'}
                        nameLabel={'Fecha de salida'}
                    />

                  
                    <button className='container_newVisitor_btn' >
                        {useLoading?'Registrar visita':'Realizar otro registro'}
                    </button>
            </form>
            <FooterFantasma/>
        </>
    )
    }

;
export default NewVisitor