import {create} from 'zustand'
import { persist,createJSONStorage } from 'zustand/middleware'
export interface data{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    isActive: boolean,
    roles: [
        {
            createdAt: string,
            id: string,
            name: string,
            slug: string,
            permissions: object
        }
    ],
    location: {
        complex: {
            id: string,
            name: string
        },
        unit: {
            id: string,
            name: string
        },
        housing: {
            id: string,
            name: string
        }
    }

}
type updateApi = {
    information : data | null;
    setInformation: (newInformation:data)=>void
}

export const setHousing = create<updateApi>()(
    persist(
        (set)=>({
            information:null,
            setInformation: (newInformation:data)=>set({information:newInformation})
        }),
        {
            name: 'Hounsing data', 
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
            information: {
            id:state.information?.id,
            firstName: state.information?.firstName,
            lastName: state.information?.lastName,
            email: state.information?.email,
            isActive: state.information?.isActive,
            location: {
            complex: {
                id: state.information?.location.complex.id,
                name: state.information?.location.complex.name,
            },
            unit: {
                id: state.information?.location.unit.id,
                name: state.information?.location.unit.name,
            },
            housing: {
                id: state.information?.location.housing.id,
                name: state.information?.location.housing.name,
      }
    }
  }
})
        }
    )
)