'use client'
import { useRouter } from "next/navigation"
// let currentUrl =null


const GoTo = () =>{
    const router = useRouter();
    // let currentNow =location.href
    // currentUrl = currentNow
    // if(currentUrl !== location.href){
    //     currentUrl = location.href
    //     alert('He cambiado de página')    
    // }
    const goToPath = ({path}:{path:string}) => router.push(path);
    return goToPath;
};

export default GoTo