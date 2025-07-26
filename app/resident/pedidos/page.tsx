'use client'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import './index.css';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import SectionShopping from '@/components/interfaces/SectionShopping/SectionShopping';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
const Pedidos = () =>{

    return(
        <>
            <VeciiHeaderImg
                srcImg='https://totalfood.com/wp-content/uploads/2023/04/Restaurant-Online-Food-Delivery-1.webp'
                name='Pedidos'
                detail='Conjunto pimientos de madelena'
            />
            <SearchBar 
            placeholder=''/>
            <OpcionBox
              nameBox1 =  'Restaurantes'
              nameBox2 =  'Paquetes'
              path1='/resident/buzon'
              path2='/resident/buzon'
       
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
           <FooterFantasma/>
           
        </>
    )

}

export default Pedidos;