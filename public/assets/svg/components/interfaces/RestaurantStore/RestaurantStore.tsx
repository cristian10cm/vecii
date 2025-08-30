import './index.css';
import { useOrderFood } from '@/components/stores/storePedido';
import GoTo from '@/components/logics/GoTo';
const RestaurantStore = ({imgStore,nameStore,gradeStore,timeOrder,pathStore,imgFood,idCatalog}:{imgFood:string,imgStore:string;nameStore:string,gradeStore?:string,timeOrder?:string,pathStore:string,idCatalog:string})=>{  
    const goToPath = GoTo()
    const goToSection = ()=>{
       goToPath({path:pathStore})
       localStorage.setItem('idCatalogoStore',idCatalog)
       localStorage.setItem('nameCatalog',nameStore)
    }
    return(
        <div className='container_infoStore'>
            <img className='container_infoStore_food' src={imgFood} alt="" />
            <div className='container_infoStore_items'>

                    <p className='container_infoStore_items_name'>{nameStore}</p>
                    <button className='container_infoStore_items_btn' onClick={goToSection}><img src="/assets/svg/arrowIcon.svg" alt="" /> </button>
                    {/* <p className='container_infoStore_items_time'><span>⚡</span>{timeOrder}</p> */}
                </div>


        </div>
    )
}
export default RestaurantStore