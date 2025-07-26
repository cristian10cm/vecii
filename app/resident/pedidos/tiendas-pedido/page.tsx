'use client'
import './index.css';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import { shoppingStore } from '@/components/stores/storeShopping';
import RestaurantStore from '@/components/interfaces/RestaurantStore/RestaurantStore';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import apiFalsa from '@/app/resident/pedidos/tiendas-pedido/apiFalsa.json'
import { useEffect } from 'react';
const tiendasPedido =()=>{
    const shoppingName = shoppingStore()
    const api = apiFalsa
    useEffect(()=>{
        console.log(api)
    },[])
    return(
        <>
           <VeciiHeaderImg
                srcImg='https://totalfood.com/wp-content/uploads/2023/04/Restaurant-Online-Food-Delivery-1.webp'
                name='Tiendas'
                detail='Conjunto pimientos de madelena'
           /> 
           <SearchBar
                  placeholder=''
           />
            <div className='container_shopping'>
                <h2 className='container_shopping_title'>{shoppingName.information?.name}</h2>
                <div className='container_shopping_stores'>
                       
                </div>
            </div>
            {/* {
                  apiFalsa.map((e,k)=>{
                        <RestaurantStore
                            imgFood = {e.imgStore}
                            imgStore= {e.imgStore}               
                            nameStore={e.imgStore} 
                            gradeStore={e.grade}
                            timeOrder={e.timeOrder}
                            pathStore={e.pathStore}
                            key={k}
                        />
                        
                  })
            } */}
            <div className='container_shopping_options'>
                 {api.map((e,k)=>(
                <RestaurantStore
                    imgFood = {e.imgFood}
                    imgStore= {e.imgStore}             
                    nameStore={e.nameStore}
                    gradeStore= {e.gradeStore}
                    timeOrder={e.timeOrder}
                    key={k}
                    pathStore="/resident/pedidos/ordenPedido/" 
                  />

                 ))}
            </div>

           <FooterFantasma></FooterFantasma>
        
        </>
    )
}
export default tiendasPedido