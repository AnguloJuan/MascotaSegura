import InputLabel from "@/components/Input";
import rescate from "./rescate.module.css"

export default function rescateRegistro() {
    return (
        <>

            <div className={rescate} >

                <h3>Registrar Mascota</h3>
                <div className={rescate.contenedorAdoptante}>

                    <div className={rescate.perfil}></div>
                    <div className={rescate.informacion}>

                        <InputLabel id={"Nombre"} label={"Nombre"} placeholder={"nombre"} />
                        <InputLabel id={"correo"} label={"Especie"} placeholder={"especie"} />
                        <InputLabel id={"numero"} label={"Raza"} placeholder={"raza"} />




                    </div>

                </div>
                <div className={rescate.contenedor}>
                    <div className={rescate.busqueda}>

                        <InputLabel id={"edad"} label={"Edad"} placeholder={"edad"} />
                    </div>
                    <div className={rescate.busqueda}>
                        <InputLabel id={"sexo"} label={"Sexo"} placeholder={"sexo"} />
                    </div>
                    <div className={rescate.busqueda}>
                        <InputLabel id={"tamanio"} label={"Tamaño"} placeholder={"tamalo"} />
                    </div>

                    <div className={rescate.busqueda}>
                        <center><p>ha sido maltratado?</p></center>
                    </div>

                </div>
                <InputLabel id={"descripcion"} label={"Motivo de abandono"} placeholder={"motivo"} />

                <div class={rescate.contenedordatos}>
                  <p>Anteriores adopciones</p>


                </div>
                <div className={rescate.contendor}>
                <div className={rescate.cartilla}>

                <InputLabel id={"descripcion"} label={"Cartilla de vacunacion"} placeholder={"ingresar"} />
                </div>
                </div>


                <div class={rescate.buton}>
                    <button>Registrar</button>
                </div>
            </div>






        </>
    )
}