'use client'
import './index.css';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import PublicService from '@/components/interfaces/PublicService/PublicService';
import GoTo from '@/components/logics/GoTo';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
const Buzon = () => {
    const goToPath = GoTo()
    return(
        <>
            <VeciiHeaderImg
                srcImg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvNZVE68kVo2kW_kB5LIeZyRFGUneucdFPCg&s'
                name='Buzón'
                detail='Casa 38'
            />
              <SearchBar
                  placeholder=''
           />
            <OpcionBox
                    nameBox1='Servicios publicos'
                    nameBox2='Paqueteria'
                    path1='/resident/buzon/'
                    path2='/resident/buzon/paqueteria/'
            />
            <div className='containerServices' >
                   <PublicService 
                pathUrl='/resident/buzon/pagos-servicios'
                imgSrc='https://cdn-icons-png.flaticon.com/512/46/46023.png'
                nameService= 'Servicio Agua'
                precieService= '241.000'
                stateService= {false}
                date = '01/08/2025' 
            
            />
              <PublicService 
                pathUrl='/resident/buzon/pagos-servicios'
                imgSrc='https://cdn-icons-png.flaticon.com/512/91/91381.png'
                nameService= 'Servicio de gas'
                precieService= '241.000'
                stateService= {true}
                date = '01/08/2025' 
            
            />
              <PublicService 
                pathUrl='/resident/buzon/pagos-servicios'
                imgSrc='https://cdn-icons-png.flaticon.com/512/702/702814.png'
                nameService= 'Servicio Luz'
                precieService= '241.000'
                stateService= {false}
                date = '01/08/2025' 
            
            />
              <PublicService 
                pathUrl='/resident/buzon/pagos-servicios'
                imgSrc='https://cdn-icons-png.flaticon.com/512/91/91381.png'
                nameService= 'Servicio de gas'
                precieService= '241.000'
                stateService= {true}
                date = '01/08/2025' 
            
            />
            </div>
            <FooterFantasma/>
        </>
    );

};

export default Buzon;