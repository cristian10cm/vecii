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
const Registry = () => {
    const {setInformation} = useSearchBar()
    const informationSearch = useSearchBar()
    const [typeRegistry, setTypeRegistry] = useState<'Visitante' | 'Objeto'>('Visitante')
    const {information} = setHousing();
    const [useData,setData] = useState<any[]>([])
 useEffect(() => {
    if (!information?.location?.housing?.id) return;
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

    peticion();
}, [information]);
    const datosVisitante = useData.filter((x)=>x.visitor.toLowerCase().trim().includes(informationSearch.information?.inputValue))
    return (
        <>
            <VeciiHeader
                srcImg="/assets/svg/historial.svg"
                name="Registros"
            />
            <SearchBar placeholder={`Nombre del ${typeRegistry}`} />
            <OpcionBox
                nameBox1='Visitante'
                nameBox2='Objetos'
                path1=''
                path2=''

            />
            <div className='containerGrid_registries_order'>
               {
                typeRegistry == 'Visitante'?
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
                <div>ok</div>
               
                
               }
            </div>
            <FooterFantasma/>
        </>
    )

};

export default Registry