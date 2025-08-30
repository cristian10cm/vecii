'use client'
import './index.css'
import { useCartStore } from '@/components/stores/storeShoppingCart'
import { MdClose } from 'react-icons/md';
import { IoAddCircleOutline,IoTrashSharp  } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useEffect, useState } from 'react';
import { useOrderFood } from '@/components/stores/storePedido';
const ModalShoppingCart = ({onClose,nameStore}:{onClose:(data:boolean)=>void,nameStore:string}) => {
  const [useCatalog,setCatalog] = useState<string>('')
  const contStore= useCartStore(nameStore)
  const {cont,buyProduct,removeProduct,addProduct,totalPrice} =contStore()
  const changeState = ()=>{
      onClose(false)
  }
  const formatoMoneda = new Intl.NumberFormat('es-ES', {});
  // useEffect(()=>{
  //       const store = useOrderFood().information?.nameFoodStore
  //       if(!store) return
  //       setCatalog(store)
  // },[useCatalog])
  return (
    <div className='modal_ShoppingCart_container'>
      <div className='modal_ShoppingCart_container_info'>
        <div className='modal_ShoppingCart_container_info_head'>
          <p className='modal_ShoppingCart_container_info_title'>Agregados al carrito</p>
          <button className='modal_ShoppingCart_container_close' onClick={changeState}> <MdClose/></button>  
        </div>   
          <div className='modal_ShoppingCart_container_list'>
            {buyProduct.map((x, k) => (
          <div className='modal_ShoppingCart_container_product'  key={x.nameProduct + k}>
            <p className='modal_ShoppingCart_container_nameP'>Producto: <span>{x.nameProduct}</span></p>
            <div className='modal_ShoppingCart_container_items'>
              <p>Precio: ${formatoMoneda.format(x.priceProduct * x.unid)}</p> 
              <div className='productStore_container_buy_amount'>
                 <button className='productStore_container_btn' onClick={()=>removeProduct(x.nameProduct)}>
                      <IoIosRemoveCircleOutline/>   
                     </button>
                     <p>{x?.unid} unid.</p>
                    <button className='productStore_container_btn' onClick={()=>{addProduct({nameProduct:x.nameProduct,priceProduct:x.priceProduct,unid:1})}}>
                      <IoAddCircleOutline/></button>
              </div>
              </div>
          </div>
        ))}

          </div>
          <div className='productStore_container_TotalPrice'>
            <div className='productStore_container_line'></div>
            {
              totalPrice>0 ? 
              `Total de la compra: $${formatoMoneda.format(totalPrice)}`:
              'No tienes productos en tu carrito'
            }
          </div>
      </div>
    </div>
  )
}

export default ModalShoppingCart
