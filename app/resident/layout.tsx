import { OptionMenu } from "@/components/interfaces/OptionMenu/OptionMenu";

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

      <div className="main_vecii_menu_space"></div>
      <header className="main_vecii_menu">
        <OptionMenu name="Inicio" srcImg="/assets/svg/Inicio.svg" pathUrl="/resident/inicio"></OptionMenu>
        <OptionMenu name="Directorio" srcImg="/assets/svg/Porteria.svg" pathUrl="/resident/porteria"></OptionMenu>
        <OptionMenu name="Chat" srcImg="/assets/svg/Chat.svg" pathUrl="/resident/chat"></OptionMenu>
        <OptionMenu name="Comunidad" srcImg="/assets/svg/Comunidad.svg" pathUrl="/resident/comunidad"></OptionMenu>
      </header>
    </>

  );
}