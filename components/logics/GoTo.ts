'use client'
import { useRouter } from "next/navigation"
const GoTo = () =>{
    const router = useRouter();
    const goToPath = ({path}:{path:string}) => router.push(path);
    return goToPath;
};

export default GoTo