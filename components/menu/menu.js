import Link from "next/link";
import menu from "./menu.module.css";
import Option from "./menuOption";
import Image from "next/image";

export default function Menu({ menuType }) {
    return (
        <nav className={menu.menu}>
            <ul>
                <MenuType menuType={menuType} />
            </ul>
        </nav>
    )
}

function MenuType({menuType}) {
    return (
        menuType == "usuario" ?
            (<>
                <Logo />
                <Option url={"/adopcion"} text={"ADOPCIÓN"} iconUrl={"/images/menu/adopcion.png"} />
                <Option url={"/reportes"} text={"REPORTES"} iconUrl={"/images/menu/reportes.png"} />
                <Option url={"/perfil"} text={"PERFIL"} iconUrl={"/images/menu/perfil.png"} />
                <Option url={"/cerrarSesion"} text={`CERRAR
    SESIÓN`} iconUrl={"/images/menu/cerrarSesion.png"} />
            </>
            )
            : menuType == "admin" ? (
                <div></div>
            ) : (<>
                <Logo />
                <Option url={"/signIn"} text={"INICIAR SESIÓN"} iconUrl={"/images/menu/perfil.png"} />
            </>
            )
    )
}

function Logo() {
    return (
        <a href="/" className={menu.logo}>
            <Image
                src={"/images/logo.png"}
                alt="logo.png"
                width={180}
                height={120}
                priority={true}
            />
            <div className={menu.bar} />
        </a>
    )
}