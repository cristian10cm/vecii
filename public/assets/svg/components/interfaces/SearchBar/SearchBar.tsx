"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useSearchBar } from '@/components/stores/storeSearch';
import { FaSearch } from "react-icons/fa";
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
import './index.css';

const SearchBar = ({placeholder}:{placeholder:string}) => {
    const [currentValue , setCurrentValue] = useState<string>('');
    const {setInformation,barInformation} = useSearchBar();
    const information = useSearchBar();
    const handlerSearchBar = (e:React.KeyboardEvent) =>{
        if (e.key == 'Enter'){
            e.preventDefault();
            console.log(barInformation?.inputValue)
            alert(`buscando coincidencias ${currentValue}`)
        };
    };

    return(
        <div className='container_searchBar'>
            <div className='container_searchBar_icon'>
                    <IconSvgGradient
                        urlImage='/assets/svg/magnifying-glass-bold.svg'
                        widthImg='5vw'
                    />
            </div>
            <div className='container_searchBar_inputContainer'>
                <input 
                    onChange={(e)=>setInformation({inputValue:e.target.value})}
                    onKeyDown={handlerSearchBar}
                    className='container_searchBar_input' 
                    type='text' 
                    placeholder={placeholder}
                ></input>
            </div>
       
        </div>
    )

}

export default SearchBar;