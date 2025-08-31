'use client'
import './index.css';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import { useOrderFood } from '@/components/stores/storePedido';
import RestaurantStore from '@/components/interfaces/RestaurantStore/RestaurantStore';
import { useSearchBar } from '@/components/stores/storeSearch';
import BackArrow from '@/components/interfaces/VeciiHeader/subComponents/BackArrow/BackArrow';
import { useEffect, useState } from 'react';
import ModalShoppingCart from '@/components/interfaces/ModalShoppingCart/ModalShoppingCart';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import Cookies from 'js-cookie';
import ShoppingCar from '@/components/interfaces/ShoppingCar/ShoppingCar';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import axios from 'axios';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
interface catalogo{
    createdAt: string,
    id: string,
    name: string,
    status: string
}
const tiendasPedido =()=>{
    const [useCatalogo,setCatalogo]  = useState<catalogo[]>([])
    const store = useOrderFood()
    const [useModal,setModal] = useState<boolean>(false)
    const searchBar = useSearchBar().barInformation?.inputValue
    const {setInformation} = useSearchBar()
    const id = store.information?.id
    const nameStore = store.information?.nameFoodStore || ''
     const peticion = async ()=>{
            try{
                const peticion = await axios.get('https://api.vecii.com.co/api/v1/catalogs',
                {
                    headers:{
                        Authorization: `Bearer ${Cookies.get('token')}`
                    },
                    params:{
                        storeId: id,
                      
                    }
                } 
            )
            const data =await peticion.data
            setCatalogo(data.results)
            console.log(data)
            }catch(error){
                console.log(error)
            }
        }
    useEffect(()=>{
        setInformation({
            inputValue : ''
        })
        if(!id) return
        peticion()
    },[id])
    const closeModal = (data:boolean)=>{
            setModal(data)
    }
    const data = useCatalogo.filter((x)=>x.name.toLowerCase().includes(searchBar?.toLowerCase().trim() || ''))
    return(
        <>

            <div className='container_shopping'>
                
                    <div className='container_shopping_head'>
                        <BackArrow></BackArrow>
                        <h2 className='container_shopping_title'>{store.information?.nameFoodStore}</h2>
                        <div className='container_shopping_car'>
                            <ShoppingCar activeModal={closeModal} nameStore={nameStore} />
                        </div>
                    </div>
                    <div className='container_shopping_line'></div>
                    <img className='container_shopping_logo' src={store.information?.imgStoreFood} alt="Logo de la tienda" />
                    <div className='container_shopping_info'>
                        <p className='container_shopping_description'>
                            {store.information?.description} 
                        </p>
                         <div className='container_shopping_contact'>
                            <p className='container_shopping_adress'>Dir. {store.information?.adressStore}</p>
                            <p className='container_shopping_phone'>Tel. {store.information?.numberStore}</p>
                        </div>
                    </div>
                    
                <div className='container_shopping_line'></div>
                <p className='container_shopping_catalog'>Catalogo</p>
                           <SearchBar placeholder=''/>
                <div className='container_shopping_stores'>
                <div className='container_shopping_options'>
                 {
                   useCatalogo.length>0 ? 
                    data.length>0 ? 
                    data.map((x,d)=>(
                            <RestaurantStore
                            imgFood = {'https://ca-times.brightspotcdn.com/dims4/default/b274a61/2147483647/strip/false/crop/3000x2160+0+0/resize/1486x1070!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8d%2F60%2F451df0ff587caed33dca9753143d%2Ffb46723b90994af2acd5257211841495'}
                            imgStore= {store.information?.imgStoreFood || ''}             
                            nameStore={x.name}
                            idCatalog={x.id}
                            key={d}
                            pathStore="/resident/pedidos/tiendas-pedido/tienda-producto/" 
                        />
                    )):
                        <RestaurantStore
                            imgFood = {'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'}
                            imgStore= {'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'}             
                            nameStore={'No encontrado'}
                            idCatalog={''}
                            pathStore="" 
                        />
                    :<NoApiData message='La tienda aun no tiene catalogos creados por el momento Vecii'/>
               }
                </div>    
             </div>
                {
                 useModal ? 
                  <ModalShoppingCart nameStore={nameStore} onClose={closeModal}></ModalShoppingCart>:''
                 }
            </div>
            <FooterFantasma></FooterFantasma>
        </>
    )
}
export default tiendasPedido