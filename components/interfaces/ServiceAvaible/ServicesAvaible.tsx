
import './index.css';
import GraderReservation from '@/components/interfaces/GraderReservation/GraderReservation'
import GoTo from '@/components/logics/GoTo';
const ServicesAvaible = ({srcImg , name,idStore}: {srcImg:string , name:string,idStore:string}) =>{
    const goToPath = GoTo()
    const verTienda = ()=>{
        goToPath({path:'/resident/mi-hogar/mis-servicios/tienda/'})
        localStorage.setItem('idStore',idStore)
    }
    return(
        <div className='containerService' onClick={()=>verTienda()}>
            <img className='containerService_img' src={srcImg}/>
            <p className='containerService_paragraph'>{name}</p>
            <GraderReservation
                nameReservation={name}
                grader='5.1'
            />
        </div>
    )

}

export default ServicesAvaible;