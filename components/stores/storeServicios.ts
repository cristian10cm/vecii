import {create} from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';

export interface PayServices{
    userName?: string,
    servicio: string,
    pagado:boolean,
    imgSrcServices: string,

    precieService?:string
}
type AuthService = {
    services: PayServices | null
    setServices:(newServices:PayServices)=>void
}
export const useServiceAuth =  create<AuthService>()(
  persist(
    (set)=>
      (
        {    
         services:null,
         setServices:(newServices:PayServices)=>set({services:newServices})
        }
      ),
      {
        name: 'service-storage',
        storage: createJSONStorage(() => sessionStorage)
      }
  )
)