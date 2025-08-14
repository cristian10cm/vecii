import {create} from 'zustand';
// import {persist, createJSONStorage} from 'zustand/middleware'

export interface ValuesSearchBar{
    inputValue : string
}

type SearchBar = {
    barInformation : ValuesSearchBar | null;
    setInformation: (newInformation:ValuesSearchBar)=>void
}
export const useSearchBar = create<SearchBar>()(
            (set)=>
                (
                {
                    barInformation : null,
                    setInformation: (newInformation:ValuesSearchBar)=>set({barInformation:newInformation})
                }
            )
) 