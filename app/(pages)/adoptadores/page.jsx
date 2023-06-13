import InputLabel from "@/components/Input";
import listaAdoptantes from "./adoptadores.module.css"
import adoptador from "./adoptadores.module.css"
import Image from "next/image";

export default function adoptadores() {
    return (
        <>
            <div className={listaAdoptantes}>
                <center><h2>Lista de adoptantes</h2></center>
                <div className={listaAdoptantes.contenedor}>
                    <InputLabel id={"adoptador"} label={"ID del adoptador"} placeholder={"Id adoptador"} />
                    <button>Buscar</button>
                </div>
                <div className={listaAdoptantes.contenedor}>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"nombre"} label={"Nombre"} placeholder={"Nombre"} />
                    </div>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"numero"} label={"Numero de telefono"} placeholder={"Numero telefono"} />
                    </div>
                </div>
                <div className={listaAdoptantes.contenedor}>
                    <div className={listaAdoptantes.busqueda}>

                        <InputLabel id={"edad"} label={"Edad"} placeholder={"edad"} />
                    </div>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"correo"} label={"Correo Electronico"} placeholder={"correo electronico"} />
                    </div>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"ubicacion"} label={"Ubicacion"} placeholder={"ubicacion"} />
                    </div>

                </div>
            </div>

            <div class={listaAdoptantes.container}>
                <div class={listaAdoptantes.imagen}>
                    <Image
                        src={"/images/adoptante1.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
                </div>
                <div class={listaAdoptantes.datos}>
                    <p>Marco Muñoz</p>
                    <p>ID 021354 </p>
                    <p>ito12@gmail.com</p>
                </div>
            </div>
            <div class={listaAdoptantes.container}>
                <div class={listaAdoptantes.imagen}>
                    <Image
                        src={"/images/adoptante7.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
                </div>
                <div class={listaAdoptantes.datos}>
                    <p>Diego Martinez</p>
                    <p>ID 159254 </p>
                    <p>ejo234@gmail.com</p>
                </div>
            </div>
            <div class={listaAdoptantes.container}>
                <div class={listaAdoptantes.imagen}>
                    <Image
                        src={"/images/adoptante3.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
                </div>
                <div class={listaAdoptantes.datos}>
                    <p>Osvaldo Lucero</p>
                    <p>ID 789454 </p>
                    <p>din45@gmail.com</p>
                </div>
            </div>
            <div class={listaAdoptantes.container}>
                <div class={listaAdoptantes.imagen}>
                    <Image
                        src={"/images/adoptante4.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
                </div>
                <div class={listaAdoptantes.datos}>
                    <p>Emiliano Ramirez</p>
                    <p>ID 789456 </p>
                    <p>ma1245@gmail.com</p>
                </div>
            </div>
            <div class={listaAdoptantes.container}>
                <div class={listaAdoptantes.imagen}>
                    <Image
                        src={"/images/adoptante5.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
                </div>
                <div class={listaAdoptantes.datos}>
                    <p>Isra Cota</p>
                    <p>ID 235689 </p>
                    <p>ra1234@gmail.com</p>
                </div>
            </div>
            <div class={listaAdoptantes.container}>
                <div class={listaAdoptantes.imagen}>
                    <Image
                        src={"/images/adoptante6.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
                </div>
                <div class={listaAdoptantes.datos}>
                    <p>Alexis Ortega</p>
                    <p>ID 475815 </p>
                    <p>exis71@gmail.com</p>
                </div>
            </div>


        </>
    )
}
export function verAdoptador() {
    return (
        <>
            <div className={adoptador}>
                <h3>Perfil de adoptante</h3>
                <div className={adoptador.contenedorAdoptante}>

                    <div className={adoptador.perfil}></div>
                    <div className={adoptador.informacion}>

                        <p>Nombre: </p>
                        <p>Correo electrónico:</p>
                        <p>Número de teléfono:</p>
                        <p>Ubicación:</p>

                    </div>

                </div>
                <h5>ID </h5>
            </div>





            <div className={adoptador.contenedorMascota}>
                <div className={adoptador.fotoPerfil}></div>
                <div className={adoptador.datosMascotas}>
                    <p>Nombre</p>
                    <p>Especie</p>
                    <p>Raza</p>
                </div>
            </div>
            <div class={adoptador.botones}>
                <button class="button">Modificar</button>
                <button class="button">Eliminar adoptante</button>
            </div>


        </>


    )
}