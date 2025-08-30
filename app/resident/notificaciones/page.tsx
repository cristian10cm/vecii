'use client'
import './index.css'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader'
import Notification from '@/components/interfaces/Notification/Notification'
import Sockets from '@/components/stores/Sockets'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
const Notificaciones = ()=>{
        useEffect(()=>{
      Sockets.connect();
      Sockets.on("new-message", (data) => {
      console.log("🔔 Notificación recibida:", data);
    });
    },[])
    return(
        <>
            <VeciiHeader
                srcImg='/assets/svg/bell-bold.svg'
                name='Notificaciones'
                transparent = {true}
            />
            <div className='container_grid_notifications'>
                <Notification></Notification>
                <Notification></Notification>
                <Notification></Notification>

            </div>
        
        </>

    )
}
export default Notificaciones