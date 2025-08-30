import './index.css'
import { format } from 'date-fns';
import { MdClose } from 'react-icons/md';

const ReservedAreaModal = ({title,nameUser,date,time,onClose}:{title:string,nameUser:string,date:string,time:string,onClose:(state:boolean)=>void})=>{
    const closeModal =()=>{
        onClose(false)
    }
    return(
        <div className='container_modalReserved'>
           
            <div className='container_modalReserved_ad'>
                 <button className='container_modalReserved_close' onClick={closeModal}><MdClose/></button>
                    <p className='container_modalReserved_title'>{title}</p>
                    <div className='container_modalReserved_date'>
                        <p className='container_modalReserved_date-paragraphe'>{nameUser}</p>
                        <p className='container_modalReserved_info'>Te esperamos el </p>
                        <p className='container_modalReserved_date-reserved'>{date.split('T')[0]}</p>
                        <p className='container_modalReserved_time-reserved'>{format(time,'h:mmaaa').toLowerCase()}</p>
                    </div>
                    {/* <div className='container_modalWindow_infoUser'>
                        <p className='container_modalWindow_infoUser-name'>{}</p>
                        <p className='container_modalWindow_infoUser-housing'>{} - {}</p>
                    </div> */}
                       <img className='container_modalReserved_closeModal' onClick={closeModal}  src='https://cdn-icons-png.flaticon.com/128/6785/6785304.png'/>
            </div>
        </div>
        
    )
}
export default ReservedAreaModal