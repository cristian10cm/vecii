'use client';
import './index.css';
import React, { useEffect, useRef, useState } from 'react';
import http from '@/components/services/http';
import Cookies from 'js-cookie';
import UpdateData from '../updateData/updateData';
import { toast } from 'react-toastify';
import axios from 'axios';
import { datos } from '.';
import { useBtnEdit } from '@/components/stores/storeEditInput';
import { setHousing } from '@/components/stores/StoreHousing';

const UserInfo = () => {
  const comprobarDatos = (name:string,lastName:string,email:string,phone:string,cel:string):boolean =>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const stringRegex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇçÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÅåÆæØøß\s]+$/;
  const numberRegex = /^[\d]+$/;

    if(name.length<=3 || name.length > 30 || !stringRegex.test(name)  ){
            toast.error('El nombre ingresado es invalido')
            return false
    }
    if(lastName.length<=3 || lastName.length > 30 || !stringRegex.test(lastName)  ){
            toast.error('El Apellido ingresado es invalido')
            return false
    }
    
    if (!emailRegex.test(email)) {
            toast.error("El correo electrónico ingresado es inválido");
            return false;
    }
    if(phone.length < 6 || phone.length >10 || !numberRegex.test(phone)){
            toast.error("El teléfono ingresado es inválido");
            return false;
    } 
    if(cel.length !== 10 || !numberRegex.test(cel)){
            toast.error("El número de celular ingresado es inválido");
            return false;
    }
    if(cel == useData?.cellPhoneNumber && phone == useData.phoneNumber  && email == useData.email && lastName == useData.lastName && name==useData.firstName ){
        toast.info('Edita algún campo para actulizar')
        return false
    }
    return true

}
  const [useData, setUseData] = useState<datos | null>(null);
  const id = Cookies.get('id');
  const token = Cookies.get('token');
  const firstName = useRef<HTMLInputElement >(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

    const phoneNumber = useRef<HTMLInputElement>(null);
  const cellPhoneNumber = useRef<HTMLInputElement>(null);
  const [useReset,setReset] = useState<number>(0)
 const verifyInfo = useBtnEdit((state)=>{
          const filterForm = state.state.form[`usuario`]?.btnEdit || {}
          const values = Object.values(filterForm)
           return values.length >0 && values.some((x)=>x === true && x !== undefined) 
   })
  // useEffect(()=>{
  //     if(verifyInfos){
  //       console.log("asadsad"+verifyInfo)
     
  //     }
  // },[verifyInfos])
  useEffect(() => {
      if (!id || !token) return;

    const peticion = async () => {
      try {
        const api = await http.get(`users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(api)
        setUseData(api);
      } catch (err) {
        console.error(err);
      }
    };
    peticion();
  }, [id,token]);
const enviar = async ()=>{
  if(firstName.current && lastName.current && email.current && phoneNumber.current && cellPhoneNumber.current){
      if(!comprobarDatos(firstName.current.value,lastName.current.value,email.current.value,phoneNumber.current.value,cellPhoneNumber.current.value)){
          return
      }
  }
    try{
        const body = {
               "firstName": firstName.current?.value,
                "lastName":  lastName.current?.value,
                "email": email.current?.value,
                "identificationNumber": '01101111212',
                "roles": [
                    "17c64b38-d01a-4b2a-a5dc-cd5f496e5114"
                ],
                "phoneNumber": phoneNumber.current?.value,
                "cellPhoneNumber": cellPhoneNumber.current?.value
           }
        const update = await axios.patch(`https://api.vecii.com.co/api/v1/users/${id}`,body)
        console.log(update)
        if(update){
          setReset(x=>x+1)
        }
      
    } catch(error){
        toast.error('Ocurrio algo, no se pudo actualizar datos')
        console.log(error)
    }
  toast.success('Datos Actualizados correctamente')
} 

  return (
   
    <div className='container_infoUser'>
      <img
        className='container_infoUser_avatar'
        src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D'
      />
      <h2 className='container_infoUser_title'>Torre 2 -103</h2>
      { 
        useData?<div className='container_infoUser_patch'>
        <UpdateData
              key={'Nombre: '+useReset}
              numBtn={1}
              label = 'Nombre:' 
              type = 'text'
              refElement = {firstName}
              information=  {useData?.firstName || 'Cargando..'
              }
              formName='usuario'
        />
         <UpdateData
         key={'Apellido: ' +useReset}
              numBtn={2}
              label = 'Apellido:'
              type = 'text'
              refElement = {lastName}
              information=  {useData?.lastName || 'Cargando..'  
              }
              formName='usuario'
        />
         <UpdateData
         key={'Correo: '+useReset}
         formName='usuario'
              numBtn={3}
              label = 'Correo:'
              type = 'email'
              refElement = {email}
              information=  {useData?.email || 'Cargando..'}
        />
         <UpdateData
         key={'Telefono: '+ useReset}
         formName='usuario'
              numBtn={4}
              label = 'Teléfono:'
              type = 'tel'
              refElement = {phoneNumber}
              information=  {useData?.phoneNumber || 'Cargando..'
              
              }
        />
         <UpdateData
         key={'Cel: '+useReset}
         formName='usuario'
              numBtn={5}
              label = 'Cel:'
              type = 'tel'
              refElement = {cellPhoneNumber}
              information=  {useData?.cellPhoneNumber || 'Cargando..'
              
              }
        />

      </div>:
      <p className='load_infoUser'>Cargando información...</p>
      }
      { verifyInfo ? 
        <button className='btn_Edit_infoUSer btn-form' onClick={()=>enviar()}>
            <b>Editar</b>
        </button>:''

      }
    </div>
  );
};

export default UserInfo;