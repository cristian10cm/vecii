'use client'
import { useEffect } from 'react';
import './index.css';
import { setHousing } from '@/components/stores/StoreHousing';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
import GoTo from '@/components/logics/GoTo';
import Cookies from 'js-cookie';
const UserHeader = ({srcImg, userName , complexName , deatilsComplex}: {
        srcImg:string, 
        userName:string , 
        complexName:string , 
        deatilsComplex:string
}) =>{  
    const goToPath = GoTo()
    const {information} = setHousing()
    const obtenerInfo =()=>{
        if(!information) return
        console.log(information)
    }

    useEffect(()=>{
        console.log(information)
        obtenerInfo()
    },[information])
    const goToNotification = ()=>{

        goToPath({path:'/resident/notificaciones'})
    }

    return(
        <div className="userHeader_component">
            <div className="userHeader_component_imgContainer">
                <img className="userHeader_component_imgUser" src={srcImg} alt='Foto de perfil'></img>
                <button onClick={goToNotification} className='userHeader_component_sign-out'>
                    {/* <img src="/assets/svg/sign-out-bold.svg" alt="" /> */}
                    <IconSvgGradient
                        urlImage='/assets/svg/bell-bold.svg'
                        widthImg='clamp(20px,6vw,30px)'
                    />
                </button>
            </div>
            <div className="userHeader_component_info">
                <h2 className="userHeader_component_userName" >!Hola {(information?.firstName)?.split(' ')[0]} {(information?.lastName)?.split(' ')[0]}!</h2>
                <p className="userHeader_component_complexName">{information?.location.complex.name}</p>
                <p className="userHeader_component_detailComplex">{information?.location.unit.name}-{information?.location.housing.name} </p>
            </div>

            {/* <div className='userHeader_component_sign-out'>
                <button onClick={signOut}>
                    <IconSvgGradient
                        urlImage='/assets/svg/sign-out-bold.svg'
                        widthImg='clamp(20px,7vw,30px)'
                    />
                </button>
            </div> */}
        </div>

    );

};

export default UserHeader;