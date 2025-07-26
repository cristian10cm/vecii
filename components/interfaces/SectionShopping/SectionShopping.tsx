'use client'
import './index.css';
import FoodStore from '../FoodStores/FoodStores';
import { shoppingStore } from '@/components/stores/storeShopping';
import apiFalsa from '@/components/interfaces/SectionShopping/apiFalsa.json';
import { useSearchBar } from '@/components/stores/storeSearch';
import GoTo from '@/components/logics/GoTo';
import { useEffect } from 'react';
const SectionShopping =({nameSection}:{nameSection:string})=>{
    const {setShopping} = shoppingStore();
    const goToPath = GoTo()
    const goToSection=()=>{
            setShopping({
                  name: nameSection
            })
            goToPath({path:'/resident/pedidos/tiendas-pedido'})
    }
    const information = useSearchBar();
    const {setInformation} = useSearchBar()
    useEffect(()=>{
                  setInformation({
                        inputValue:''
                  })
    },[])
    const data = apiFalsa.filter((e)=>e.name.toLocaleLowerCase().trim().includes((information.information?.inputValue || '').toLowerCase().trim()))
    return(
          <div className='container_orders_section-meats'>
                <div className='container_orders_section-meats_info'>
                    <p className='container_orders_section-meats_title'>{nameSection}</p>
                    <button className='container_orders_section-meats_seeAll' onClick={goToSection}>Ver todos</button>
                </div>
                <div className='container_orders_section-meats_options'>
                  {
                        data.length>0 ?
                        data.map((e,k)=>(
                              <FoodStore
                                     imgStore= {e.imgStore}
                                     nameStore={e.name}
                                     gradeStore={e.grade}
                                     timeOrder={e.timeOrder}
                                     pathStore={e.pathStore}
                                     key={k}
                              />
                        )):
                       <FoodStore
                                     imgStore= {'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'}
                                     nameStore={'No encontrado'}
                                     gradeStore={''}
                                     timeOrder={''}
                                     pathStore={'/resident/pedidos/'}
                                     
                        /> 
                  }
            </div>
            </div>
    )
}
export default SectionShopping