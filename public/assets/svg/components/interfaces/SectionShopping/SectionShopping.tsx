'use client'
import './index.css';
import FoodStore from '../FoodStores/FoodStores';
import { shoppingStore } from '@/components/stores/storeShopping';
import { useSearchBar } from '@/components/stores/storeSearch';
import GoTo from '@/components/logics/GoTo';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { typeStore } from '.';
import axios from 'axios';
import NoApiData from '../NoApiData/NoApiData';
const SectionShopping =({nameSection}:{nameSection:string})=>{
    const [useStore,setStore] = useState<typeStore[]>([])
    const {setShopping} = shoppingStore();
    const goToPath = GoTo()
    const goToSection=()=>{
            setShopping({
                  name: nameSection
            })
            goToPath({path:'/resident/pedidos/ver-mas-tiendas'})
    }
    const information = useSearchBar();
    const {setInformation} = useSearchBar()
    const getStores = async()=>{
      try{
            const  peticion = await axios.get(`https://api.vecii.com.co/api/v1/stores/search/nearby`,{
                  headers:{
                        Authorization:`Bearer ${Cookies.get('token')}`
                  },params:{
                        limit:6
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
    const data = useStore.filter((e)=>e.name.toLocaleLowerCase().trim().includes((information.barInformation?.inputValue || '').toLowerCase().trim()))
    return(
          <div className='container_orders_section-meats'>
                <div className='container_orders_section-meats_info'>
                    <p className='container_orders_section-meats_title'>{nameSection}</p>
                    <button className='container_orders_section-meats_seeAll' onClick={goToSection}>Ver todos</button>
                </div>
                <div className='container_orders_section-meats_options'>
                  {     useStore.length>0?
                        data.length>0 ?
                        data.map((e,k)=>(
                              <FoodStore
                                     imgStore= {'https://yt3.googleusercontent.com/gilLtN0arzL6VDxTKmD4WHvDRdKMFDOe5n2d3iN55nc1p2KUoY4_kD7zz-l4nzU5knxvQXi0sw=s900-c-k-c0x00ffffff-no-rj'}
                                     nameStore={e.name}

                                    //  gradeStore={e.}
                                    idStore={e.id}
                                    //  timeOrder={e.timeOrder}
                                     pathStore={'/resident/pedidos/tiendas-pedido'}
                                     key={k}
                              />
                        )):
                       <FoodStore
                                     imgStore= {'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'}
                                     idStore=''
                                     nameStore={'No encontrado'}
                                     gradeStore={''}
                                     timeOrder={''}
                                     pathStore={''}
                                     
                        /> : 
                        <NoApiData message='¡No hay tienes servicios registrados Vecii!'/>
                  }
            </div>
            </div>
    )
}
export default SectionShopping