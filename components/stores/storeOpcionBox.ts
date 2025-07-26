import {create} from 'zustand'

export interface stateOpcion{
    state: string | null
}
type OpcionBox={
    information : null | stateOpcion,
    setStateOpcion: (newOpcion:stateOpcion)=>void
}
export const setOpcionBox = create<OpcionBox>()(
    (set)=>(
        {
            information : null,
            setStateOpcion:(newOpcion:stateOpcion)=>set({information:newOpcion})
        }
    )
)