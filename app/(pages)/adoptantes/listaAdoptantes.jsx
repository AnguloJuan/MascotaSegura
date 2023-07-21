"use client"
import InputLabel from "@/components/Input";
import listaAdoptantes from "./adoptantes.module.css"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Estados } from "@/components/Selects";
import { Municipios } from "@/components/SelectsClient";

export default function ListaAdoptantes({ props }) {
    const [searchCriteria, setSearchCriteria] = useState({
        nombre: "",
        correo: "",
        id: "",
        telefono: "",
        edad: "",
        estado: 0,
        municipio: 0,
    });

    const [adoptantes, setAdoptantes] = useState([]);

    useEffect(() => {
        setSearchCriteria((prevCriteria) => ({ ...prevCriteria, userType: props.userType }));
        setAdoptantes(props.adoptantes);

    }, []);

    const fetchAdoptantes = async () => {
        // Perform the API request to fetch the adoptantes list
        try {
            const search = JSON.stringify(searchCriteria);
            const response = await fetch(`/api/adoptante?search=${search}`);
            if (response.ok) {
                const data = await response.json();
                setAdoptantes(data.adoptantes);
                //console.log(data.adoptantes);
            } else {
                console.error("Failed to fetch adoptantes");
            }
        } catch (error) {
            console.error("An error occurred while fetching adoptantes", error);
        }
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    };
    const handleEstadoChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
        // Reset selected municipio when estado user
        setSearchCriteria((prevCriteria) => ({ ...prevCriteria, municipio: 0 }));
        e.target.value ?
            document.getElementById("municipio").disabled = false
            : document.getElementById("municipio").disabled = true;
    };

    return (
        <>
            <div>
                <center><h2>Lista de adoptantes</h2></center>
                <div className={listaAdoptantes.contenedor}>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"nombre"} label={"Nombre"} placeholder={"Nombre"} name={"nombre"} onChange={handleInputChange} />
                    </div>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"correo"} label={"Correo Electronico"} placeholder={"correo electronico"} name={"correo"} onChange={handleInputChange} />
                    </div>
                    <button
                        className="btn btn-lg btn-success"
                        onClick={fetchAdoptantes}>Buscar</button>
                </div>
                <div className={listaAdoptantes.contenedor}>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"adoptante"} label={"ID del adoptante"} placeholder={"Id adoptante"} name={"id"} onChange={handleInputChange} />
                    </div>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"numero"} label={"Numero de telefono"} placeholder={"Numero telefono"} name={"telefono"} onChange={handleInputChange} />
                    </div>
                </div>
                <div className={listaAdoptantes.contenedor}>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"edad"} label={"Edad"} placeholder={"edad"} name={"edad"} onChange={handleInputChange} />
                    </div>
                    <div className={listaAdoptantes.busqueda}>
                        <div className="input mb-3 mt-3">
                            <label htmlFor="estados" className="form-label">Estado</label>
                            <Estados estados={props.estados} handleChange={handleEstadoChange} value={searchCriteria.estado} />
                        </div>
                    </div>
                    <div className={listaAdoptantes.busqueda}>
                        <div className="input mb-3 mt-3">
                            <label htmlFor="municipios" className="form-label">Municipio</label>
                            <Municipios selectedEstado={searchCriteria.estado} value={searchCriteria.municipio} handleChange={handleInputChange} />
                        </div>
                    </div>
                </div>
            </div>
            {adoptantes.length !== 0 ?
                <div className="d-flex flex-wrap">
                    {adoptantes.map((adoptante) => (
                        <div key={adoptante.id} className={`${listaAdoptantes.tarjeta} bg-body-secondary rounded`}>
                            <Link href={`/adoptantes/adoptante/${adoptante.id}`} className="link-underline-opacity-0">
                                <div className={listaAdoptantes.imagen}>
                                    {adoptante.imagen ? (
                                        <Image
                                            src={`/images/adoptantes/${adoptante.imagen}`}
                                            alt={`Imagen Adoptante${adoptante.id}`}
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
                                <div className={`${listaAdoptantes.datos} rounded-bottom`}>
                                    <p>Nombre: {adoptante.nombre}</p>
                                    <p>id: {adoptante.id}</p>
                                    <p>correo: {adoptante.correo}</p>
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
