
import { useEffect,useState } from 'react'
import './index.css'
import { useOrderFood } from '@/components/stores/storePedido'
import { useCartStore } from '@/components/stores/storeShoppingCart'
const ShoppingCar = ({activeModal,nameStore}:{activeModal:(data:boolean)=>void,nameStore:string})=>{
    const contStore= useCartStore(nameStore)
  const {cont} =contStore()
    const modal = ()=>{
        activeModal(true)
    }
    // useEffect(()=>{
    //      const store = useOrderFood().information?.nameFoodStore
    //     if(!store) return
    //     setCatalog(store)
    // },[useCatalog])
    return(
            <div className='shopping_cart'>
                <button onClick={modal}>
                    <img src="/assets/svg/shopping-cart.svg" className='shopping_cart_img' alt="Icono carro de mercado" />
                </button>
                {cont>0?
                    <div className='shopping_cart_cont'>{cont}</div>:''    
            }
            </div>
    )
}
export default ShoppingCar