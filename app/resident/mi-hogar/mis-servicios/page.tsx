'use client';
import './index.css';
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import ModalFormCreate from '@/components/interfaces/ModalFormCreate/ModalFormCreate';
import ComunityService from '@/components/interfaces/ComunityService/ComunityService';
import { MdAddCircle } from 'react-icons/md';
import { CommunityService ,datosComunidad } from '.';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useStateForm } from '@/components/stores/storeFormUpdate';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Comunidad = () => {
  const [useServicios, setServicios] = useState<datosComunidad[]>([]);
  const [useMineServicios, setMineServicios] = useState<CommunityService[]>([]);

  const { setInformation } = useSearchBar();
  const { information } = useSearchBar();
  const [stateBoton, setStateBoton] = useState<boolean>(false);
  const { setStateForm } = useStateForm();
  const stateForm = useStateForm().stateForm;

  const changeState = (data: boolean) => {
    setStateBoton(data);
  };

  const openForm = () => {
    setStateForm({
      stateFormPQR: true,
    });
  };
  const peticionServicios = async (typeService:'mine' | 'community') => {
    try {
      const peticion = await axios.get(
        'https://api.vecii.com.co/api/v1/community-services',
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          params: {
            type: typeService,
          },
        }
      );
      const data = peticion.data.results
      typeService == 'mine' ?  setMineServicios(data): setServicios(data)
    } catch (error) {
      console.log("Petición mis servicios: ", error);
    }
  };
  useEffect(() => {
    setInformation({ inputValue: '' });
    peticionServicios('community')
    peticionServicios('mine')
  }, [stateForm?.updatePQR]);

  const serviciosFiltrados = useServicios.filter((e) =>
    e.title.toLowerCase().trim().includes(information?.inputValue?.toLowerCase().trim() || '')
  );

  const misServiciosFiltrados = useMineServicios.filter((e) =>
    e.title.toLowerCase().trim().includes(information?.inputValue?.toLowerCase().trim() || '')
  );

  return (
    <>
       <VeciiHeader
                srcImg='/assets/svg/mis servicios.svg'
                name='Mis Servicios'
                transparent={false}
            />
        <SearchBar placeholder='Nombre del servicio' />
    
      <OpcionBox
        nameBox1='Comunidad'
        nameBox2='Mis servicios'
        path1=''
        path2=''
        onClickDato={changeState}
      />
        
        {stateBoton && (
          <div className='container_community_searchBar'>
            
           <div className='container_community_searchBar_items'>
               <p className='container_community_paragraphe'>Agregar nuevo servicio</p>
              <button className='container_community_add' onClick={openForm}>
                <MdAddCircle />
              </button>
           </div>
          </div>
        )}

      <div className='container_serviciosComunitarios'>
        {stateBoton ? (
          useMineServicios.length>0 ?
          misServiciosFiltrados.length > 0 ? (
            misServiciosFiltrados.map((info, k) => (
              <ComunityService
                pathService=''
                key={k}
                imgServicio='https://todocedritos.com/servicio_domicilio_supermercado_barrio_cedritos_bogota/fruver_belmira_supermercado_fruteria_barrio_belmira_cedritos_norte_bogota_2b.jpg'
                nameServicio={info.title}
                precioServicio={(info.price)}
                 idService={info.id}
              />
            ))
          ) : (
            <ComunityService
              pathService=''
              idService=''
              imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
              nameServicio='No encontrado'
              precioServicio='0000'
            />
          ): <p className='grid_services_void'>¡Crea tu servicio Vecii!</p>
        ) : 
        useServicios.length>0?
        serviciosFiltrados.length > 0 ? (
          serviciosFiltrados.map((info, k) => (
            <ComunityService
            pathService='/resident/mi-hogar/mis-servicios/servicio-comunidad/'
              key={k}
              idService={info.id}
              imgServicio='https://todocedritos.com/servicio_domicilio_supermercado_barrio_cedritos_bogota/fruver_belmira_supermercado_fruteria_barrio_belmira_cedritos_norte_bogota_2b.jpg'
              nameServicio={info.title}
              precioServicio='5000'
            />
          ))
        ) : (
           <ComunityService
           idService=''
           pathService=''
              imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
              nameServicio='No encontrado'
              precioServicio='0000'
            />
        ):

      <p className='grid_services_void'>¡No hay servicios disponibles!</p>
      
      }

        {stateForm?.stateFormPQR && <ModalFormCreate />}
      </div>

      <FooterFantasma />
    </>
  );
};

export default Comunidad;
