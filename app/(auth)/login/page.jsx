import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";

export default function Adopcion() {
    return (
        <>
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
                <Input id={"email"} type={"email"} label={"Correo electrónico"} placeholder={"Correo electrónico"} />
                <Input id={"password"} type={"password"} label={"Contraseña"} placeholder={"Contraseña"} />
                <button type="submit" className="btn btn-primary mb-3">Iniciar sesión</button>
            </form>
            <Link href={"/signin"}>Crear cuenta</Link>
        </>
    )
}