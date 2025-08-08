'use client'
import './index.css';
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import { useSearchBar } from '@/components/stores/storeSearch';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setHousing } from '@/components/stores/StoreHousing';
import VisitorRegistries from '@/components/interfaces/VisitorRegistries/VisitorRegistries';
type visitor ={
departureDate: string ,
entryDate: string,
housingLocation: string,
id: string,
status: string,
visitor: string
}
const MisVisitas =()=>{
    const information = setHousing()
     const searchBar = useSearchBar()
     const [useData,setData] = useState<visitor[]>([])
    const peticion = async () => {
        try {
            const token = Cookies.get('token');
            const peticion = await axios.get(`https://api.vecii.com.co/api/v1/visit-logs`, {
                params: {
                    housingId: information.information?.location.housing.id,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const {data} = await peticion
            setData(data.results)
            console.log(peticion)
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    };
   
    useEffect(()=>{
        if(!information.information?.location.housing.id) return
        searchBar.setInformation(
            {
                inputValue:''
            }
        )
        peticion()
    },[information])
    const datosVisitante = useData.filter((x)=>x.visitor.toLowerCase().trim().includes(searchBar.information?.inputValue || ''))

    return (
        <>
        <VeciiHeader
            srcImg='/assets/svg/Ingreso.svg'
            name= 'Mis visitas'
            transparent={false}
        />
        <SearchBar
        placeholder=''
        />
        <div className='container_myVisitors'>
            { useData.length > 0 ?
                datosVisitante.length>0 ?
                datosVisitante.map((x,k)=>(
                      <VisitorRegistries
                    srcImg='https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:cfacf7cb-ed6a-5d0a-9666-b813562ad731/component?assetType=TEMPLATE&etag=c89f0ac8cffa44429198179c61aa3e29&revision=b7ea20f7-37d3-4329-92c7-11687a06537b&component_id=d1ecb99a-a6b3-4746-86c7-ef88c49baf49'
                    name={x.visitor}
                    complexDetails={ `${information.information?.location.unit.name}-${information.information?.location.housing.name}`}
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
                    <div className='containerGrid_message_anyVisitor'><p>! No tienes visitas registradas Vecii¡</p></div>}
        </div>
        <FooterFantasma/>
        </>
    )
}
export default MisVisitas