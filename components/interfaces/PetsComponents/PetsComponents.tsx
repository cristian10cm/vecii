'use client';

import { useState } from 'react';
import './index.css';

type PetsComponentsProps = {
    srcImg: string,
    name: string,
    year: string,
    type: string
};

const PetsComponents = ({ srcImg, name, year, type }: PetsComponentsProps) => {

    const [edit, setEdit] = useState<boolean>(false);

    return (
        <>
            {
                !edit
                    ? <div className='PetComponent_container'>
                        <img src={srcImg} className='PetComponent_imgPet'></img>
                        <div className='PetComponent_containerInfo'>
                            <p className='PetComponent_idCar'>
                                <b>Nombre:</b> {name}
                            </p>
                            <p className='PetComponent_position'>
                                <b>Edad:</b> {year}
                            </p>
                            <p className='PetComponent_type'>
                                <b>Raza:</b> {type}
                            </p>
                        </div>
                        <button onClick={() => setEdit(true)} className='PetContainer_btn_edit'>Editar</button>
                    </div>
                    : <div className='PetComponent_container'>
                        <img src={srcImg} className='PetComponent_imgPet'></img>
                        <div className='PetComponent_containerInfo'>
                            <p className='PetComponent_idCar'>
                                <b>No sé:</b>
                            </p>
                            <p className='PetComponent_position'>
                                <b>que puedo:</b>
                            </p>
                            <p className='PetComponent_type'>
                                <b>Enviar:</b>
                            </p>
                        </div>
                        <button onClick={() => setEdit(false)} className='PetContainer_btn_edit'>Editar</button>
                    </div>
            }

        </>
    );
};

export default PetsComponents;