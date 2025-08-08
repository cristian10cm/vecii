'use client'
import './index.css';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import LockerPublicService from '@/components/interfaces/LockerPublicService/LockerPublicService';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useEffect, useState } from 'react';
import { setHousing } from '@/components/stores/StoreHousing';
import axios from 'axios';
import { servicesType,packageItem } from '.';
import Cookies from 'js-cookie';
const Buzon = () => {
  const housingId = setHousing().information?.location.housing.id
  const information = useSearchBar().information?.inputValue;

  const [useServices,setServices] = useState<servicesType[]>([])
  const [usePackage,setPackage] = useState<packageItem[]>([])
  const [useBoton,setBoton] = useState<boolean>(false)
  const token = Cookies.get('token')
  const getServices = async(idLocker:string)=>{
      try{
        const peticion = await axios.get(`https://api.vecii.com.co/api/v1/lockers/${idLocker}/items`,{
          headers:{
            Authorization:`Bearer ${token}`
          },
          params:{
            type:'invoices'
          }
        })
        const {data} = peticion
        setServices(data.results)
      }catch(err){
        console.log(err)
      }
  }
    const getPackages = async(idLocker:string)=>{
      try{
        const peticion = await axios.get(`https://api.vecii.com.co/api/v1/lockers/${idLocker}/items`,{
          headers:{
            Authorization:`Bearer ${token}`
          },
          params:{
            type:'packages'
          }
        })
        const {data} = peticion
        setPackage(data.results)
      }catch(err){
        console.log(err)
      }
  }
  const changeOption = (data:boolean)=>{
    setBoton(data)
  }
    useEffect(()=>{
      
      if(!housingId) return
      const callApis =async()=>{
        try{
           const getLocker = await axios.get(`https://api.vecii.com.co/api/v1/housing/${housingId}/locker`,
            {
              headers:{
              Authorization:`Bearer ${token}`
            }
            }
          )
          const lockerId = getLocker.data[0].id

          await getServices(lockerId)   
          await getPackages(lockerId)      
        }catch(err){
          console.log(err)
        }
      }
      callApis()
    },[housingId,token])
    const services = useServices.filter((x)=>x.description.toLowerCase().trim().includes(information?.toLowerCase().trim() || ''))
    const packages = usePackage.filter((x)=>x.description.toLowerCase().trim().includes(information?.toLowerCase().trim() || ''))
    return(
        <>
            <VeciiHeaderImg
                srcImg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvNZVE68kVo2kW_kB5LIeZyRFGUneucdFPCg&s'
                name='Buzón'
                detail='Casa 38'
            />
              <SearchBar
                  placeholder=''
           />
            <OpcionBox
                    nameBox1='Servicios publicos'
                    nameBox2='Paqueteria'
                    onClickDato={changeOption}
            />
            <div className='containerServices' >
                {
                  !useBoton ?
                  useServices?.length >0?
                    services.length>0?
                    services?.map((x,k)=>(
                        <LockerPublicService
                          dataFalse='No recibido'
                          dataTrue='Recibido'
                          nameServicio={x.description || 'Cargando..'}
                          fechaServicio={'20/25/2025'}
                          imgServicio='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSryvVofo68EvMAaGepDFtzmuJ49qDUZ54Kgw&s'
                          stateServicio={x.status == 'pending' ? false: true}
                          key={k}
                    />
                    )):
                      <LockerPublicService
                          dataFalse='No recibido'
                          dataTrue='Recibido'
                          nameServicio={'No encontrado'}
                          fechaServicio={'00/00/00'}
                          imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                          stateServicio={false}
                    />
                   :
                   <div className='containerServices_anyItem'>! No tienes ninguna factura en el buzon ! </div>
                :
                  usePackage?.length>0?
                    packages.length>0?
                      packages.map((x,k)=>(
                        <LockerPublicService
                         dataFalse='No recibido'
                          dataTrue='Recibido'
                          nameServicio={x.description || 'Cargando..'}
                          fechaServicio={'20/25/2025'}
                          imgServicio='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiK7SXYrBCQUOqJUlyFX6Cu3KhcBLMnsC0dg&s'
                          stateServicio={x.status == 'pending' ? false: true}
                          key={k}
                      />
                    )): <LockerPublicService
                     dataFalse='No recibido'
                          dataTrue='Recibido'
                          nameServicio={'No encontrado'}
                          fechaServicio={'00/00/00'}
                          imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                          stateServicio={false}
                    />:
                    <div className='containerServices_anyItem'>! No tienes ningun paquete en el buzon ! </div>

                }
            </div>
            <FooterFantasma/>
        </>
    );

};

export default Buzon