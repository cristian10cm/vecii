'use client';
import './index.css';
import React, { useEffect, useRef, useState } from 'react';
import http from '@/components/services/http';
import Cookies from 'js-cookie';
import UpdateData from '../updateData/updateData';
import { toast } from 'react-toastify';
import axios from 'axios';
import { datos } from '.';
// import { comprobarDatos } from '.';
// import { cookies } from 'next/headers';

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
    return true

}

const UserInfo = () => {
  
  const [useData, setUseData] = useState<datos | null>(null);
  const id = Cookies.get('id');
  const token = Cookies.get('token');
  const firstName = useRef<HTMLInputElement >(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phoneNumber = useRef<HTMLInputElement>(null);
  const cellPhoneNumber = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log(id);
    const peticion = async () => {
      try {
        const api = await http.get(`users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUseData(api);
      } catch (err) {
        console.error(err);
      }
    };
    peticion();
  }, []);
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
                "email": "johndoe@apartamenteros.com",
                "identificationNumber": "123456789",
                "roles": [
                    "17c64b38-d01a-4b2a-a5dc-cd5f496e5114"
                ],
                "phoneNumber": "60606809",
                "cellPhoneNumber": "3131234567"
           }
        const update = await axios.patch(`https://api.vecii.com.co/api/v1/users/${id}`,body)
        console.log(update)
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
      <div className='container_infoUser_patch'>
        <UpdateData
              label = 'Nombre:' 
              type = 'text'
              refElement = {firstName}
              information=  {useData?.firstName || ''
              
              }
        />
         <UpdateData
              label = 'Apellido:'
              type = 'text'
              refElement = {lastName}
              information=  {useData?.lastName || ''
              
              }
        />
         <UpdateData
              label = 'Correo:'
              type = 'email'
              refElement = {email}
              information=  {useData?.email || ''}
        />
         <UpdateData
              label = 'Teléfono:'
              type = 'tel'
              refElement = {phoneNumber}
              information=  {useData?.phoneNumber || ''
              
              }
        />
         <UpdateData
              label = 'Cel:'
              type = 'tel'
              refElement = {cellPhoneNumber}
              information=  {useData?.cellPhoneNumber || ''
              
              }
        />

      </div>
      <button className='btn_Edit_infoUSer' onClick={()=>enviar()}>
        <b>Editar</b>
      </button>
    </div>
  );
};

export default UserInfo;