'use client'
import './index.css';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import { useSearchBar } from '@/components/stores/storeSearch';
import PaymentService from '@/components/interfaces/PaymentService/PaymentService';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { adminType,apiDataFilter } from '.';
import axios from 'axios';
import BtnSeeMore from '@/components/interfaces/BtnSeeMore/BtnSeeMore';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
import { apiDataFilterDate } from '@/components/stores/apiDataFilter';
import FilterDate from '@/components/interfaces/FilterDate/FilterDate';
import { useFilterDate } from '@/components/stores/storeFilterDate';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
const PagosAdministracion = () => {
  const [useData, setData] = useState<adminType[]>([]);
  const { setMonth, currentMonth } = useFilterDate();
  const {setInformation,barInformation} = useSearchBar()
  const [seeMore1, setMore1] = useState<boolean>(false);
  const [seeMore2, setMore2] = useState<boolean>(false);
  const [useCont, setCont] = useState<number>(1);
  const [useBoton, setBoton] = useState<boolean>(false);

  const changeOption = (data: boolean) => {
    setBoton(data);
    setMore1(false);
    setMore2(false);
    setCont(useCont + 1);
  };

  const getAdmin = async () => {
    try {
      const peticion = await axios.get('https://api.vecii.com.co/api/v1/invoices', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        params: {
          typeId: '0b4846e3-dd79-4ac6-b9ee-899565d61f25',
        },
      });
      setData(peticion.data.results);
      console.log(peticion.data.results[0].dueDate.toString())
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setInformation({
      inputValue:''
    })
    getAdmin();
    
  }, []);

  const changeMore = (data: boolean) => {
    setMore1(data);
    setMore2(data);
  };

  const dataInvoicesPaid = apiDataFilterDate(
    useData.filter((x) => x.status === 'paid'),
    'dueDate',
    currentMonth?.numberMont || 13,
    seeMore1
  );

  const dataInvoicesNoPaid = apiDataFilterDate(
    useData.filter((x) => x.status === 'pending'),
    'dueDate',
    currentMonth?.numberMont || 13,
    seeMore2
  );
  const invoicesPaid = apiDataFilter(dataInvoicesPaid.filtered,'dueDate',seeMore1,barInformation?.inputValue || '')
  const  invoicesNoPaid = apiDataFilter(dataInvoicesNoPaid.filtered,'dueDate',seeMore2,barInformation?.inputValue || '')


  return (
    <>
      <VeciiHeaderImg
        srcImg='https://www.visa.com.sv/dam/VCOM/regional/lac/SPA/argentina/run-your-business/pymes/botones-links-pago-800x450.jpg'
        name='Pago administración'
        detail='Conjuntos pimientos de castilla'
      />

      <OpcionBox
        nameBox1='Pagado'
        nameBox2='Sin Pagar'
        onClickDato={changeOption}
      />
      <SearchBar placeholder=''  />
      <div className='grid_admin_filter'>
        <FilterDate onChangeOption={changeMore} key={useCont} />
      </div>

      {!useBoton ? (
        <div className='grid_admin_payment'>
          {useData.length > 0 ? (
            invoicesPaid.filterData.length > 0 ? (
              <>
                {invoicesPaid.filterData.map((x, k) => (
                  <PaymentService
                    month={x.dueDate.split('T')[0]}
                    pathName='/resident/mi-hogar/pagos-administracion/pagar-admin'
                    precie={x.totalAmount}
                    statePayment={x.status === 'pending' ? false : true}
                    date={x.dueDate.split('T')[0]}
                    contentTextFalse='Sin pagar'
                    contentTextTrue='Pagado'
                    key={k}
                  />
                ))}

                {invoicesPaid.stateSeeMore && (
                  <BtnSeeMore enable={() => setMore1(true)} />
                )}
              </>
            ) : (
              <PaymentService
                month='Factura no encontrada'
                pathName=''
                precie={''}
                statePayment={false}
                date={'00/00/00'}
                contentTextFalse='Sin pagar'
                contentTextTrue='Pagado'
              />
            )
          ) : (
            <NoApiData message='¡No tienes facturas registradas por el momento Vecii!' />
          )}
        </div>
      ) : (
        <div className='grid_admin_payment'>
          {useData.length > 0 ? (
            invoicesNoPaid.filterData.length > 0 ? (
              <>
                {invoicesNoPaid.filterData.map((x, k) => (
                  <PaymentService
                    month={x.dueDate.split('T')[0]}
                    pathName='/resident/mi-hogar/pagos-administracion/pagar-admin'
                    precie={x.totalAmount}
                    statePayment={x.status === 'pending' ? false : true}
                    date={x.dueDate.split('T')[0]}
                    contentTextFalse='Sin pagar'
                    contentTextTrue='Pagado'
                    key={k}
                  />
                ))}

                {invoicesNoPaid.stateSeeMore && (
                  <BtnSeeMore enable={() => setMore2(true)} />
                )}
              </>
            ) : (
              <PaymentService
                month='Factura no encontrada'
                pathName=''
                precie={''}
                statePayment={false}
                date={'00/00/00'}
                contentTextFalse='Sin pagar'
                contentTextTrue='Pagado'
              />
            )
          ) : (
            <NoApiData message='¡No tienes facturas registradas por el momento Vecii!' />
          )}
        </div>
      )}
    <FooterFantasma></FooterFantasma>
    </>
  );
};

export default PagosAdministracion;
