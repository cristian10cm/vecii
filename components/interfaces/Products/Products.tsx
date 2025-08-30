'use client'
import './index.css'
import GoTo from '@/components/logics/GoTo';
import axios from 'axios';
import { useCartStore } from '@/components/stores/storeShoppingCart';
import { useEffect } from 'react';
import { IoAddCircleOutline,IoTrashSharp  } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";

type typeProduct = {
    nameP : string,
    idP : string,
    imgP: string,
    price:number
}
const Products = ({nameP,idP,imgP,price}:typeProduct)=>{
    const { buyProduct, addProduct, removeProduct,cont } = useCartStore()

    const addCartS = ()=>{
        addProduct({nameProduct:nameP,priceProduct:price,unid:1})
    }
    const products =  buyProduct.find((x)=>x.nameProduct=== nameP)
    return(
        <div className='productStore_container'>
            <div className='productStore_container_img'>
                <img src={imgP} alt="Imagen del producto" />
            </div>
           <div className='productStore_container_items'>
                <div className='productStore_container_items_info'>
                      <p className='productStore_container_nameP'>{nameP}</p>
                        <p className='productStore_container_price'>{price}</p>
                </div>
            {   
                products && products.unid>0?
                 <div className='productStore_container_buy_add'>
                     <button className='productStore_container_btn' onClick={()=>removeProduct(nameP)}>
                        {
                            products.unid>1 ?
                               <img src="/assets/svg/minus-circle-bold.svg" alt="Eliminar de la compra" /> :
                                <img src="/assets/svg/trash.svg" alt="Eliminar de la compra" />
                        }

                     </button>
                     <p> unid. {products?.unid}</p>
                     <button className='productStore_container_btn' onClick={addCartS}>
                        <img src="/assets/svg/plus-circle.svg" alt="añadir producto" />
                     </button>
                </div>:
                <button className='productStore_container_buy' onClick={addCartS}>Agregar <img src="/assets/svg/shopping-cart-fill.svg" alt="añadir producto" /></button>
              
            
            }
           </div>

        </div>

    )
}
export default Products