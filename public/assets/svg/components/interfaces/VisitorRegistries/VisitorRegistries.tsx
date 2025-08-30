
import './index.css';
import StateComponent from '../StateComponent/StateComponent';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
type VisitorRegistriesPorps = {
    srcImg: string,
    name: string,
    complexDetails: string,
    status: boolean,
    date: string
};

const VisitorRegistries = ({ srcImg, name, complexDetails, status, date }: VisitorRegistriesPorps) => {

    return (
        <div className='container_visitorRegistry'>
         
                {/* <img src={'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'} className='container_visitorRegistry_avatarImg'></img> */}
                <IconSvgGradient
                    urlImage='/assets/svg/user-circle.svg'
                    widthImg='clamp(30px,15vw,50px)'
                />
        
            <div className='container_visitorRegistry_infoVisitor'>
                <p className='container_visitorRegistry_visitorName'>{name}</p>
                <p className='container_visitorRegistry_complexDetails'>{complexDetails}</p>
            </div>
            <div className='container_visitorRegistry_statusAndDate'>
                <StateComponent
                    statusComp = {status}
                    dataFalse='No ingreso'
                    dataTrue='Ingreso'
                />
                <p className='container_visitorRegistry_date'>{date}</p>
            </div>
        </div>
    );

};

export default VisitorRegistries;