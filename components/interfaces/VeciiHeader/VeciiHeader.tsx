
import './index.css';
import  BackArrow  from './subComponents/BackArrow/BackArrow';
import  HomeBtnBack  from './subComponents/HomeBtnBack/HomeBtnBack';

const VeciiHeader = ({srcImg, name}:{srcImg:string, name:string}) =>{

    return(
        <section className='veciiHeaderComponent'>
            <BackArrow></BackArrow>
            <div className='container_identity_component'>
                <img className='container_identity_componentImg' src={srcImg}></img>
                <p className='container_identity_componentP'>{name}</p>
            </div>
          
        </section>
    );
};

export default VeciiHeader;