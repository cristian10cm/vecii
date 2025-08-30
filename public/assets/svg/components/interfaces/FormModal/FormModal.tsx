import './index.css';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useStateForm } from '@/components/stores/storeFormUpdate';
import { setHousing } from '@/components/stores/StoreHousing';
const FormModal = ({ typePQR, nameType }: { nameType: string; typePQR: String }) => {
  const [useModal, setModal] = useState<boolean>(true);
  const { setStateForm } = useStateForm();
  const [useData, setData] = useState<string>('');
  const today = new Date().toISOString().split('T')[0];
  const infoUser = setHousing()
  const OnSub = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { motivo, descripcion } = event.target as HTMLFormElement;

    if (motivo.value.length < 5 || motivo.value.length > 50) {
      toast.error('La longitud del motivo debe ser de 5 a 30 caracteres.');
      return;
    }

    if (descripcion.value.length < 10 || descripcion.value.length > 500) {
      toast.error('La longitud de la descripción debe ser de mínimo 10 caracteres y máximo 200.');
      return;
    }

    try {
      const crearQR = await axios.post(
        'https://api.vecii.com.co/api/v1/pqr',
        {
          subject: motivo.value,
          description: descripcion.value,
          type: typePQR,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );

      setData(crearQR.data.caseNumber);
      setModal(false);
      toast.success(`¡Tu ${nameType} fue creada exitosamente!`);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setStateForm({
      stateFormPQR: false,
      updatePQR: useData,
    });
    setModal(true);
  };

  const closeForm = () => {
    setStateForm({
      stateFormPQR: false,
    });
  };

  return (
    <div className="container_form_display">
      {useModal ? (
        <form className="container_quejasReclamos_form" onSubmit={OnSub}>
          <span onClick={closeForm}>
            <MdClose />
          </span>
          <label className="container_quejasReclamos_form_label">Motivo</label>
          <input
            name="motivo"
            type="text"
            className="container_quejasReclamos_form_input"
            placeholder={`Escribe el motivo de tu ${nameType == 'Reclamos'? 'reclamo':'queja'}`}
          />
          <label className="container_quejasReclamos_form_label">Descripción {nameType== 'Reclamos'? 'del reclamo':'de la queja'}</label>
          <textarea
            name="descripcion"
            className="container_quejasReclamos_form_input"
            placeholder={`Describe tu ${nameType == 'Reclamos'? 'reclamo':'queja'}`}
          ></textarea>
          <button className="container_quejasReclamos_form_btn" type="submit">
            {`Radicar ${nameType == 'Reclamos'? 'reclamo':'queja'}`}
          </button>
        </form>
      ) : (
        <div className="container_modalFormPQR_display">
          <div className='container_modalFormPQR_header'>
            <p className="container_modalFormPQR_paragraphe">¡Radicación exitosa Vecii!</p>
            <p className="container_modalFormPQR_date">{today}</p>
          </div>
          <div className="container_modalFormPQR_info">
            <p className="container_modalFormPQR_info_name">{infoUser.information?.firstName} {infoUser.information?.lastName}</p>
            <p className="container_modalFormPQR_info_housing">{infoUser.information?.location.unit.name}-{infoUser.information?.location.housing.name}</p>
          </div>
          <div className="container_modalFormPQR_response">
            <p className="container_modalFormPQR_responde_paragraphe">Código de radicado</p>
            <p className="container_modalFormPQR_responde_code">{useData}</p>
          </div>
          <img
            className="container_modalFormPQR_closeModal"
            onClick={closeModal}
            src="https://cdn-icons-png.flaticon.com/128/6785/6785304.png"
          />
        </div>
      )}
    </div>
  );
};

export default FormModal;