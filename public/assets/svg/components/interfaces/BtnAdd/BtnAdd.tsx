import './index.css'
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient'
import GoTo from '@/components/logics/GoTo'
const BtnAdd = ({urlPage, nameAdd}:{urlPage:string,nameAdd:string})=>{
    const goToPath =GoTo()
    const goToPage = ()=>{
        goToPath({path:urlPage})
    }
    return(
        <div className='container_add'>    
           <div className='container_add_items'>
               <p className='container_add_paragraphe'>{nameAdd}</p>
              <button className='container_add_btn' onClick={goToPage}>
                <IconSvgGradient 
                  urlImage='/assets/svg/plus-circle-fill.svg'
                  widthImg='clamp(25px,7.5vw,35px)'
                />
              </button>
           </div>
          </div>
    )
}
export default BtnAdd