import InputLabel from "@/components/Input";
import listaAdoptantes from "./adoptadores.module.css"
import adoptador from "./adoptadores.module.css"


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

<div className={listaAdoptantes.container}>
  <div className={listaAdoptantes.item}>Contenedor 1</div>
  <div className={listaAdoptantes.item}>Contenedor 2</div>
  <div className={listaAdoptantes.item}>Contenedor 3</div>
  <div className={listaAdoptantes.item}>Contenedor 4</div>
  <div className={listaAdoptantes.item}>Contenedor 5</div>
  <div className={listaAdoptantes.item}>Contenedor 6</div>
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