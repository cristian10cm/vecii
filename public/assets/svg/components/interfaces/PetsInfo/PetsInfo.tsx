'use client';
import './index.css';
import PetsComponents from '../PetsComponents/PetsComponents';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { setHousing } from '@/components/stores/StoreHousing';
import CreatePet from '../CreatePet/CreatePet';
import axios from 'axios';
import { useUpdatePets } from '@/components/stores/storePets';


type pet = {
  createdAt: string;
  id: string;
  name: string;
  birthDate: string;
  type: {
    id: string;
    name: string;
  };
  breed: {
    id: string;
    name: string;
  };
};

const PetsInfo = () => {
  const { information } = setHousing();
  const token = Cookies.get('token');
  const count = useUpdatePets();
  const [usePet, setPet] = useState<pet[]>([]);
  
  useEffect(() => {
    if (!information) return;

    const verifyPet = async () => {
      try {
        const peticion = await axios.get(
          'https://api.vecii.com.co/api/v1/pets',
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              housingId: information.location.housing.id
            }
          }
        );
        const data = peticion.data.results;
        setPet(data);
      } catch (error) {
        console.log(error);
      }
    };

    verifyPet();
  }, [information, count.count?.state]);

  return (
    <div className='container_pets_grid'>
      <div className='container_pets_grid_separator'>
        <div className='container_pets_grid_separator_line'></div>
        <p className='container_pets_grid_separator_nameText'>Mascotas</p>
        <div className='container_pets_grid_separator_line'></div>
      </div>
      
      {usePet.length < 3 && <CreatePet />}

      {usePet.map((x, k) => (
        <PetsComponents
          key={k}
          srcImg='https://img.icons8.com/3d-fluency/94/dog.png'
          name={x.name}
          year={x.birthDate}
          idPet = {x.id}
          breed={x.breed.name}
          idBreed={x.breed.id}
          idType={x.type.id}
        />
      ))}
    </div>
  );
};

export default PetsInfo;