import './index.css';

type DirectoryEmergencyPhoneProps = {
    srcImg: string,
    name: string,
    number: string
}

const DirectoryEmergencyPhone = ({ srcImg, name, number }: DirectoryEmergencyPhoneProps) => {

    return (
        <div className='container_directoryNumber'>
            <div className='container_directoryNumber_icons'>
                <img src={srcImg} className='container_directoryNumber_img'></img>
                <p className='container_directoryNumber_namedirectory'>{name}</p>
            </div>
            <a className='container_directoryNumber_number' href="tel:">
                {number} <span> {'>'} </span>
            </a>
        </div>
    );

};

export default DirectoryEmergencyPhone;