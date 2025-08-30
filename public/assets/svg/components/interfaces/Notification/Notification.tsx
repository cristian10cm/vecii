'use client'
import { useEffect } from 'react'
import './index.css'
import Sockets from '@/components/stores/Sockets'
import Cookies from 'js-cookie'
const Notification = ()=>{

    return(
        <div className='container_notification'>
            <div className='container_notification_img'>
                <img src="https://cdn-icons-png.flaticon.com/512/12225/12225881.png" alt="Icono de usuario" />
            </div>
            <div className='container_notification_info'>
                    <div className='container_notification_info_header'>
                        <p className='container_notification_info_sender'>
                            Mensaje de administración
                        </p>
                        <div className='container_notification_info_time'>
                            <p className='container_notification_info_date'>25/15/2025</p>
                            <p className='container_notification_info_hour'>11:00</p>
                        </div>
                    </div>
                 <p className='container_notification_info_message'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum cupiditate quam facere repellendus perferendis eveniet odio asperiores commodi reiciendis! Sunt expedita neque magnam praesentium velit consequuntur natus impedit ullam magni!
                 </p>
            </div>
        </div>

    )
}
export default Notification