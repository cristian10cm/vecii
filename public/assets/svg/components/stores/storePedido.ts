import {create} from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';
export interface orderFood{
    id:string
    nameFoodStore : string,
    gradeStoreFood?: string,
    imgStoreFood: string,
    description:string,
    numberStore:string,
    adressStore:string
    
}
type orderInfo = {
    information : orderFood | null,
    setOrder: (newOrder:orderFood) => void
}
export const useOrderFood = create<orderInfo>()(
        persist(
            (set)=>(
            {   information:null,
                setOrder:(newOrder:orderFood)=>set({information:newOrder})
            }),
            {
                name:'orderFood',
                storage: createJSONStorage(()=>sessionStorage)
            }
        )

) 
