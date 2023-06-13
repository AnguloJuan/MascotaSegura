import InputLabel from "@/components/Input";
import listaEmpleados from "./empleados.module.css"

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
            <div className={listaEmpleados.container}>
  <div className={listaEmpleados.item}>Contenedor 1</div>
  <div className={listaEmpleados.item}>Contenedor 2</div>
  <div className={listaEmpleados.item}>Contenedor 3</div>
  <div className={listaEmpleados.item}>Contenedor 4</div>
  <div className={listaEmpleados.item}>Contenedor 5</div>
  <div className={listaEmpleados.item}>Contenedor 6</div>
</div>



        </>
    )
}