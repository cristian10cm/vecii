'use client'
import { useEffect, useState } from 'react'
import './index.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma'
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import { useSearchBar } from '@/components/stores/storeSearch';
import CatalogStore from '@/components/interfaces/CatalogStore/CatalogStore'
interface catalogo{
    createdAt: string,
    id: string,
    name: string,
    status: string
}
const tienda = ()=>{
     const [useCatalogo,setCatalogo]  = useState<catalogo []>([])
     const {setInformation,information} = useSearchBar();
    useEffect(()=>{
        setInformation({
            inputValue : ''
        })
        const peticion = async ()=>{
            try{
                const peticion = await axios.get('https://api.vecii.com.co/api/v1/catalogs',
                {
                    headers:{
                        Authorization: `Bearer ${Cookies.get('token')}`
                    },
                    params:{
                        storeId: localStorage.getItem('idStore')
                    }
                } 
            )
            const data =await peticion.data
            setCatalogo(data.results)
            }catch(error){
                console.log(error)
            }
        }
        peticion()
    },[])
    const data = useCatalogo.filter((x)=>x.name.toLowerCase().trim().includes((information?.inputValue)?.toLocaleLowerCase().trim() || '')) 
    return(
       <>
       <VeciiHeaderImg
            srcImg = 'https://www.confitexpo.com/wp-content/uploads/2024/08/Tiendas-de-abarrotes-las-que-mas-se-adaptan-y-crecen-en-medio-de-la-crisis-.webp'
            name = 'Catalogo'
            detail = 'Tiendas'
       />
       <SearchBar
            placeholder=''
       />
       <div className='container_grid_catalogo'>
            {
            data.length>0?
                data.map((x,k)=>(
                    <CatalogStore
                        idCatalogo={x.id}
                        nameCatalog={x.name}
                        imgCatalog={'https://www.elespectador.com/resizer/v2/FUKFCVSIZVAJJMRDP2LT2SQ6GA.jpg?auth=c9f609ab007f7f047592b7fd64b4a3f5f6fae60338c1990ca2f6a928103a776b&width=920&height=613&smart=true&quality=60'}
                        key={k}
                    />
                ))    
            
            :
                <CatalogStore
                        idCatalogo={'No encontrado'}
                        nameCatalog={'No encontrado'}
                        imgCatalog={'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'}
                        
                    />
            
            }
       </div>
       <FooterFantasma/>
       </>
    )
}   
export default tienda