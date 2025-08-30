'use client'
import './index.css';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import PaymentService from '@/components/interfaces/PaymentService/PaymentService';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
const Paqueteria = ()=>{
    return(
       <>
         <VeciiHeaderImg
           srcImg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvNZVE68kVo2kW_kB5LIeZyRFGUneucdFPCg&s'
           name='Paquetería'
           detail='Casa 38'
        />
        <SearchBar
          placeholder=''
        />
         <OpcionBox
                    nameBox1='Servicios publicos'
                    nameBox2='Paqueteria'
               
            />
        <div className='container_packages'>
            <PaymentService
                month='Escritorio Easy'
                precie='220.000'
                statePayment={false}
                date='07/09/2025'
                contentTextFalse = 'Sin recibir'
                contentTextTrue =  'Recibido'
                pathName='/resident/buzon/paqueteria/paquete/'
            />
              <PaymentService
                month='Escritorio Easy'
                precie='220.000'
                statePayment={true}
                date='07/09/2025'
               contentTextFalse = 'Sin recibir'
                contentTextTrue =  'Recibido'
                 pathName='/resident/buzon/paqueteria/paquete'
            />
              <PaymentService
                month='Escritorio Easy'
                precie='220.000'
                statePayment={true}
                 pathName='/resident/buzon/paqueteria/paquete'
                date='07/09/2025'
                contentTextFalse = 'Sin recibir'
                contentTextTrue =  'Recibido'
            />
              <PaymentService
                month='Escritorio Easy'
                precie='220.000'
                statePayment={false}
                pathName='/resident/buzon/paqueteria/paquete'                
                date='07/09/2025'
                contentTextFalse = 'Sin recibir'
                contentTextTrue =  'Recibido'
            />
        </div>
       </>
    )
}
export default Paqueteria