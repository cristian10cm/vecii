import { toast } from 'react-toastify';
const comprobarDatos = (name:string,lastName:string,email:string,phone:string,cel:string):boolean =>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const stringRegex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇçÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÅåÆæØøß\s]+$/;
  const numberRegex = /^[\d]+$/;
    if(name.length<=3 || name.length > 30 || !stringRegex.test(name)  ){
            toast.error('El nombre ingresado es invalido')
            return false
    }
    if(lastName.length<=3 || lastName.length > 30 || !stringRegex.test(lastName)  ){
            toast.error('El Apellido ingresado es invalido')
            return false
    }
    
    if (!emailRegex.test(email)) {
            toast.error("El correo electrónico ingresado es inválido");
            return false;
    }
    if(phone.length < 6 || phone.length >10 || !numberRegex.test(phone)){
            toast.error("El teléfono ingresado es inválido");
            return false;
    } 
    if(cel.length !== 10 || !numberRegex.test(cel)){
            toast.error("El número de celular ingresado es inválido");
            return false;
    }
    return true

}
interface datos {
    cellPhoneNumber: string;
    createdAt: string;
    email: string;
    firstName: string;
    id: string;
    identificationNumber: string;
    isActive: true;
    lastName: string;
    phoneNumber: string;
}
export {datos}