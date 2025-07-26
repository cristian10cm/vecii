'use client'
import './index.css';
import GoTo from '@/components/logics/GoTo';
import axios from 'axios';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import { useEffect,useState } from 'react';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import Cookies from 'js-cookie';
import { useSearchBar } from '@/components/stores/storeSearch';
import ComunityService from '@/components/interfaces/ComunityService/ComunityService';
const productos = ()=>{
    const [useProduct,setProduct] = useState<any []>([]);
    const {setInformation,information} = useSearchBar()
    useEffect(()=>{
        setInformation({
            inputValue:''
        })
        const miPeticion = async()=>{
                const idCatalogo =  localStorage.getItem('idCatalogo')
                try{
                    const peticion =await axios.get('https://api.vecii.com.co/api/v1/products',
                        {
                            headers:{
                            Authorization: `Bearer ${Cookies.get('token')}`
                        },
                            params:{
                            catalogId :idCatalogo
                        }
                        }
                    ) 
                    setProduct(peticion.data.results)

                }catch(error){
                    console.log(localStorage.getItem('idCatalogo'))
                    console.log(error)
                }
        }
        miPeticion()
    },[])
    const data = useProduct.filter((x)=>x.name.toLowerCase().trim().includes((information?.inputValue.toLowerCase().trim()) || ''))
    return(
        <>
            <VeciiHeaderImg
                name='HELADOS'
                detail={'LOS MEJORES HELADOS'}
                srcImg='https://www.elespectador.com/resizer/v2/FUKFCVSIZVAJJMRDP2LT2SQ6GA.jpg?auth=c9f609ab007f7f047592b7fd64b4a3f5f6fae60338c1990ca2f6a928103a776b&width=920&height=613&smart=true&quality=60'
            />
            <SearchBar
                placeholder=''
            />
            <div className='container_ productStore_grid'>
                { data.length>0 ?
                    data.map((x,k)=>(
                    <ComunityService
                        imgServicio = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWMRiFDP50F-OGLwAxm8N9NXkTQszL-hLJU-ziF6NkonxpRs39UWxo4vSFVr9yDL-ZHSI&usqp=CAU'
                        nameServicio= {x.name}
                        precioServicio= {x.price}
                        key={k}
                    /> 
                )):
                    <ComunityService
                        imgServicio = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                        nameServicio= 'No encontrado'
                        precioServicio= 'No encontrado'
                    />  
                }
            </div>
            <FooterFantasma/>
        </>
    )
}
export default productos