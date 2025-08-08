"use client";
import './index.css'
import SearchBar from "@/components/interfaces/SearchBar/SearchBar";
import VeciiHeader from "@/components/interfaces/VeciiHeader/VeciiHeader";
import VisitorRegistries from '@/components/interfaces/VisitorRegistries/VisitorRegistries';
import { useEffect, useState } from "react";
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import Cookies from 'js-cookie';
import axios from 'axios';
import { setHousing } from '@/components/stores/StoreHousing';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import { useSearchBar } from '@/components/stores/storeSearch';
import LockerPublicService from '@/components/interfaces/LockerPublicService/LockerPublicService';
type visitor ={
departureDate: string ,
entryDate: string,
housingLocation: string,
id: string,
status: string,
visitor: string
}
type packages ={
      id: "5c804a3d-1d6e-449a-bedf-6bdc3034c4cf",
      type: "entrance",
      entrydate: "2025-02-19T00:00:00+00:00",
      housing_id: "f3a54e33-b898-4d34-8efe-e0fbcb91f681",
      housing_name: "303",
      unit_id: "4c57e370-50ac-40b4-900b-117f48830e2f",
      unit_name: "Torre 1"
}
const Registry = () => {
    const {setInformation} = useSearchBar()
    const informationSearch = useSearchBar()
    const {information} = setHousing();
    const [useData,setData] = useState<visitor[]>([])
    const [usePackages,setPackages] = useState<packages[]>([])
    const [useBoton,setBoton] = useState<boolean>(false)
    const datosVisitante = useData.filter((x)=>x.visitor.toLowerCase().trim().includes(informationSearch?.information?.inputValue || ''))
    // const packages = usePackages.filter((x)=>x..toLowerCase().trim().includes(informationSearch?.information?.inputValue || ''))

    const changeOption = (data:boolean)=>{
        setBoton(data)
    }
    useEffect(() => {
    if (!information) return;
        setInformation(
            {
                inputValue :''
            }
        )
    const peticion = async () => {
        try {
            const token = Cookies.get('token');
            const peticion = await axios.get(`https://api.vecii.com.co/api/v1/visit-logs`, {
                params: {
                    housingId: information.location.housing.id,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(peticion.data.results)
            console.log(peticion)
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    };
    const getPackages =async ()=>{
        try{
            const peticion = await axios.get(`https://api.vecii.com.co/api/v1/object-movements`,{
                params: {
                    housingId: information.location.housing.id,
                },
                headers:{
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            }) 
            console.log(peticion)
            setPackages(peticion.data.results)
        }catch(err){
            console.log(err)
        }
    }
    getPackages()
    peticion();
}, [information]);

return (
        <>
            <VeciiHeader
                srcImg="/assets/svg/historial.svg"
                name="Registros"
                transparent = {false}
            />
            <SearchBar placeholder={``} />
            <OpcionBox
                nameBox1='Visitante'
                nameBox2='Objetos'
                onClickDato={changeOption}

            />
            <div className='containerGrid_registries_order'>
               {
                useBoton?
                 usePackages.map((x,k)=>(
                    <LockerPublicService
                        dataFalse='Ingreso'
                        dataTrue='Salida'
                       imgServicio= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiK7SXYrBCQUOqJUlyFX6Cu3KhcBLMnsC0dg&s'
                       nameServicio='Sin definir'
                       stateServicio={x.type == 'entrance' ? true:false}
                       fechaServicio={x.entrydate.split('T')[0]}
                       key={k}
                    />
                ))
                :
                useData.length > 0 ?
                datosVisitante.length>0 ?
                datosVisitante.map((x,k)=>(
                      <VisitorRegistries
                    srcImg='https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:cfacf7cb-ed6a-5d0a-9666-b813562ad731/component?assetType=TEMPLATE&etag=c89f0ac8cffa44429198179c61aa3e29&revision=b7ea20f7-37d3-4329-92c7-11687a06537b&component_id=d1ecb99a-a6b3-4746-86c7-ef88c49baf49'
                    name={x.visitor}
                    complexDetails={ `${information?.location.unit.name}-${information?.location.housing.name}`}
                    status={x.status == 'pending' ? false:true}
                    date={x.departureDate.split('T')[0]}
                    key={k}
                />
                )):
                 <VisitorRegistries
                    srcImg='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                    name={'Visitante no encontrado'}
                    complexDetails='Visitante no encontrado'
                    status={false}
                    date={'00/00/00'}
                    
                />
                :
                    <div className='containerGrid_message_anyVisitor'><p>! No tienes visitas registradas Vecii¡</p></div>
                
               
            
               }
            </div>
            <FooterFantasma/>
        </>
    )

};

export default Registry