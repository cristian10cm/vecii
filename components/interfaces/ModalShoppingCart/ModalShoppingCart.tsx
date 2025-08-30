'use client'
import './index.css'
import { useCartStore } from '@/components/stores/storeShoppingCart'
import { MdClose } from 'react-icons/md';
import { IoAddCircleOutline,IoTrashSharp  } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useState } from 'react';
const ModalShoppingCart = ({onClose}:{onClose:(data:boolean)=>void}) => {
  const { buyProduct,addProduct, removeProduct,totalPrice  } = useCartStore()

  const changeState = ()=>{
      onClose(false)
  }

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
              <p>Precio: ${x.priceProduct * x.unid}</p> 
              <div className='productStore_container_buy_add'>
                 <button className='productStore_container_btn' onClick={()=>removeProduct(x.nameProduct)}>
                      <IoIosRemoveCircleOutline/>   
                     </button>
                     <p> unid. {x?.unid}</p>
                    <button className='productStore_container_btn' onClick={()=>{addProduct({nameProduct:x.nameProduct,priceProduct:x.priceProduct,unid:1})}}>
                      <IoAddCircleOutline/></button>
              </div>
              </div>
          </div>
        ))}
          </div>
          <div className='productStore_container_TotalPrice'>
            {
              totalPrice>0 ? 
              `Total de la compra: $${totalPrice}`:
              'No tienes productos en tu carrito'
            }
          </div>
      </div>
    </div>
  )
}

export default ModalShoppingCart
