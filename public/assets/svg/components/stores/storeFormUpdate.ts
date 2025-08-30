import {create} from 'zustand'
export interface statePQR{
    stateFormPQR?: boolean | null,
    updatePQR?: string | null
}
type updateState = {
    stateForm : statePQR | null,
    setStateForm : (newStateForm: statePQR)=>void
}
export const useStateForm = create<updateState>()(
    (set)=>(
        {
        stateForm: null,
        setStateForm:(newStateForm: statePQR)=>set({stateForm:newStateForm})
        }
    )
)