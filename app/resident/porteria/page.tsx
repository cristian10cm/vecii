'use client'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import './index.css';
import DirectoryEmergencyPhone from '@/components/interfaces/DirectoryEmergencyPhone/DirectoryEmergencyPhone';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useEffect } from 'react';
const Porteria = () => {
    const resultSearch = useSearchBar()
    const directoryNumbers = [
        {
            srcImg: 'https://img.icons8.com/3d-fluency/94/office-phone.png',
            name: 'Portería',
            number: '3148564215'
        },
        {
            srcImg: 'https://img.icons8.com/3d-fluency/94/fire-extinguisher.png',
            name: 'Bomberos',
            number: '119'
        },
        {
            srcImg: 'https://img.icons8.com/3d-fluency/94/police.png',
            name: 'Policia metropolitana',
            number: '112'
        },
        {
            srcImg: 'https://img.icons8.com/3d-fluency/94/find-clinic.png',
            name: 'Cruz Roja',
            number: '132'
        },
        {
            srcImg: 'https://img.icons8.com/3d-fluency/94/spring-landscape.png',
            name: 'Defensa Civil',
            number: '144'
        },
        {
            srcImg: 'https://img.icons8.com/3d-fluency/94/ambulance.png',
            name: 'Ambulancias',
            number: '125'
        }
    ];
    const information = directoryNumbers.filter((e)=>e.name.toLocaleLowerCase().includes((resultSearch.information?.inputValue)?.toLowerCase().trim() || ''))

    return (
        <>
            <VeciiHeaderImg
                srcImg='https://dimobaservicios.com/wp-content/uploads/2023/08/recepcionista-funciones.jpg'
                name='Directorio'
                detail='Comunícate con nosotros'
            />
            <SearchBar
                placeholder=''
            />
            <div className='directoryNumbers'>
                { 
                    information.length >0 ?
                    information.map((option, index) => (
                        <DirectoryEmergencyPhone
                            key={index}
                            srcImg={option.srcImg}
                            name={option.name}
                            number={option.number}
                        />
                        
                    )):
                     <DirectoryEmergencyPhone
                            srcImg={'https://cdn-icons-png.flaticon.com/512/6134/6134116.png'}
                            name={'Not Found'}
                            number={'00000'}
                      />
                }

            </div>
            <FooterFantasma/>

        </>
    );

};

export default Porteria;