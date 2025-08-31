"use client";

import './index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css' 

const AdvertaisingSwipper = () =>{

    return(    
        <div className='advertaising_vecii'>
            <Swiper
                direction='horizontal'
                
                spaceBetween={50} 
                slidesPerView={1} 
                pagination={true}
                autoplay = {{delay:3000,disableOnInteraction:false}}
                modules={[Autoplay,Pagination]}
                loop={true} 
                className='swiperAdvertaising'
            >
                <SwiperSlide>
                    <div className='swiperAdvertaising_img'>
                        <img src="https://conjuntokamelia.com/wp-content/uploads/2024/04/Foto-Kamelia-e1714514077290.jpg"></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{width:'100%', height:'300px', display:'flex'}}>
                        <img src="https://www.shutterstock.com/image-photo/st-petersburg-russia-july-17-600nw-2492719799.jpg"></img>
                    </div>
                </SwiperSlide>
                
            </Swiper>
        </div>
    );

};

export {AdvertaisingSwipper}