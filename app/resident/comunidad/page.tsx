'use client'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import './index.css';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import ComunityService from '@/components/interfaces/ComunityService/ComunityService';
import Cookies from 'js-cookie';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useEffect,useState } from 'react';

import axios from 'axios';
const Comunidad = () => {
    const [useServicios,setServicios] = useState<any[]>([])
    const cookie = Cookies ;
    const {setInformation} = useSearchBar()
    const information = useSearchBar() ;
    useEffect(()=>{
          setInformation({
            inputValue:''
          })
          const peticionRes = async ()=>{
              try{
                  const peticion = await axios.get('https://api.vecii.com.co/api/v1/community-services',
                      {
                        headers:{
                          'Authorization':`Bearer ${cookie.get('token')}`
                      },
                         params:{
                            'type':'community'
                      }
              });
                  setServicios(peticion.data.results)

              }catch(error){
                  console.log(error)
              }
          }
            peticionRes()
            console.log(useServicios)
          },[])
    const data = useServicios.filter((e)=>e.title.toLocaleLowerCase().trim().includes((information.information?.inputValue)?.toLocaleLowerCase().trim() || ''))
    return (
        <>
            <VeciiHeaderImg
                srcImg='https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                name='Comunidad'
                detail='Conjunto nombre'
            />
            <SearchBar
                placeholder=''
            />
            <OpcionBox
                path1=''
                path2='/resident/mi-hogar/mis-servicios/'
                nameBox1='Servicios'
                nameBox2='Mis servicios'
            />
            <div className='container_serviciosComunitarios' >
         
                  { data.length>0 ? 
                        data.map((info,k)=>(
                            <ComunityService
                                imgServicio= 'https://todocedritos.com/servicio_domicilio_supermercado_barrio_cedritos_bogota/fruver_belmira_supermercado_fruteria_barrio_belmira_cedritos_norte_bogota_2b.jpg'
                                nameServicio= {info.title}
                              precioServicio='5000'
                                key={k}
                            />
                        )) :
                  <ComunityService
                    imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                    nameServicio='No encontrado'
                    precioServicio='0000'
                />}
          
            </div>
            <FooterFantasma/>
        </>
    )
}

export default Comunidad