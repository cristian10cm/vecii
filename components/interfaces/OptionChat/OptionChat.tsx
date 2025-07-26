import './index.css'
const OptionChat  = ({imgChat, nameChat}:{imgChat:string, nameChat:string})=>{
        return(
            <div className='container_optionChat'>
                    <div className='container_optionChat_img'>
                        <img src={imgChat}  alt="Foto de perfil" />
                    </div>
                    <div className='container_optionChat_info'>
                        <p className='container_optionChat_paragraphe'>{nameChat}</p>
                        <p className='container_optionChat_description'>Tengo una consulta...</p>
                    </div>
                    <img src='/assets/svg/arrowIcon.svg' className='container_optionChat_btn' />
            </div>
        )
}
export default OptionChat