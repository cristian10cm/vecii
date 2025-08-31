'use client';
import './index.css';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import ModalFormCreate from '@/components/interfaces/ModalFormCreate/ModalFormCreate';
import ComunityService from '@/components/interfaces/ComunityService/ComunityService';
import IconSvgGradient from '@/components/interfaces/IconSvgGradient/IconSvgGradient';
import { CommunityService ,datosComunidad } from '.';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useStateForm } from '@/components/stores/storeFormUpdate';
import BtnSeeMore from '@/components/interfaces/BtnSeeMore/BtnSeeMore';
import { apiDataFilter } from '@/components/stores/apiDataFilter';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setHousing } from '@/components/stores/StoreHousing';
const Comunidad = () => {
  const [useComunidad, setComunidad] = useState<datosComunidad[]>([]);
  const [useMineServicios, setMineServicios] = useState<CommunityService[]>([]);
  const { setInformation,barInformation } = useSearchBar();
  const [seeMore1,setMore1 ]= useState<boolean>(false) 
  const [seeMore2,setMore2 ]= useState<boolean>(false) 
  const [stateBoton, setStateBoton] = useState<boolean>(false);
  const { setStateForm } = useStateForm();
  const stateForm = useStateForm().stateForm;
  const complex = setHousing().information?.location.complex.name || 'Cargando..'
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
   const servicios = async (typeService:'mine'|'community') => {
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
      console.log(data)
     typeService == 'mine' ?  setMineServicios(data): setComunidad(data)
    } catch (error) {
      console.log("Petición mis servicios: ", error);
    }
  };
  useEffect(() => {
   setInformation({ inputValue: '' });
   servicios('mine')
   servicios('community')
  }, [stateForm?.updatePQR]);

  const comunidad = apiDataFilter(useComunidad,'title',seeMore2,barInformation?.inputValue || '');
  const serviciosPublicados = apiDataFilter(useMineServicios,'title',seeMore1,barInformation?.inputValue || '')
  return (
    <>
      <VeciiHeaderImg
        srcImg='https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        name='Comunidad'
        detail={complex}
      />
<SearchBar placeholder='Nombre del servicio' />
    

      <OpcionBox
      gradients={true}
        nameBox1='Comunidad'
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
          serviciosPublicados.filterData.length > 0 ? (
            <>
            {
              serviciosPublicados.filterData.map((info, k) => (
              <ComunityService
                idService={info.id}
               
                pathService='/resident/comunidad/servicios_publicados/'
                key={k}
                imgServicio='https://todocedritos.com/servicio_domicilio_supermercado_barrio_cedritos_bogota/fruver_belmira_supermercado_fruteria_barrio_belmira_cedritos_norte_bogota_2b.jpg'
                nameServicio={info.title}
                precioServicio={info.price}
              />
            ))
            }
            {serviciosPublicados.stateSeeMore ? <BtnSeeMore enable={()=>setMore1(true)}/>:''}
            </>
          ) : (
            <ComunityService
              pathService=''
              imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
              nameServicio='No encontrado'
              precioServicio='0000'
              idService=''
            />
          ): <NoApiData message='¡Crea tu servicio Vecii!'/>
        ) : 
        useComunidad.length>0?
        comunidad.filterData.length > 0 ? (
          <>
          {
            comunidad.filterData.map((info, k) => (
            <ComunityService
                idService={info.id}
                pathService='/resident/comunidad/servicios-comunidad/'
                key={k}
                imgServicio='https://todocedritos.com/servicio_domicilio_supermercado_barrio_cedritos_bogota/fruver_belmira_supermercado_fruteria_barrio_belmira_cedritos_norte_bogota_2b.jpg'
                nameServicio={info.title}
                precioServicio={info.price}

            />
          ))
          }
          {comunidad.stateSeeMore ?<BtnSeeMore enable={()=>setMore2(true)}/>:''}
          </>
        ) : (
           <ComunityService
              pathService=''
              idService=''
              imgServicio='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
              nameServicio='No encontrado'
              precioServicio=''
            />
        ):
        <NoApiData message='¡No tienes servicios tomados!'/>

      
      }
        {stateForm?.stateFormPQR && <ModalFormCreate />}
      </div>
      <FooterFantasma/>
    </>
  );
};

export default Comunidad;
