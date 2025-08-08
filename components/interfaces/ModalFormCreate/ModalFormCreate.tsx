'use client'
import { useRef } from 'react';
import './index.css'
import { MdClose } from 'react-icons/md';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setHousing } from '@/components/stores/StoreHousing';
import { useStateForm } from '@/components/stores/storeFormUpdate';
const ModalFormCreate =()=>{
    const information = setHousing()
    const stateForm = useStateForm()
    const complexId = information.information?.location.complex.id
    const onClose = ()=>{
        stateForm.setStateForm({
                    stateFormPQR:false
        })
    }
    const onSubmit = async (event: FormEvent<HTMLFormElement>)=>{

            event.preventDefault()
            const {servicio,descripcion,precio} = event.target as HTMLFormElement;
            if (servicio.value.length < 5 || servicio.value.length > 50) {
                  toast.error('La longitud del motivo debe ser de 5 a 30 caracteres.');
                  return;
                }
            
            if (descripcion.value.length < 10 || descripcion.value.length > 500) {
                  toast.error('La longitud de la descripción debe ser de mínimo 10 caracteres y máximo 200.');
                  return;
            }
            if (precio.value<0 || precio.value>10000000){
                toast.error('Escribe un valor valido');
                  return;
            }
            try{
                const peticion = await axios.post('https://api.vecii.com.co/api/v1/community-services',
                    {
                          "title":  servicio.value,
                           "description": descripcion.value,
                          "price": precio.value,
                          "complexId": complexId
                    },{
                        headers:{
                            Authorization:`Bearer ${Cookies.get('token')}`
                        },
                        params:{
                            'type':'mine'
                        }
                    }
                )
                console.log(peticion.data)
                toast.success('Servicio creado exitosamente.')
                stateForm.setStateForm({
                    updatePQR:peticion.data.id,
                    stateFormPQR:false
                })

            }catch(err){
                                console.log(complexId)

                console.log(err)
                toast.error('No se pudo realizar la creación de servicio')
            }
    }   

return(
       <div className="container_createService">
       
        <form className="container_createService_form" onSubmit={onSubmit}>
          <span onClick={()=>onClose()}>
            <MdClose />
          </span>
          <label className="container_createService_form_label">Servicio</label>
          <input
            name="servicio"
            type="text"
            className="container_createService_form_input"
            placeholder="Nombre del servicio"
          />

          <label className="container_createService_form_label">Descripción del Servicio</label>
          <textarea
            name="descripcion"
            className="container_createService_form_input"
            placeholder="Describe tu servicio"
          ></textarea>
            <label className="container_createService_form_label">Precio</label>
            <input
            name="precio"
            type="number"

            className="container_createService_form_input"
            placeholder="Precio del servicio"
          />
          <button className="container_createService_form_btn" type="submit">
            Ofertar servicio
          </button>
        </form>
</div>

    )
}
export default ModalFormCreate