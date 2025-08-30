'use client'
import './index.css'
import axios from 'axios';
import InputForm from '../InputForm/InputForm';
import { useEffect,useRef,useState } from 'react';
import Cookies from 'js-cookie';
import { MdOutlinePets,MdOutlinePermContactCalendar,MdDriveFileRenameOutline } from "react-icons/md";
import { typePet,breedPet } from '.';
import { FormEvent } from 'react';
import { setHousing } from '@/components/stores/StoreHousing';
import { toast } from 'react-toastify';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
import { useUpdatePets } from '@/components/stores/storePets';
import InputDate from '../InputDate/InputDate';
import FooterFantasma from '../footerFantasma/FooterFantasma';

const CreatePet =()=>{
    const [useTypePet,setTypePet] = useState<typePet[]>([])
    const [useBreed, setBreed] = useState<breedPet[]>([])
    const [useSelectPet,setSelectPet] = useState<boolean>(false)
    const [useSend,setSend] = useState<boolean>(false)
    const [useSelectBreed,setSelectBreed] = useState<boolean>(false)
    const {information} = setHousing();
    const {setUpdatePets} = useUpdatePets()
    const OnSub = async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const {nombre,Fecha,typePet,raza} = event.target as HTMLFormElement;
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    let today = new Date().toISOString().split('T')[0];

    if(nombre.value.length < 3 || nombre.value.length > 30 || !/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇçÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÅåÆæØøß\s]+$/.test(nombre.value)) {
        toast.error('El nombre ingresado es inválido');
        console.log(nombre.value)
        return;
    }

    if(!regexFecha.test(Fecha.value) || Fecha.value >= today) {
        toast.error('La fecha ingresada es inválida');
        return;
    }
    if(typePet.value === '' || typePet.value === 'Elige el tipo de mascota') {
        toast.error('Elige un tipo de mascota');
        return;
    }
    if(raza.value === '' || raza.value === 'Selecciona la raza') {
        toast.error('Elige una raza de mascota');
        return;
    }

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    };
    try {
        const crearMascota = await axios.post('https://api.vecii.com.co/api/v1/pets',
            {
                name: nombre.value,
                typeId: typePet.value,
                birthDate: Fecha.value,
                housingId: information?.location.housing.id,
                breedId: raza.value,
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        setUpdatePets({
            state: crearMascota.data.id,
        });
        setSend(true)
        nombre.value = ''
        Fecha.value = ''
        typePet.value = 'Elige el tipo de mascota'
        raza.value = 'Selecciona la raza'
        toast.success('Mascota creada exitosamente');
        setTimeout(()=>{
            scrollToBottom()
        },500)
    } catch(err) {
        console.log(typePet.value)
        console.log(raza.value)
        toast.error('No se pudo crear la mascota..');
    }
};


    const getBreedsPet = async (id:string)=>{
        try{
        const peticion = await axios.get('https://api.vecii.com.co/api/v1/breeds',
            {
                headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                },
                params:{
                    petTypeId:id
                }})
            const data =await peticion.data

            setBreed(data.results)
                
            
        }catch(err){
        console.log(err)
        }
    }
    useEffect(()=>{
          const getTypePet = async()=>{
                try{
                      const peticion = axios.get('https://api.vecii.com.co/api/v1/pet-types',
                        {
                        headers:{
                        Authorization:`Bearer ${Cookies.get('token')}`
                        }})
                        const data = (await peticion)
                        setTypePet(data.data)
                        
                }catch(error){
                    console.log(error)
                }
          }
        getTypePet()
        
    },[])

    return(
     
     <>
           <form onSubmit={OnSub} className='container_form_pet'>
            <p className='container_form_pet_title'>Registrar mascota</p>
            <div className='container_form_pet_separator'></div>
            <InputForm
                imgIcon='/assets/svg/article.svg'
                placeHolder="Escribe un nombre"
                nameLabel='Nombre de la mascota'
                // icon={MdOutlinePets}
                typeInput="text"
                nameOnsubmit='nombre'
            />
                <InputForm
                typeInput="date"
                nameOnsubmit='Fecha'  
                nameLabel= 'Fecha de cumpleaños'
                   imgIcon='/assets/svg/cake.svg'
                // icon={MdOutlinePets}
            />
            {/* <InputDate
                typeInput="date"
                nameOnsubmit='Fecha'  
                nameLabel= 'Fecha de cumpleaños'
            /> */}
            <div className='container_form_pet_selects'>
                <span>
                    <IconSvgGradient
                        urlImage='/assets/svg/bone-bold.svg'
                        widthImg='7vw'
                    />
                </span>
                <label className='container_form_pet_selects_label'>Tipo de mascota</label>
                <div className='container_form_pet_containerSelect'>
                    <select className='container_form_pet_select'  name='typePet' onChange={(e)=>{
                        setSelectPet(true)
                        const tipo = useTypePet.find(x=>x.id == e.target.value);
                        if(tipo){getBreedsPet(tipo?.id)}}}>
                            <option  disabled = {useSelectPet ? true:false} >Elige un tipo</option>
                            {useTypePet.map((x,k)=>(
                            <option value={x.id} data-name={x.name} key={k}>{x.name}</option>
                        ))}
                    </select>
                </div>

            </div>
            {
             useBreed.length>0 ? 
                 
                <div className='container_form_pet_selects container_form_pet_selects_breed '>
                    <span>
                        <IconSvgGradient
                            urlImage='/assets/svg/paw-print.svg'
                            widthImg='7vw'
                        />
                    </span> 
                    <label className='container_form_pet_selects_label'>Raza de mascota</label>
                    <div className='container_form_pet_containerSelect'>  
                              
                        <select className='container_form_pet_select'  onClick={()=>setSelectBreed(true)} name='raza'>  
                            <option disabled = {useSelectBreed ? true:false}  >Selecciona la raza</option>
                            {  useBreed.map((x,k)=>(
                            <option value={x.id} key={k}>{x.name}</option>
                            ))}
                        </select>
                    </div>

                </div>:''
            }
            <button className='container_form_btn' type='submit' >{useSend ? 'Registrar otra mascota':'Registrar mascota'}</button>
   
      
        </form>
     </>
    )
}
export default CreatePet