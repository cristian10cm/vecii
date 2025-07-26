import {create} from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';
import { AuthPayInvoice,  PayInvoice } from '.'; 

export const useInvoiceStore = create<AuthPayInvoice>()(
    persist(
    (set)=>(
    { invoice:null,
        setInvoice:(newInvoice:PayInvoice)=>set({invoice:newInvoice})
    }),
    {
      name: 'factura', 
      storage: createJSONStorage(() => sessionStorage)
    }
))