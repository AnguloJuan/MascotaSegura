import InputLabel from "@/components/Input";
import Image from "next/image";

export default function Adopcion() {
    return (
        <form action="Post">
            <h1>Iniciar sesión</h1>
            <>
                <Image
                    src={"/images/logo.png"}
                    alt='logo.png'
                    width={400}
                    height={250}
                    priority={true}
                />
            </>
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" id="email" placeholder="Correo electrónico"/>
            <InputLabel id={"password"} type={"password"} label={"Contraseña"} placeholder={"Contraseña"} />
            <button type="submit">Iniciar sesión</button>
        </form>
    )
}