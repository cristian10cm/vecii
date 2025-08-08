"use client";
import { useEffect, useState,useRef } from 'react';
import { toast } from 'react-toastify';
import './index.css';
import { setHousing } from '@/components/stores/StoreHousing';
import InputForm from '@/components/interfaces/InputForm/InputForm';
// import { MdDriveFileRenameOutline,MdOutlinePermIdentity,MdAddBox  } from "react-icons/md";
import axios from 'axios';
import Cookies from 'js-cookie';
import InputDate from '@/components/interfaces/InputDate/InputDate';
import { FormEvent } from 'react';
const stringRegex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇçÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÅåÆæØøß\s]+$/;
const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
const today = new Date().toISOString().split('T')[0];

const ObjectEntryExit = ({typeRegister}:{typeRegister:'Entrada' | 'Salida'}) => {
    const register = typeRegister == 'Entrada' ? true:false
    const hounsingId = setHousing().information?.location.housing.id
    const createEntrance = async(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const {nombre,apellido,descripcion,fecha} = event.target as HTMLFormElement;
         if(nombre.value.length<=2 || nombre.value.length > 30 || !stringRegex.test(nombre.value)  ){
            toast.error('El nombre ingresado es invalido')
            return 
    }
    if(apellido.value.length<=2 || apellido.value.length > 30 || !stringRegex.test(apellido.value)  ){
            toast.error('El Apellido ingresado es invalido')
            return 
    }
   
    if (descripcion.value.length <= 3 || descripcion.value.length > 100) {
            toast.error('La longitud de la descripción del objeto debe ser de mínimo 4 caracteres y máximo 100.');
            return;
    }
       if(!regexFecha.test(fecha.value) || fecha.value < today) {
        console.log(fecha.value)
        toast.error('La fecha ingresada es inválida');
        return;
    }
    

        try{
            const create = await axios.post(`https://api.vecii.com.co/api/v1/object-movements`,
                {
                    "description": descripcion.value,
                    "entryDate": fecha.value,
                    "type": register ? 'entrance' :'output',
                    "housingId": hounsingId
                },
                {
                    headers:{
                        Authorization:`Bearer ${Cookies.get('token')}`
                    }
                }
            )
            console.log(create)
        }catch(err){
            console.log(hounsingId)
            console.log(fecha.value)
            console.log(err)
        }
    }


    return (
        
            <div className='container_newObject'>

                <h2 className='container_newObject_title'>{register ? 'Ingreso de objetos' : 'Salida de objetos' }</h2>

                <div className='separator_newObject'></div>

                <form action="" className='container_newObject_form' onSubmit={createEntrance}>
                      <InputForm
                        placeHolder='Nombre de quien autoriza'
                        // icon={MdOutlinePermIdentity}
                        imgIcon='/assets/svg/user-circle.svg'
                        typeInput = 'text' 
                        nameOnsubmit='nombre'
                        
                    />
                      <InputForm
                        placeHolder='Apellido de quien autoriza'
                        // icon={MdDriveFileRenameOutline}
                        imgIcon='/assets/svg/pencil-simple.svg'
                        typeInput = {'text'}
                        nameOnsubmit='apellido'
                    />
                     <InputForm
                        placeHolder={register ? 'Objeto a ingresar' : 'Objeto a salir'}
                        // icon={MdAddBox}
                        imgIcon='/assets/svg/cube.svg'
                        typeInput = {'text'}
                        nameOnsubmit='descripcion'
                    />
                   <InputDate
                        typeInput= 'date'
                        nameOnsubmit= {'fecha'}
                        nameLabel={register?'Fecha de ingreso': 'Fecha de salida'}
                    />
                 
                     {/* <div className='newIncome_testArea'>
                        <span className='newIncome_testArea_icon'>
                            <MdAddBox/>
                        </span>
                        <textarea   placeholder='Objetos a ingresar' name="descripcion" id=""></textarea>
                    </div> */}
                    <button className='container_newObject_inputs_btn' type='submit'>Registrar {register?'ingreso':'salida'}</button>
         
                </form>
              
            </div>
    )

}

export default ObjectEntryExit;