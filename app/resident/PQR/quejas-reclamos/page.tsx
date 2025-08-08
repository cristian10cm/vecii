'use client';
import './index.css';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import PQRQuestionsS from '@/components/interfaces/PQRQuestions/PQRQuestions';
import {  useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { setHousing } from '@/components/stores/StoreHousing';
import { useSearchBar } from '@/components/stores/storeSearch';
import { MdAddCircle } from 'react-icons/md';
import FormModal from '@/components/interfaces/FormModal/FormModal';
import { typesPQ } from '.';
import { useStateForm } from '@/components/stores/storeFormUpdate';
const quejasReclamos = () => {
  const { setInformation } = useSearchBar();
  const [useInfo, setInfo] = useState<typesPQ[]>([]);
  const { information } = setHousing();
  const [idPQR, setIdPQR] = useState('');
  const [nombreType, setNombreType] = useState('');
  const searchInfo = useSearchBar();
  const { setStateForm, stateForm } = useStateForm();

  const openForm = () => {
    setStateForm({
      stateFormPQR: true,
    });
  };

  useEffect(() => {
    if (!information) return;

    setInformation({
      inputValue: '',
    });

    const storedId = localStorage.getItem('idPQR');
    const storedName = localStorage.getItem('idNamePQR');
    if (storedId) setIdPQR(storedId);
    if (storedName) setNombreType(storedName);
    console.log(localStorage.getItem('idType'));

    const peticionQR = async () => {
      try {
        const peticion = await axios.get('https://api.vecii.com.co/api/v1/pqr', {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });
        console.log(peticion.data)
        const { data } = peticion;
        
        setInfo(data.filter((x: typesPQ) => x.type.id == idPQR));
      } catch (error) {
        console.log(error);
      }
    };

    peticionQR();
  }, [information, idPQR, stateForm]);

  const datos = useInfo.filter((x) =>
    x.subject.toLowerCase().trim().includes(
      searchInfo.information?.inputValue.toLowerCase().trim() || ''
    )
  );

  return (
    <>
      <VeciiHeaderImg
        srcImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq8AnyLfZx3k_xAlg5BC8mmNdzQl3DlqhPOCDHeEtLN9zIE51pPQtg7xSeTNAkXJUQDN8&usqp=CAU"
        name="PQR"
        detail="Conjunto de madelena"
      />
      <div className="container_quejasReclamos_searchBar">
        <SearchBar placeholder="" />
        <button className="container_quejasReclamos_btnAdd" onClick={openForm}>
          <MdAddCircle />
        </button>
      </div>
      <div className="container_quejasReclamos">
        <div className="container_quejasReclamos_sectionTitle">
          <div className="container_quejasReclamos_sectionTitle-line"></div>
          <h2 className="container_quejasReclamos_sectionTitle_title">
            {nombreType || 'Cargando..'}
          </h2>
          <div className="container_quejasReclamos_sectionTitle-line"></div>
        </div>
        <div className="container_quejasReclamos_items">

          {datos.length > 0?
          datos.map((x, k) => (
            <PQRQuestionsS
              iconName={nombreType}
              paragraphPQR={x.subject}
              pathPQR="/resident/PQR/quejas-reclamos/informacio-QR/"
              idQuestions={x.id}
              key={k}
              statusPQR={x.status.name}
            />
          )):
            <PQRQuestionsS
            iconName={nombreType}
              paragraphPQR='No encontrada'
              pathPQR="/resident/PQR/quejas-reclamos/informacio-QR/"
              idQuestions=''
              
            />
          
          }
        </div>
        {stateForm?.stateFormPQR && (
          <FormModal typePQR={idPQR} nameType={nombreType} />
        )}
      </div>
      <FooterFantasma />
    </>
  );
};

export default quejasReclamos;