'use client'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import './index.css';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import SectionShopping from '@/components/interfaces/SectionShopping/SectionShopping';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import { setHousing } from '@/components/stores/StoreHousing';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
const Pedidos = () =>{
          const compleName = setHousing().information?.location.complex.name 
      
    return(
        <>
            <VeciiHeaderImg
                srcImg='https://totalfood.com/wp-content/uploads/2023/04/Restaurant-Online-Food-Delivery-1.webp'
                name='Pedidos'
                detail={compleName || 'Cargando..'}
            />
            <SearchBar 
            placeholder=''/>
            <OpcionBox
              nameBox1 =  'Tiendas'
              nameBox2 =  'Pedidos'
              onClickDato={()=>true}

            />
            
            <div className='container_orders_section'>
                  <SectionShopping
                        nameSection='Carnes,pollos y pescados'
                  />
                  <SectionShopping
                        nameSection='Sumpercados'
                  />
                  <SectionShopping
                        nameSection='Restaurantes'
                  />
            </div>
        
            <FooterFantasma></FooterFantasma>
        </>
    )

}

export default Pedidos;