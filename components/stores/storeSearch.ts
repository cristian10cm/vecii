import {create} from 'zustand';
// import {persist, createJSONStorage} from 'zustand/middleware'

export interface ValuesSearchBar{
    inputValue : string
}

type SearchBar = {
    information : ValuesSearchBar | null;
    setInformation: (newInformation:ValuesSearchBar)=>void
}
export const useSearchBar = create<SearchBar>()(
            (set)=>
                (
                {
                    information : null,
                    setInformation: (newInformation:ValuesSearchBar)=>set({information:newInformation})
                }
            )
) 