'use client'
import './index.css';
import GoTo from '@/components/logics/GoTo';
import axios from 'axios';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import { useEffect,useState } from 'react';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import { useOrderFood } from '@/components/stores/storePedido';
import Cookies from 'js-cookie';
import { useSearchBar } from '@/components/stores/storeSearch';
import Products from '@/components/interfaces/Products/Products';
import IconSvgGradient from '@/components/interfaces/IconSvgGradient/IconSvgGradient';
import ModalShoppingCart from '@/components/interfaces/ModalShoppingCart/ModalShoppingCart';
import { apiDataFilter } from '@/components/stores/apiDataFilter';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
import BtnSeeMore from '@/components/interfaces/BtnSeeMore/BtnSeeMore';
import { useCartStore } from '@/components/stores/storeShoppingCart';
interface producto{
    createdAt:string ,
    id:string ,
    name:string ,
    description: string,
    price: number
}
const productos = ()=>{
    const [useProduct,setProduct] = useState<producto []>([]);
    const dataStore = useOrderFood()
    const [useNameC,setNameC] = useState<string>('')
      const { buyProduct,cont,resetCart  } = useCartStore()
    const [seeMore,setMore] = useState<boolean>(false)
    const [useId,setId] = useState<string>()
    const [useCont,setCont] = useState<number>(0)
    const {setInformation,barInformation} = useSearchBar()
    const [useModal,setModal] = useState<boolean>(false)
    const miPeticion = async(id:string)=>{
                try{
                    const peticion =await axios.get('https://api.vecii.com.co/api/v1/products',
                        {
                            headers:{
                            Authorization: `Bearer ${Cookies.get('token')}`
                        },
                            params:{
                            catalogId :id
                        }
                        }
                    ) 
                    setProduct(peticion.data.results)
                    console.log(peticion.data)
                }catch(error){
                    console.log(error)
                }
        }


    useEffect(()=>{
        resetCart()
        setInformation({
            inputValue:''
        })
         const idCatalogo =  localStorage.getItem('idCatalogoStore')
         const nameCatalogo = localStorage.getItem('nameCatalog')
         if(!idCatalogo) return
         if(!nameCatalogo) return
         setNameC(nameCatalogo)
         setId(idCatalogo)
        miPeticion(idCatalogo)
        
    },[useId])
    const closeModal = (data:boolean)=>{
            setModal(data)
    }
    const data = apiDataFilter(useProduct,'name',seeMore,barInformation?.inputValue || '')
    
    return(
        <>
            <VeciiHeaderImg
                name={dataStore.information?.nameFoodStore  || 'Cargando..'}
                detail={useNameC || 'Cargando..'}
                srcImg={dataStore.information?.imgStoreFood || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-ZbLsSkmkYg6iDY3RYLeDqMRV68xz3bZNQ&s'}
            />
            <SearchBar
                placeholder=''
            />
            <div className='products_container_main'>
                <p className='products_list_container_title'>Productos</p>
                {/* <p className='products_list_container_name-catalog'>{useNameC || 'Cargando..'}:</p> */}
            </div>
            <div className='products_list_container'>
                {   useProduct.length>0 ? 
                    data.filterData.length>0 ? 
                    <>
                        {
                        data.filterData.map((x,k)=>(
                            <Products
                                imgP='https://images.aws.nestle.recipes/resized/2020_04_15T09_05_46_mrs_ImageRecipes_124048lrg_1080_850.jpg'
                                nameP={x.name}
                                price={x.price}
                                idP={x.id}
                                 key={k}
                            />
                    ))
                        }
                        {data.stateSeeMore ? <BtnSeeMore enable={()=>setMore(true)} />:''}
                    
                    </>:
                    
                    <Products
                                imgP='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                                nameP={'No encontrado'}
                                price={0}
                                idP={''}
                                 
                            />
                    
                    :
                    <NoApiData message='No hay productos disponibles'/>
                }
            </div>
            <div className='shopping_cart'>
                <button onClick={()=>setModal(true)}>
                    {/* <IconSvgGradient
                        urlImage='/assets/svg/shopping-cart-bold.svg'
                        widthImg='clamp(35px,15vw,50px)' 
                    /> */}
                    <img src="/assets/svg/shopping-cart-simple-bold.svg" alt="Icono carro de mercado" />
                </button>
                {cont>0?
                    <div className='shopping_cart_cont'>{cont}</div>:''    
            }
            </div>
            {
                useModal ? 
                <ModalShoppingCart onClose={closeModal}></ModalShoppingCart>:''
            }
            
        </>
    )
}
export default productos