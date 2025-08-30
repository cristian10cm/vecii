import {create} from 'zustand'
export interface month{
    numberMont: number | null
}
type dateMonth = {
    currentMonth : month | null
    setMonth : (newMonth:month)=>void
}   

export const useFilterDate = create<dateMonth>()(
    (set)=>(
        {
            currentMonth:null,
            setMonth : (newMonth:month)=>set({currentMonth:newMonth})
        }
    )
)
