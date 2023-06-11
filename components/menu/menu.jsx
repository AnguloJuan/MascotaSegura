import menu from "./menu.module.css";
import Option from "./menuOption";
import Image from "next/image";

export default function Menu({ menuType }) {
    return (
        <nav className={menu.menu}>
            <ul>
                <Logo />
                <MenuType menuType={menuType} />
            </ul>
        </nav>
    )
}

function MenuType({ menuType }) {
    return (
        menuType == "user" ?
            (<>
                <Option url={"/adopcion"} text={"ADOPCIÓN"} iconUrl={"/images/menu/adopcion.png"} />
                <Option url={"/reportes"} text={"REPORTES"} iconUrl={"/images/menu/reportes.png"} />
                <Option url={"/perfil"} text={"PERFIL"} iconUrl={"/images/menu/perfil.png"} />
                <Option url={"/login"} text={"CERRAR SESIÓN"} iconUrl={"/images/menu/cerrarSesion.png"} />
            </>
            ) : menuType == "employee" ? (<>
                <Option url={"/rescate"} text={"RESCATE"} iconUrl={"/images/menu/rescate.png"} />
                <Option url={"/adopcion"} text={"ADOPCIÓN"} iconUrl={"/images/menu/adopcion.png"} />
                <Option url={"/reportes"} text={"REPORTES"} iconUrl={"/images/menu/reportes.png"} />
                <Option url={"/perfil"} text={"PERFIL"} iconUrl={"/images/menu/perfil.png"} />
                <Option url={"/login"} text={"CERRAR SESIÓN"} iconUrl={"/images/menu/cerrarSesion.png"} />
            </>
            ) : menuType == "admin" ? (
                <>
                    <Option url={"/rescate"} text={"RESCATE"} iconUrl={"/images/menu/rescate.png"} />
                    <Option url={"/mascotas"} text={"MASCOTAS"} iconUrl={"/images/menu/adopcion.png"} />
                    <Option url={"/adoptadores"} text={"ADOPTADORES"} iconUrl={"/images/menu/adoptadores.png"} />
                    <Option url={"/empleados"} text={"EMPLEADOS"} iconUrl={"/images/menu/empleados.png"} />
                    <Option url={"/reportes"} text={"REPORTES"} iconUrl={"/images/menu/reportes.png"} />
                    <Option url={"/perfilAdmin"} text={"PERFIL"} iconUrl={"/images/menu/perfilAdmin.png"} />
                    <Option url={"/login"} text={"CERRAR SESIÓN"} iconUrl={"/images/menu/cerrarSesion.png"} />
                </>
            ) : (<>
                <Option url={"/login"} text={"INICIAR SESIÓN"} iconUrl={"/images/menu/perfil.png"} />
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