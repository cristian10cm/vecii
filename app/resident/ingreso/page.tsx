"use client";

import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import './index.css';
import VisitorComeIn from '@/components/interfaces/VisitorComeIn/VisitorComeIn';
import GoTo from '@/components/logics/GoTo';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
const Ingreso = () =>{

    const goToPath = GoTo();

    return(
        <>
            <VeciiHeaderImg 
                srcImg='https://bcgbigconsulting.com/wp-content/uploads/2020/08/414141414141.jpg'
                name='Ingresos'
                detail='Conjunto Parques de Madelena'
            />

            {/** Separador de ingreso de visitantes */}
            <div className='comeIn_separator'>
                <div className='comeIn_separator_line'></div>
                    <p className='comeIn_separator_title'>Ingreso Visitante</p>
                <div className='comeIn_separator_line'></div>
            </div>

            <div className='containerOption_comeIn'>
                <VisitorComeIn
                    srcImg='/assets/svg/nuevo ingreso.svg'
                    name='Nuevo Ingreso'
                    pathUrl='/resident/ingreso/nuevo-visitante'
                />
            </div>

            {/** Separador de ingreso y salida de objetos */}
            <div className='comeIn_separator'>
                <div className='comeIn_separator_line'></div>
                    <p className='comeIn_separator_title'>Ingreso & salida de objetos</p>
                <div className='comeIn_separator_line'></div>
            </div>

            <div className='containerOption_comeIn_grid'>

                <VisitorComeIn
                    srcImg='/assets/svg/ingreso objeto.svg'
                    name='Ingresar objeto'
                    pathUrl='/resident/ingreso/ingreso-objeto'
                />

                <VisitorComeIn
                    srcImg='/assets/svg/ingreso objeto.svg'
                    name='Salida de objeto'
                    pathUrl='/resident/ingreso/salida-objeto'
                />

                <div className='registry_comeIn_comeOut' onClick={()=>goToPath({path:'/resident/ingreso/registros'})}>
                    <img src="/assets/svg/historial.svg" className='registry_comeIn_comeOut_img'></img>
                    <p className='registry_comeIn_comeOut_text'>Registro de ingresos y salida</p>
                </div>
                
            </div>
            <FooterFantasma/>
        </>
    )

}

export default Ingreso;