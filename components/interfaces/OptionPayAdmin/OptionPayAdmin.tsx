"use client";
import GoTo from '@/components/logics/GoTo';
import './index.css';

const OptionPayAdmin = () => {

    const goToPath = GoTo();

    return (

        <div className="container_payAdminOption" onClick={() => goToPath({ path: '/resident/mi-hogar/pagos-administracion' })}>
            <img
                src="/assets/svg/Pago admin.svg"
                className="container_payAdminOption_icon"
            />
            <h2 className="container_payAdminOption_text">Pago Administración</h2>
        </div>


    )
}

export default OptionPayAdmin