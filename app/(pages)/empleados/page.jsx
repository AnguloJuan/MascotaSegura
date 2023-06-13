import InputLabel from "@/components/Input";
import listaEmpleados from "./empleados.module.css"
import Image from "next/image";

export default function empleados() {
    return (
        <>
            <div className={listaEmpleados}>
                <center><h2>Lista de empleados</h2></center> 
                <div className={listaEmpleados.contenedor}>
                    <InputLabel id={"adoptador"} label={"ID del adoptador"} placeholder={"Id adoptador"} />
                    <button type="button" class="btn btn-success">Buscar</button>
                </div>
                <div className={listaEmpleados.contenedor}>
                    <div className={listaEmpleados.busqueda}>
                        <InputLabel id={"nombre"} label={"Nombre"} placeholder={"Nombre"} />
                    </div>
                    <div className={listaEmpleados.busqueda}>
                        <InputLabel id={"tipoEmpleado"} label={"Tipo de Empleado"} placeholder={"Tipo empleado"} />
                    </div>
                </div>
            
            </div>
            <div class={listaEmpleados.container}>
    <div class={listaEmpleados.imagen}>
    <Image
                        src={"/images/perfil.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
    </div>
    <div class={listaEmpleados.datos}>
      <p>Efrain gonzales</p>
      <p>id#1360 </p>
      <p>Empleado</p>
    </div>
  </div>
  <div class={listaEmpleados.container}>
    <div class={listaEmpleados.imagen}>
    <Image
                        src={"/images/perfil2.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
    </div>
    <div class={listaEmpleados.datos}>
    <p>Luis Martinez</p>
      <p>id#1140 </p>
      <p>Empleado</p>
    </div>
  </div>
  <div class={listaEmpleados.container}>
    <div class={listaEmpleados.imagen}>
    <Image
                        src={"/images/perfil3.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
    </div>
    <div class={listaEmpleados.datos}>
    <p>Juan Angulo</p>
      <p>id#0010 </p>
      <p>Empleado</p>
    </div>
  </div>
  <div class={listaEmpleados.container}>
    <div class={listaEmpleados.imagen}>
    <Image
                        src={"/images/perfil4.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
    </div>
    <div class={listaEmpleados.datos}>
    <p>Manuel Macias</p>
      <p>id#2010 </p>
      <p>Empleado</p>
    </div>
  </div>
  <div class={listaEmpleados.container}>
    <div class={listaEmpleados.imagen}>
    <Image
                        src={"/images/perfil5.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
    </div>
    <div class={listaEmpleados.datos}>
    <p>Jose Murillo</p>
      <p>id#0012 </p>
      <p>Empleado</p>
    </div>
  </div>
  <div class={listaEmpleados.container}>
    <div class={listaEmpleados.imagen}>
    <Image
                        src={"/images/perfil6.jpg"}
                        alt='logo.png'
                        width={300}
                        height={300}
                        priority={true}
                    />
    </div>
    <div class={listaEmpleados.datos}>
    <p>Martin Diaz</p>
      <p>id#2560 </p>
      <p>Empleado</p>
    </div>
  </div>
  




        </>
    )
}

