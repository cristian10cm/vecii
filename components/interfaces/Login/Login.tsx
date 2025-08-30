"use client";
import './index.css';
import { useEffect, useRef,useState } from 'react';
import GoTo from '../../logics/GoTo';
import { ToastContainer, toast } from 'react-toastify';
import { FaEyeSlash,FaRegEye } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import http from '@/components/services/http';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
import { setHousing } from '@/components/stores/StoreHousing';
import axios from 'axios';
import Cookies from 'js-cookie';
const Login = () => {
    const cokie = Cookies
    const goToPath = GoTo();
    const inputEmail = useRef<HTMLInputElement>(null);
    const inputPassWord = useRef<HTMLInputElement>(null);
    const [useHide, setHide] = useState<boolean>(false);
    const hidePassword = ()=>{
        setHide(!useHide)
    }
    const verifyPeople = async({rolUser,token,id}:{rolUser:string,token:string,id:string})=>{
                cokie.set('token',token,{ expires: 7 })
                cokie.set('id',id,{ expires: 7})
                setTimeout(()=>{
                    goToPath({ path:`/${rolUser}/inicio/`})
                },100)
    }
    const verifyInfo = async () => {
        const emailInput = inputEmail.current! as HTMLInputElement;
        const passwordInput = inputPassWord.current! as HTMLInputElement;
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        if (!email || !password) {
            toast.error("Por favor ingrese su correo y contraseña");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("El correo electrónico ingresado no es válido");
            return;
        }

        if (password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {
            const response = await http.post('auth/login', { email, password });
            const rolUser = await response.roles[0].slug;
            const token = await response.token;
            const id = await response.id;
            const responseAuth = await axios.get('https://api.vecii.com.co/api/v1/auth/me', {
                headers: {
                Authorization:`Bearer ${token}`
                }
            })
            setHousing.getState().setInformation(responseAuth.data)
           verifyPeople({rolUser,token,id})
            // Aqui irían a los diferentes perfiles de pendiendo del rol
            
        } catch (error) {
            toast.error("Error al iniciar sesión. Intente nuevamente.");
        }


    };

   useEffect(() => {
  const verifySession = async () => {
    const token = cokie.get('token');
    if (!token) return;
    try {
      const response = await axios.get('https://api.vecii.com.co/api/v1/auth/me', {
        headers: {
          Authorization:`Bearer ${token}`
        }
      });
      setHousing.getState().setInformation(response.data)
      if (response.status === 200) {
        localStorage.clear()
        const { data } = response;
        const rolUser = data.roles?.[0]?.slug;
        const id = data.id;
        Cookies.set('userInfo', JSON.stringify(data), { expires: 7 });
        verifyPeople({rolUser, token, id});
        console.log(token)
      }
      
    } catch (error) {
    //   cokie.remove('token')
    //   cokie.remove('id')
      console.log('Error al verificar sesión:');
    }
  };

  verifySession();
}, []);

    return (
        <section className="login_component">
            <img src="/assets/png/logo.png" alt="Logo Vecii" className='login_component_logo'/>
            <div className="login_component_container">
                <h1 className="login_component_container_title">Bienvenido</h1>
                <div className="login_component_container_input">
                    <input
                        type="text"
                        className="input_vecii"
                        placeholder="Ingrese su email"
                        ref={inputEmail}
                    ></input>
                </div>
                <div className="login_component_container_input">
                    <input
                        type={useHide?'text':'password'}
                        className="input_vecii"
                        placeholder="Contraseña"
                        ref={inputPassWord}
                    ></input>
                    <button className='input_vecii_hiden' onClick={()=>hidePassword()}>{useHide?
                        <IconSvgGradient
                            urlImage='/assets/svg/eye-closed.svg'
                            widthImg='6vw'
                        />
                        :
                         <IconSvgGradient
                            urlImage='/assets/svg/eye.svg'
                            widthImg='6vw'
                        />
                        
                        }
                    </button>
                </div>
                <p
                    className="login_component_container_paragraph"
                    onClick={() => alert('Rediriguiendo al mensaje predeterminado')}
                >Olvidé mi usuario o contraseña</p>
            </div>
            <button
                className='login_component_btnSend'
                onClick={verifyInfo}
            >Ingresar</button>

        </section>

    );

};

export { Login }
