'use client';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { breedPet } from '../CreatePet';
import UpdateData from '../updateData/updateData';
import Cookies from 'js-cookie';
import { FaRegEdit } from 'react-icons/fa';
import { useBtnEdit } from '@/components/stores/storeEditInput';
import { toast } from 'react-toastify';
import { useUpdatePets } from '@/components/stores/storePets';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
import UpdateSelect from '../SelectBreed/SelectBreed';
type PetsComponentsProps = {
  srcImg: string;
  name: string;
  year: string;
  idType: string;
  breed: string;
  idBreed: string;
  idPet:string;

};

const PetsComponents = ({
  srcImg,
  name,
  year,
  breed,
  idPet,

  idType,
  idBreed
}: PetsComponentsProps) => {
   const [useReset,setReset] = useState<number>(0)
   const {setUpdatePets,count} = useUpdatePets()
  const [useBreed, setBreed] = useState<breedPet[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const añosRef = useRef<HTMLInputElement>(null);
  const refRaza = useRef<HTMLSelectElement>(null);
  const [useDeletePet, setDeletePet] = useState<Boolean>(false)
  const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
  const today = new Date().toISOString().split('T')[0];
  const [useEdit,setEdit] = useState<boolean>(false);
  const stringRegex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇçÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÅåÆæØøß\s]+$/;
  const actualizarDatos = (
    ref: React.RefObject<HTMLSelectElement | null>
  ) => {
    if (ref.current) {
      setEdit(!useEdit)
        ref.current.disabled = useEdit;
  
    }
    console.log('ok');
  };
    const getBreeds = async () => {
      try {
        const peticion = await axios.get(
          'https://api.vecii.com.co/api/v1/breeds',
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`
            },
            params: {
              petTypeId: idType
            }
          }
        );
        const data = await peticion.data;
        setBreed(data.results);
      } catch (err) {
        console.log(err);
      }
    };
   const verifyInfo = useBtnEdit((state)=>{
          const filterForm = state.state.form[`pet:${idPet}`]?.btnEdit || {}
          const values = Object.values(filterForm)
           return values.length >0 && values.some((x)=>x === true && x !== undefined) 
   })
  const deletePet =async ()=>{
    try{
        const detete = await axios.delete(`https://api.vecii.com.co/api/v1/pets/${idPet}`,
            {headers:{
                Authorization:`Bearer ${Cookies.get('token')}`
            }}
        )
        console.log(detete)
        toast.success('Mascota eliminada correctamente')
        setUpdatePets({
                state:useReset+5*Math.random()*3
            })
            }catch{
         
        toast.error('Error al eliminar mascota')
    }
    setDeletePet(false)
  }
  const editPet =async()=>{
        if(nameRef.current && refRaza.current && añosRef.current){
          if(nameRef.current.value == name && refRaza.current.value == idBreed && añosRef.current.value == year){
            toast.info('Modifica algun campo para actualizar.')
            return
          }
        }
        if(nameRef.current){
            if(nameRef.current.value.length<=2 || nameRef.current.value.length > 30 || !stringRegex.test(nameRef.current.value)){
                toast.error('El nombre ingresado es invalido')
                return 
            }
        }
        if (refRaza.current) {
            const raza = refRaza.current.value;
            if (!raza || raza === 'Cargando..') {
            toast.error('Selecciona una raza');
            return ;
                }
            }

        if(añosRef.current){
            if(!regexFecha.test(añosRef.current?.value) || '' || añosRef.current?.value>= today){
            toast.error('La fecha ingresada es invalido')
            return 
            }
        }
        try{
            const uptadePet = await axios.patch(`https://api.vecii.com.co/api/v1/pets/${idPet}`,
                    {
                            "name": nameRef.current?.value,
                            "typeId": idType,
                            "birthDate": añosRef.current?.value,
                            "breedId": refRaza.current?.value
                    },
                    {
                        headers:{
                            Authorization:`Bearer ${Cookies.get('token')}`
                        }
                    }
            )
            actualizarDatos(refRaza)
            console.log(uptadePet)
            toast.success('¡Mascota actualiza!')
            setReset(useReset+1)
        }catch(error){
            toast.error('No se pudo actualizar tu mascota')
           
        }

  }

  useEffect(() => {
    if(refRaza.current){
      refRaza.current.value = idBreed 
      console.log(refRaza.current.value)
    }
    getBreeds();
  }, [refRaza.current?.value]);
  
  return (
    <div className='PetComponent_container'>
      <img src={srcImg} className='PetComponent_imgPet' />
      <div className='PetComponent_containerInfo'>
        <UpdateData
          formName={`pet:${idPet}`}
          numBtn={1}
          key={'kname'+useReset+idPet}
          type='text'
          refElement={nameRef}
          information={name}
          label='Nombre:'
        />
        <UpdateData
          key={'kdate'+useReset+idPet}
          formName={`pet:${idPet}`}
          numBtn={2}
          type='date'
          refElement={añosRef}
          information={year}
          label='Fech. Nac:'
          
        />
       <UpdateSelect
          key={'kbreed'+useReset+idPet}
          formName={`pet:${idPet}`}
          numBtn={3}
          refElement={refRaza}
          information={year}
          label='Raza:'  
          breed={useBreed}
       />


          {
            verifyInfo ?
             <button className='container_editPet_btn'onClick={editPet}>Editar</button>:''
          }
      <button className='container_deletePet_btn' onClick={()=>setDeletePet(true)}>Eliminar</button>
      </div>

        {
            useDeletePet ? 
            <div className='modal_deletePet'>
               <div className='modal_deletePet_info'>
                 <p>{`Estas Seguro de eliminar a ${nameRef.current?.value} de tus mascotas`} </p>
                <div className='modal_deletePet_btns'>
                    <button className='modal_deletePet_delete' onClick={deletePet}>Eliminar</button>
                    <button className='modal_deletePet_cancel' onClick={()=>setDeletePet(false)}>Cancelar</button>
                </div>
               </div>
            </div>
            :''
        }
    </div>
  );
};

export default PetsComponents;