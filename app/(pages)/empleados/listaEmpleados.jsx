"use client"
import InputLabel from "@/components/Input";
import listaEmpleados from "./empleados.module.css"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ListaEmpleados({ props }) {
    const [searchCriteria, setSearchCriteria] = useState({
        id: "",
        nombre: "",
        tipoEmpleado: 0,
        userId: props.user.id
    });

    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        setEmpleados(props.empleados);
    }, []);

    const fetchEmpleado = async () => {
        // Perform the API request to fetch the empleados list
        try {
            const search = JSON.stringify(searchCriteria);
            const response = await fetch(`/api/empleado?search=${search}`);
            if (response.ok) {
                const data = await response.json();
                setEmpleados(data.empleados);
                //console.log(data.empleados);
            } else {
                console.error("Failed to fetch empleados");
            }
        } catch (error) {
            console.error("An error occurred while fetching empleados", error);
        }
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name == 'id' && value < 0) {
            return;
        }
        setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    };

    return (
        <>
            <div>
                <center><h2>Lista de empleados</h2></center>
                <center><Link href={"empleados/registro"} className="btn btn-success border rounded mt-4 mb-2 d-flex align-items-center">
                    <span className="f-bold fs-4 mx-2">+</span>Agregar nuevo empleado
                </Link></center>
                <div className={listaEmpleados.contenedor}>
                    <div className={listaEmpleados.busqueda}>
                        <InputLabel id={"empleado"} type={"number"} label={"ID del empleado"} placeholder={"Id empleado"} 
                        name={"id"} value={searchCriteria.id} onChange={handleInputChange} />
                    </div>
                    <button
                        className="btn btn-lg btn-success"
                        onClick={fetchEmpleado}>Buscar</button>
                </div>
                <div className={listaEmpleados.contenedor}>
                    <div className={listaEmpleados.busqueda}>
                        <InputLabel id={"nombre"} label={"Nombre"} placeholder={"Nombre"} name={"nombre"} onChange={handleInputChange} />
                    </div>
                    <div className={listaEmpleados.busqueda}>
                        <div className="input mb-3 mt-3">
                            <label htmlFor="tipoEmpleado" className="form-label">Tipo empleado</label>
                            <select
                                id="tipoEmpleado"
                                onChange={handleInputChange}
                                name="tipoEmpleado"
                                className="form-select">
                                <option value="">Selecciona el tipo empleado</option>
                                <option value={2}>Empleado</option>
                                <option value={3}>Administrador</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {empleados.length !== 0 ?
                <div className="d-flex flex-wrap">
                    {empleados.map((empleado) => (
                        <div key={empleado.id} className={`${listaEmpleados.tarjeta} bg-body-secondary rounded`}>
                            <Link href={`/empleados/empleado/${empleado.id}`} className="link-underline-opacity-0">
                                <div className={listaEmpleados.imagen}>
                                    {empleado.imagen ? (
                                        <Image
                                            src={empleado.imagen}
                                            alt={`Imagen Adoptante${empleado.id}`}
                                            width={300}
                                            height={300}
                                            loading="lazy"
                                            color="white"
                                        />
                                    ) : (
                                        <Image
                                            src={"/images/defaultUser.png"}
                                            alt='logo.png'
                                            width={300}
                                            height={300}
                                            loading="lazy"
                                            color="white"
                                        />
                                    )}
                                </div>
                                <div className={`${listaEmpleados.datos} rounded-bottom`}>
                                    <p>Nombre: {empleado.nombre}</p>
                                    <p>id: {empleado.id}</p>
                                    <p>correo: {empleado.correo}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                : (<center><h3 className="mt-3">No se encontraron resultados</h3></center>)
            }
        </>
    );
}
