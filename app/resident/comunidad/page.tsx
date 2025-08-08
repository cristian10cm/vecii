'use client';
import './index.css';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import ModalFormCreate from '@/components/interfaces/ModalFormCreate/ModalFormCreate';
import ComunityService from '@/components/interfaces/ComunityService/ComunityService';
import { MdAddCircle } from 'react-icons/md';
import IconSvgGradient from '@/components/interfaces/IconSvgGradient/IconSvgGradient';
import { CommunityService ,datosComunidad,servicioTomadoType } from '.';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useStateForm } from '@/components/stores/storeFormUpdate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const Comunidad = () => {
  const [useServicios, setServicios] = useState<servicioTomadoType[]>([]);
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
  const  misServicios =  async () => {
    try {
      const peticion = await axios.get(
        'https://api.vecii.com.co/api/v1/community-services/orders/taken-by-user',
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          }
        }
      );
      const data = peticion.data.results
      setServicios(data)
      console.log(data)
    } catch (error) {
      console.log("Petición mis servicios: ", error);
    }
  };
   const misPublicados = async () => {
    try {
      const peticion = await axios.get(
        'https://api.vecii.com.co/api/v1/community-services',
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          params: {
            type: 'mine',
          },
        }
      );
      const data = peticion.data.results
      setMineServicios(data)
    } catch (error) {
      console.log("Petición mis servicios: ", error);
    }
  };
  useEffect(() => {
   setInformation({ inputValue: '' });
   misPublicados()
   misServicios()
  }, [stateForm?.updatePQR]);

  const serviciosFiltrados = useServicios.filter((e) =>
    e.service.title.toLowerCase().trim().includes(information?.inputValue?.toLowerCase().trim() || '')
  );

  const misServiciosFiltrados = useMineServicios.filter((e) =>
    e.title.toLowerCase().trim().includes(information?.inputValue?.toLowerCase().trim() || '')
  );

  return (
    <>
      <VeciiHeaderImg
        srcImg='https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        name='Comunidad'
        detail='Conjunto nombre'
      />
<SearchBar placeholder='Nombre del servicio' />
    

      <OpcionBox
        nameBox1='Servicios tomados'
        nameBox2='Publicados'
        path1=''
        path2=''
        onClickDato={changeState}
      />
        {stateBoton && (
          <div className='container_community_searchBar'>
            
           <div className='container_community_searchBar_items'>
               <p className='container_community_paragraphe'>Agregar nuevo servicio</p>
              <button className='container_community_add' onClick={openForm}>
                <IconSvgGradient 
                  urlImage='/assets/svg/plus-circle-fill.svg'
                  widthImg='7vw'
                />
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
                idService={info.id}
                pathService=''
                key={k}
                imgServicio='https://todocedritos.com/servicio_domicilio_supermercado_barrio_cedritos_bogota/fruver_belmira_supermercado_fruteria_barrio_belmira_cedritos_norte_bogota_2b.jpg'
                nameServicio={info.title}
                precioServicio={'5000'}
              />
            ))
          ) : (
            <ComunityService
              pathService=''
              imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
              nameServicio='No encontrado'
              precioServicio='0000'
              idService=''
            />
          ): <p className='grid_services_void'>¡Crea tu servicio Vecii!</p>
        ) : 
        useServicios.length>0?
        serviciosFiltrados.length > 0 ? (
          serviciosFiltrados.map((info, k) => (
            <ComunityService
            idService={info.id}
              key={k}
              pathService=''
              imgServicio='https://todocedritos.com/servicio_domicilio_supermercado_barrio_cedritos_bogota/fruver_belmira_supermercado_fruteria_barrio_belmira_cedritos_norte_bogota_2b.jpg'
              nameServicio={info.service.title}
              precioServicio={info.service.price }
            />
          ))
        ) : (
           <ComunityService
              pathService=''
              idService=''
              imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
              nameServicio='No encontrado'
              precioServicio=''
            />
        ):

      <p className='grid_services_void'>¡No tienes servicios tomados!</p>
      
      }
        {stateForm?.stateFormPQR && <ModalFormCreate />}
      </div>

      <FooterFantasma />
    </>
  );
};

export default Comunidad;
