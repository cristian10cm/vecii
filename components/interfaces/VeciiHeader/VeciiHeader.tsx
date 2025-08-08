
import './index.css';
import  BackArrow  from './subComponents/BackArrow/BackArrow';
import  HomeBtnBack  from './subComponents/HomeBtnBack/HomeBtnBack';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
const VeciiHeader = ({srcImg, name,transparent}:{srcImg:string, name:string,transparent:boolean}) =>{
    return(
        <section className='veciiHeaderComponent'>
            <BackArrow></BackArrow>
            <div className='container_identity_component'>
                {
                    transparent?
                    <IconSvgGradient
                    urlImage={srcImg}
                    widthImg={'70px'}
                />
                :
                <img className='container_identity_componentImg' src={srcImg}></img>
                }
                <p className='container_identity_componentP'>{name}</p>
            </div>
          
        </section>
    );
};

export default VeciiHeader;