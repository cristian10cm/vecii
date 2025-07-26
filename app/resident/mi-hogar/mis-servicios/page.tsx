'use client'
import './index.css';
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import ServicesAvaible from '@/components/interfaces/ServiceAvaible/ServicesAvaible';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import { useSearchBar } from '@/components/stores/storeSearch';
import axios from 'axios';
import Cookies from 'js-cookie';
import {  useEffect, useState } from 'react';
const MisServicios = () => {
    // const [inputValue,setInputValue] = useState<string>('');
    const [useStore, setStore] = useState<any[]>([])
    const {setInformation} =  useSearchBar() 
    const data = useSearchBar();
    const information = data.information?.inputValue || '';
    useEffect(()=>{
        setInformation({
             inputValue: ''
        })
        const peticionApi =async  ()=>{
            try{
                const peticion = await axios.get('https://api.vecii.com.co/api/v1/stores/search/nearby',{
                headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                }})
                setStore(peticion.data.results)
                
            }catch(error){
                console.log(error)
            }
        }
        peticionApi()
        
    },[])
    const tiendas = useStore.filter((e)=>e.name.toLowerCase().trim().includes(information.toLocaleLowerCase().trim()))

    return(
        <>
            <VeciiHeader
                srcImg='/assets/svg/mis servicios.svg'
                name='Mis Servicios'
            />
            <SearchBar placeholder='Nombre del servicio'/>
            <OpcionBox
                nameBox1= 'Tomados'
                nameBox2= 'Publicados'
                path1=''
                path2=''
             
            />
            <div className='grid_services_options color'>
                {
                    tiendas.length > 0 ?
                    tiendas.map((e,index)=>
                        <ServicesAvaible
                            srcImg = 'https://i.pinimg.com/736x/3f/41/9a/3f419ad9fc2a61ba45cf680b07513f24.jpg'
                            name=  {e.name}
                            idStore={e.id}
                            key= {index}
                        />
                    ):
                    <ServicesAvaible
                            srcImg = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                            name=  'No encontrado'
                            idStore=''
                    />

                }
            </div>
            <FooterFantasma/>
        </>
    )

};

export default MisServicios;