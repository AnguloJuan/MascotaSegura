import InputLabel from "@/components/Input";
import listaEmpleados from "./empleados.module.css"

export default function empleados() {
    return (
        <>
            <div className={listaEmpleados}>
                <center><h2>Lista de empleados</h2></center> 
                <div className={listaEmpleados.contenedor}>
                    <InputLabel id={"adoptador"} label={"ID del adoptador"} placeholder={"Id adoptador"} />
                    <button>Buscar</button>
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



        </>
    )
}