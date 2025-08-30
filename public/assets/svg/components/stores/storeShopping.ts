import {create} from 'zustand'
import {persist,createJSONStorage} from 'zustand/middleware'
export interface Shopping{
    name:string
}
type useShopping = {
    information : Shopping | null,
    setShopping : (newShopping:Shopping)=>void
}
export const shoppingStore = create<useShopping>()(
    persist(
        (set)=>
      (
        {
            information:null,
            setShopping:(newShopping:Shopping)=>set({information:newShopping})    
        }),
        {
            name:'shopping',
            storage:createJSONStorage(()=>sessionStorage)    
        }
    )
)