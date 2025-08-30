'use client';
import './index.css';
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import ModalFormCreate from '@/components/interfaces/ModalFormCreate/ModalFormCreate';
import ComunityService from '@/components/interfaces/ComunityService/ComunityService';
import IconSvgGradient from '@/components/interfaces/IconSvgGradient/IconSvgGradient';
import { CommunityService ,datosComunidad } from '.';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useStateForm } from '@/components/stores/storeFormUpdate';
import { apiDataFilter } from '@/components/stores/apiDataFilter';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
import BtnSeeMore from '@/components/interfaces/BtnSeeMore/BtnSeeMore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Comunidad = () => {
  const [useServicios, setServicios] = useState<datosComunidad[]>([]);
  const [useMineServicios, setMineServicios] = useState<CommunityService[]>([]);
      const [seeMore1,setMore1 ]= useState<boolean>(false) 
     const [seeMore2,setMore2 ]= useState<boolean>(false) 
  const { setInformation,barInformation } = useSearchBar();

  const [stateBoton, setStateBoton] = useState<boolean>(false);
  const { setStateForm } = useStateForm();
  const stateForm = useStateForm().stateForm;

  const changeState = (data: boolean) => {
    setStateBoton(data);
    setMore1(false)
    setMore2(false)
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
  const servicioComunidad = apiDataFilter(useServicios,'title',seeMore1,barInformation?.inputValue || '')
  const misServicios = apiDataFilter(useMineServicios,'title',seeMore2,barInformation?.inputValue || '')
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
        gradients={true
        }
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
          misServicios.filterData.length > 0 ? (
            <>
             {misServicios.filterData.map((info, k) => (
              <ComunityService
                pathService='/resident/mi-hogar/mis-servicios/servicios_publicados/'
                key={k}
                imgServicio='https://todocedritos.com/servicio_domicilio_supermercado_barrio_cedritos_bogota/fruver_belmira_supermercado_fruteria_barrio_belmira_cedritos_norte_bogota_2b.jpg'
                nameServicio={info.title}
                precioServicio={(info.price)}
                 idService={info.id}
              />
            ))
            }
            {misServicios.stateSeeMore ? <BtnSeeMore enable={()=>setMore2(true)} />:''}
            </>
          ) : (
            <ComunityService
              pathService=''
              idService=''
              imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
              nameServicio='No encontrado'
              precioServicio='0000'
            />
          ): <NoApiData message='¡Crea tu servicio Vecii!'/>
        ) : 
        useServicios.length>0?
        servicioComunidad.filterData.length > 0 ? (
            <>
              {
                servicioComunidad.filterData.map((info, k) => (
                <ComunityService
                  pathService='/resident/mi-hogar/mis-servicios/servicio-comunidad/'
                  key={k}
                  idService={info.id}
                  imgServicio='https://todocedritos.com/servicio_domicilio_supermercado_barrio_cedritos_bogota/fruver_belmira_supermercado_fruteria_barrio_belmira_cedritos_norte_bogota_2b.jpg'
                  nameServicio={info.title}
                  precioServicio={info.price}
              />
              ))
              }
             {servicioComunidad.stateSeeMore ? <BtnSeeMore enable={()=>setMore1(true)} />:''}
            </>
        ) : (
           <ComunityService
           idService=''
           pathService=''
              imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
              nameServicio='No encontrado'
              precioServicio='0000'
            />
        ):
         <NoApiData message='¡No hay servicios disponibles!'/>
      
      }

        {stateForm?.stateFormPQR && <ModalFormCreate />}
      </div>

    </>
  );
};

export default Comunidad;
