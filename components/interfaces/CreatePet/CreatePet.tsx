'use client'
import './index.css'
import axios from 'axios';
import InputForm from '../InputForm/InputForm';
import { useEffect,useState } from 'react';
import Cookies from 'js-cookie';
import { MdOutlinePets,MdOutlinePermContactCalendar,MdDriveFileRenameOutline } from "react-icons/md";
import { typePet,breedPet } from '.';
import { FormEvent } from 'react';
import { setHousing } from '@/components/stores/StoreHousing';
import { toast } from 'react-toastify';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
import { useUpdatePets } from '@/components/stores/storePets';
import InputDate from '../InputDate/InputDate';
const CreatePet =()=>{
    const [useTypePet,setTypePet] = useState<typePet[]>([])
    const [useBreed, setBreed] = useState<breedPet[]>([])
    const [useSelectPet,setSelectPet] = useState<boolean>(false)
    const [useSelectBreed,setSelectBreed] = useState<boolean>(false)
    const {information} = setHousing();
    const {setUpdatePets} = useUpdatePets()
    const OnSub = async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const nombre = formData.get('nombre')?.toString() ?? '';
    const Fecha = formData.get('Fecha')?.toString() ?? '';
    const raza = formData.get('raza')?.toString() ?? '';
    const typePet = formData.get('typePet')?.toString() ?? '';

    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    const today = new Date().toISOString().split('T')[0];

    if(nombre.length < 3 || nombre.length > 30 || !/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇçÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÅåÆæØøß\s]+$/.test(nombre)) {
        toast.error('El nombre ingresado es inválido');
        return;
    }

    if(!regexFecha.test(Fecha) || Fecha >= today) {
        toast.error('La fecha ingresada es inválida');
        return;
    }

    if(raza === '' || raza === 'Cargando..') {
        toast.error('Elige una raza de mascota');
        return;
    }

    if(typePet === '') {
        toast.error('Elige un tipo de mascota');
        return;
    }
    if(raza === '' || raza === 'Selecciona la raza'){
        toast.error('Elige un tipo de raza');
        return;
    }

    try {
        const crearMascota = await axios.post('https://api.vecii.com.co/api/v1/pets',
            {
                name: nombre,
                typeId: typePet,
                birthDate: Fecha,
                housingId: information?.location.housing.id,
                breedId: raza,
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
        console.log(crearMascota)
        toast.success('Mascota creada exitosamente');
    } catch(err) {
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
        <form onSubmit={OnSub} className='container_form_pet'>
            <p className='container_form_pet_title'>Registrar mascota</p>
            <InputForm
                imgIcon='/assets/svg/article.svg'
                placeHolder="Nombre de la mascota"
                // icon={MdOutlinePets}
                typeInput="text"
                nameOnsubmit='nombre'
            />
           
            <InputDate
                typeInput="date"
                nameOnsubmit='Fecha'  
                nameLabel= 'Fecha de cumpleaños'
            />
            <div className='container_form_pet_selects'>
                <span>
                    <IconSvgGradient
                        urlImage='/assets/svg/dog.svg'
                        widthImg='8vw'
                    />
                </span>
                <div className='container_form_pet_containerSelect'>
                   
                    <select className='container_form_pet_select' name='typePet' onChange={(e)=>{
                        setSelectPet(true)
                        const tipo = useTypePet.find(x=>x.id == e.target.value);
                        if(tipo){getBreedsPet(tipo?.id)}}}>
                            <option  disabled = {useSelectPet ? true:false} >Elige el tipo de mascota</option>
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
                            widthImg='8vw'
                        />
                    </span> 
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
            <button className='container_form_btn' type='submit' >Registrar mascota</button>
        </form>
    )
}
export default CreatePet