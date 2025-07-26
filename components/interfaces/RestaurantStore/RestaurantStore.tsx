import './index.css';
import { useOrderFood } from '@/components/stores/storePedido';
import GoTo from '@/components/logics/GoTo';
const RestaurantStore = ({imgStore,nameStore,gradeStore,timeOrder,pathStore,imgFood}:{imgFood:string,imgStore:string;nameStore:string,gradeStore:string,timeOrder:string,pathStore:string})=>{  
    // const { setOrder}  
    const goToSection = ()=>{
        useOrderFood
    }
    return(
        <div className='container_infoStore'>
            <img className='container_infoStore_food' src={imgFood} alt="" />
            <div className='container_infoStore_items'>
                <img className='container_infoStore_items_logo' src={imgStore} alt="Logo del restaurante" />
                <div className='container_infoStore_items_grid'>
                    <p className='container_infoStore_items_name'>{nameStore}</p>
                    <p className='container_infoStore_items_time'><span>⚡</span>{timeOrder}</p>
                </div>
                <p className='container_infoStore_items_grade'>
                    <span>⭐</span>{gradeStore}
                </p>
            </div>
        </div>
    )
}
export default RestaurantStore