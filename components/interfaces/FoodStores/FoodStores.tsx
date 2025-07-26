'use client'
import './index.css'
import GoTo from '@/components/logics/GoTo';
import { useOrderFood } from '@/components/stores/storePedido';

const FoodStore = ({imgStore,nameStore,gradeStore,timeOrder,pathStore}:{imgStore:string;nameStore:string,gradeStore:string,timeOrder:string,pathStore:string})=>{
    const goToPath = GoTo()
    const {setOrder} = useOrderFood()
    const goToOrder = ()=>(
        setOrder({
             nameFoodStore : nameStore,
             gradeStoreFood: gradeStore,
             imgStoreFood: imgStore
        }),
        goToPath({path:pathStore})
    )
    return( 
        <div className='container_section_stores' onClick={goToOrder}>
            <img src={imgStore} alt="restaurant image" className='container_section_stores_img'  />
            <div className='container_section_stores_infoStore'>
                <p className='container_section_stores_nameStore'>{nameStore}</p>
                <div className='container_section_stores_timeGrade'>
                    <p className='container_section_stores_grade'><span>⭐</span>{gradeStore}</p>
                    <p className='container_section_stores_time'><span>⚡</span>{timeOrder}</p>
                </div>
            </div>
        </div>
    )
}
export default FoodStore