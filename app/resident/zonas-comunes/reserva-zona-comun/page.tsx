'use client';
import './index.css';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import InputForm from '@/components/interfaces/InputForm/InputForm';
import {MdOutlinePermIdentity,MdOutlinePermContactCalendar} from 'react-icons/md';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import TimeDatePicker from '@/components/interfaces/TimeDatePicker/TimeDatePicker';
import AvailabilityDatePicker from '@/components/interfaces/DiasDatePicker/DiasDatePicker';
import {useDateCalendar,useTimeReservedStart,useTimeReservedEnd,useAvailability} from '@/components/stores/storeAvailabilityArea';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReservedAreaModal from '@/components/interfaces/ReservedAreaModal/ReservedAreaModal';
import { startDate,endDate,numberRegex,regexFecha,today,stringRegex,Reservation,AxiosBadRequestError } from './index';
import IconSvgGradient from '@/components/interfaces/IconSvgGradient/IconSvgGradient';

const ReserveArea = () => {
  console.log('ok')
  const timeStartHour = useTimeReservedStart()
  const timeEndHour = useTimeReservedEnd()
  const nombreRef = useRef<HTMLInputElement>(null);
  const apellidoRef = useRef<HTMLInputElement>(null);
  const cedulaRef = useRef<HTMLInputElement>(null);
  // const resetTimes = useTimeReserved((state) => state.resetTimes)
  const [useModal,setModal] = useState<boolean>(false)
  const [useDataArea,setDataArea] = useState<Reservation>()
  const [useName,setName] = useState<string>()
  const [useId,setId] = useState<string>()
  const dateSelected = useDateCalendar();
  // const timeSelected = useTimeReserved();
  const  [useKey,setKey] = useState<number>(1) 
  const closeModal = (data:boolean)=>{
          setModal(data)
  }
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nombre = nombreRef.current?.value.trim() ?? '';
    const apellido = apellidoRef.current?.value.trim() ?? '';
    const cedula = cedulaRef.current?.value.trim() ?? '';
    const fechaState = dateSelected.dateCalendar?.dateSelected;
    const fecha = fechaState instanceof Date ? fechaState.toISOString().split('T')[0] : '';
    // const start = timeSelected.time?.timesReserved?.start?.toString().split(' ')[4];
    const start = timeStartHour.time?.timesReservedStart.toString().split(' ')[4];
    const end = timeEndHour.time?.timesReservedEnd.toString().split(' ')[4];
    console.log(timeStartHour.time?.timesReservedStart)
    // const end = timeSelected.time?.timesReserved?.end?.toString().split(' ')[4];
    if(!useId) return
    if (nombre.length <= 2 || nombre.length > 30 || !stringRegex.test(nombre)) {
      toast.error('El nombre del visitante ingresado es inválido');
      return;
    }

    if (apellido.length <= 2 || apellido.length > 30 || !stringRegex.test(apellido)) {
      toast.error('El apellido del visitante ingresado es inválido');
      return;
    }

    if (cedula.length > 10 || cedula.length < 7  || !numberRegex.test(cedula)) {
      toast.error('El número de identificación ingresado es inválido');
      return;
    }

    if (!fecha || !regexFecha.test(fecha) || fecha <= today) {
      console.log(today)
      console.log(fecha)
      toast.error('La fecha ingresada es inválida');
      return;
    }

    if (!start || !end) {
      
      toast.error('Las horas de inicio y fin son requeridas');
      return;
    }
    const [hStart, mStart] = start.split(':');
    const [hEnd, mEnd] = end.split(':');
    startDate.setHours(Number(hStart), Number(mStart), 0);
    endDate.setHours(Number(hEnd), Number(mEnd), 0);
    // if (startDate >= endDate) {
    //   toast.error('La hora de finalización debe ser mayor a la de inicio');
    //   return;
    // }
    const [year, month, day] = fecha.split('-').map(Number);
    const timeStart = new Date(year, month - 1, day);
    const timeExit = new Date(year, month - 1, day);

    timeStart.setHours(Number(hStart), Number(mStart), 0) 
    timeExit.setHours(Number(hEnd), Number(hEnd), 0)
    try{
        const reserved = await axios.post('https://api.vecii.com.co/api/v1/common-areas-reservations',
          {
            "commonAreaId": useId,
            "startTime": timeStart.toISOString(),
            "endTime": timeExit.toISOString()
          },{
            headers:{
              Authorization: `Bearer ${Cookies.get('token')}`
            }
          }
        )
        setModal(true)
        setKey(useKey+1)
        setDataArea(reserved.data)
        toast.success('Zona reservada correctamente')
        setTimeout(()=>{
        if (nombreRef.current) nombreRef.current.value = '';
        if (apellidoRef.current) apellidoRef.current.value = '';
        if (cedulaRef.current) cedulaRef.current.value = '';
        dateSelected.setDateCalendar({ dateSelected: null });
        },500)

    }catch(err){
      const res = err
      const response = err as AxiosBadRequestError
      if(response.status === 400){
        toast.error(response.response.data.message)
      }else{
        toast.error(`No se pudo realizar la reserva`)}
      }
      

  };
  useEffect(()=>{
    
      const namePlace = localStorage.getItem('namePlaceReserved')
      const idZonaComun = localStorage.getItem('idZonaComun')

      if(idZonaComun){
        setId(idZonaComun)
      } 
      if(namePlace){
        setName(namePlace)
      }
      
      
  },[])

  return (
    <>
      <VeciiHeaderImg
        srcImg="https://coasa.org/wp-content/uploads/2022/04/construir-piscina-consejos.jpg"
        name={useName || 'Cargando..'}
        detail="Conjunto Pimientos de Madelena"
      />

      <form onSubmit={handleSubmit} className="container_reserveRegister">
        <h2 className="container_reserveRegister_title">Registro</h2>
       <div className='container_reserveRegister_form'>
        <InputForm
          imgIcon='/assets/svg/user-circle.svg'
          nameLabel='Nombre'
          nameOnsubmit="Nombre"
          placeHolder="Ejem. Juanita"
          typeInput="text"
          refInput={nombreRef}
        />
        <InputForm
          nameLabel='Apellido'
          nameOnsubmit="Apellido"
          placeHolder="Ejem. Lopez"
          imgIcon='/assets/svg/pencil-simple.svg'
          typeInput="text"
          refInput={apellidoRef}
        />
        <InputForm
          nameLabel='Cedula'
          nameOnsubmit="cedula"
          placeHolder="Ejem. 112255633"
          imgIcon='/assets/svg/identification-card.svg'
          typeInput="text"
          refInput={cedulaRef}
        />

        <div className="container_reserveRegister_date">
          <IconSvgGradient urlImage='/assets/svg/calendar-blank-bold.svg' widthImg='7vw'/>
          <label>Fecha</label>
          <AvailabilityDatePicker key={'Date:'+useKey} />
        </div>

        <div className="container_reserveRegister_time">
              <IconSvgGradient urlImage='/assets/svg/sign-in-bold.svg' widthImg='7vw'/>
          <label>Hora de inicio</label>
          <TimeDatePicker typeTime="start" key={'timeStart:'+useKey}/>
        </div>

        <div className="container_reserveRegister_time">
          <IconSvgGradient urlImage='/assets/svg/sign-out-bold.svg' widthImg='7vw'/>
          <label>Hora salida</label>
          <TimeDatePicker typeTime="end" key={'timeEnd:'+useKey}/>
        </div>
       </div>
          <input className="container_newReserved_btn_send" type="submit" value={useKey>1?'Realizar otra Reserva':'Registrar reserva'}/>
      </form>
      {
        useModal?
        <ReservedAreaModal
        onClose={closeModal}
        title = '!Tu reserva ha sido creada Vecii!'
        time={(useDataArea?.startTime) || 'Cargando..'}
        nameUser  = {useDataArea?.reservedBy.firstName+" "+useDataArea?.reservedBy.lastName}
        date = {useDataArea?.startTime || 'Cargando..'}
        />:''
      }

    </>
  );
};

export default ReserveArea;
