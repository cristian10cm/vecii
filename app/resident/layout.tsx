'use client'
import { OptionMenu } from "@/components/interfaces/OptionMenu/OptionMenu";
import FooterFantasma from "@/components/interfaces/footerFantasma/FooterFantasma";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <>
      <div className="main_vecii_layout">
        {children}
      
      </div>

      {/* <div className="main_vecii_menu_space"></div> */}
      
      <header className="main_vecii_menu">
        <OptionMenu name="Inicio" srcImg="/assets/svg/Inicio.svg" pathUrl="/resident/inicio"></OptionMenu>
        <OptionMenu name="Directorio" srcImg="/assets/svg/Porteria.svg" pathUrl="/resident/porteria"></OptionMenu>
        <OptionMenu name="Chat" srcImg="/assets/svg/Chat.svg" pathUrl="/resident/chat"></OptionMenu>
        <OptionMenu name="Comunidad" srcImg="/assets/svg/Comunidad.svg" pathUrl="/resident/comunidad"></OptionMenu>
        <OptionMenu signOut={true} name="Salir" srcImg="/assets/svg/sign-out.svg" pathUrl="/"></OptionMenu>
      </header>
    </>

  );
}