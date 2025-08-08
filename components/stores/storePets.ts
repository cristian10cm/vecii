import {create} from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';
export interface stateData{
    state: number
}
 type updatePets ={
    count: stateData | null
    setUpdatePets : (newUpdate:stateData)=>void
 }
 export const  useUpdatePets = create<updatePets>()(
        persist(
            (set)=>(
            {
                count:null,
                setUpdatePets: (newUpdate:stateData)=>set({count:newUpdate})
            }
        ),
        {
            name: 'statePet',
            storage: createJSONStorage(() => sessionStorage)
        }
        )
 )