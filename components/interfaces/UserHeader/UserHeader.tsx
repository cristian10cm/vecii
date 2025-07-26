'use client'
import { useEffect } from 'react';
import './index.css';
import { setHousing } from '@/components/stores/StoreHousing';
import Cookies from 'js-cookie';
const UserHeader = ({srcImg, userName , complexName , deatilsComplex}: {
        srcImg:string, 
        userName:string , 
        complexName:string , 
        deatilsComplex:string
}) =>{  
    useEffect(()=>{
        const userInfo = Cookies.get('userInfo')
    },[])
    const {information} = setHousing()

    return(
        <div className="userHeader_component">
            <div className="userHeader_component_imgContainer">
                <img className="userHeader_component_imgUser" src={srcImg}></img>
            </div>
            <div className="userHeader_component_info">
                <h2 className="userHeader_component_userName" >! Hola {information?.firstName} {information?.lastName} !</h2>
                <p className="userHeader_component_complexName">{information?.location.complex.name}</p>
                <p className="userHeader_component_detailComplex">{information?.location.unit.name}-{information?.location.housing.name} </p>
            </div>
            
        </div>

    );

};

export default UserHeader;