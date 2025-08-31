'use client'
import './index.css';
import FoodStore from '@/components/interfaces/FoodStores/FoodStores';
import axios from 'axios';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useEffect,useState } from 'react';
import { apiDataFilter } from '@/components/stores/apiDataFilter';
import Cookies from 'js-cookie';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
import BtnSeeMore from '@/components/interfaces/BtnSeeMore/BtnSeeMore';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import { setHousing } from '@/components/stores/StoreHousing';
export interface typeStore {
    
            createdAt: string | Date,
            id: string,
            name: string,
            location: {
                type: string,
                coordinates: [
                    number,
                    number
                ]
            }
        
}
const ordenPedido = ()=>{
    const [useStore,setStore] = useState<typeStore[]>([])
     const nameComplex = setHousing().information?.location.complex.name || ''
    const {setInformation,barInformation} = useSearchBar()
    const [seeMore,setMore] = useState<boolean>(false)
      const getStores = async()=>{
      try{
            const  peticion = await axios.get(`https://api.vecii.com.co/api/v1/stores/search/nearby`,{
                  headers:{
                        Authorization:`Bearer ${Cookies.get('token')}`
                  }
            }) 
            setStore(peticion.data.results)
      }catch(err){
            console.log(err)
      }
    }
    useEffect(()=>{
                  setInformation({
                        inputValue:''
                  })
                  getStores()

    },[])
    const data = apiDataFilter(useStore,'name',seeMore,barInformation?.inputValue.toLowerCase().trim() || '') 
    return(
        <>
            <VeciiHeaderImg
                srcImg='https://totalfood.com/wp-content/uploads/2023/04/Restaurant-Online-Food-Delivery-1.webp'
                name='Pedidos'
                detail={nameComplex}
            />
            <SearchBar 
            placeholder=''/>
            {
                <div className='container_allStores'>
                    {
                                        useStore.length>0 ? 
                    data.filterData.length>0 ? 
                    <>
                    {
                        data.filterData.map((e,k)=>(
                            <FoodStore
                            
                                     imgStore= {'https://yt3.googleusercontent.com/gilLtN0arzL6VDxTKmD4WHvDRdKMFDOe5n2d3iN55nc1p2KUoY4_kD7zz-l4nzU5knxvQXi0sw=s900-c-k-c0x00ffffff-no-rj'}
                                     nameStore={e.name}
                                        //  gradeStore={e.}
                                    idStore={e.id}
                                    //  timeOrder={e.timeOrder}
                                     pathStore={'/resident/pedidos/tiendas-pedido'}
                                     key={k}
                            />
                        ))
                    }
                    {
                        data.stateSeeMore ? <BtnSeeMore enable={()=>setMore(true)} />:''
                    }
                    </>:
                                           <FoodStore
                                     imgStore= {'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'}
                                     idStore=''
                                     nameStore={'No encontrado'}
                                     gradeStore={''}
                                     timeOrder={''}
                                     pathStore={''}
                                     
                    />
                :
                <NoApiData message='¡No hay tiendas disponibles en este momento Vecii!'/>
                    }
                </div>
            }
       
        </>
    )

}
export default ordenPedido