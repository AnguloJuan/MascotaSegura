import { GetUser } from "@/app/lib/user";
import menu from "./menu.module.css";
import Option from "./menuOption";
import Image from "next/image";
import Link from "next/link";

export default async function Menu() {
    const user = await GetUser();
    return (
        <nav className={menu.menu}>
            <ul>
                <Logo />
                <MenuType user={user.idTipoUsuario} />
            </ul>
        </nav>
    )
}

function MenuType({ user }) {
    return (
        user == 1 ?
            (<>
                <Option url={"/adopcion"} text={"ADOPCIÓN"} iconUrl={"/images/menu/adopcion.png"} />
                <Option url={"/reportes"} text={"REPORTES"} iconUrl={"/images/menu/reportes.png"} />
                <Option url={"/perfil"} text={"PERFIL"} iconUrl={"/images/menu/perfil.png"} />
                <Option url={"/logout"} text={"CERRAR SESIÓN"} iconUrl={"/images/menu/cerrarSesion.png"} />
            </>
            ) : user == 2 ? (<>
                <Option url={"/rescate"} text={"RESCATE"} iconUrl={"/images/menu/rescate.png"} />
                <Option url={"/adopcion"} text={"ADOPCIÓN"} iconUrl={"/images/menu/adopcion.png"} />
                <Option url={"/reportes"} text={"REPORTES"} iconUrl={"/images/menu/reportes.png"} />
                <Option url={"/perfil"} text={"PERFIL"} iconUrl={"/images/menu/perfil.png"} />
                <Option url={"/logout"} text={"CERRAR SESIÓN"} iconUrl={"/images/menu/cerrarSesion.png"} />
            </>
            ) : user == 3 ? (
                <>
                    <Option url={"/rescate"} text={"RESCATE"} iconUrl={"/images/menu/rescate.png"} />
                    <Option url={"/adopcion"} text={"MASCOTAS"} iconUrl={"/images/menu/adopcion.png"} />
                    <Option url={"/adoptadores"} text={"ADOPTADORES"} iconUrl={"/images/menu/adoptadores.png"} />
                    <Option url={"/empleados"} text={"EMPLEADOS"} iconUrl={"/images/menu/empleados.png"} />
                    <Option url={"/reportes"} text={"REPORTES"} iconUrl={"/images/menu/reportes.png"} />
                    <Option url={"/perfil"} text={"PERFIL"} iconUrl={"/images/menu/perfilAdmin.png"} />
                    <Option url={"/logout"} text={"CERRAR SESIÓN"} iconUrl={"/images/menu/cerrarSesion.png"} />
                </>
            ) : (<>
                <Option url={"/logout"} text={"INICIAR SESIÓN"} iconUrl={"/images/menu/perfil.png"} />
            </>
            )
    )
}

function Logo() {
    return (
        <>
            <Link href="/" className={menu.logo}>
                <Image
                    src={"/images/logo.png"}
                    alt="logo.png"
                    width={180}
                    height={120}
                    priority={true}
                />
            </Link>
            <div className={menu.bar} />
        </>
    )
}