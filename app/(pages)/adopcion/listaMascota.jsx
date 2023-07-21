"use client"
import InputLabel from "@/components/Input";
import listaMascotas from "./mascota.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Especies, Raza, Sexos } from "@/components/Selects";

export default function ListaMascota({ inicialMascotas, especies, razas, edades, userType }) {
    const [searchCriteria, setSearchCriteria] = useState({
        id: "",
        nombre: "",
        especie: "",
        raza: "",
        edad: "",
        sexo: "",
        userType: 0,
    });

    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        setSearchCriteria((prevCriteria) => ({ ...prevCriteria, userType: userType }));
        setMascotas(inicialMascotas);
    }, []);

    const fetchMascotas = async () => {
        // Perform the API request to fetch the mascotas list
        try {
            const search = JSON.stringify(searchCriteria);
            //console.log(search);
            const response = await fetch(`/api/mascotas?search=${search}`);
            if (response.ok) {
                const data = await response.json();
                setMascotas(data.mascotas);
                //console.log(data.mascotas);
            } else {
                console.error("Failed to fetch mascotas");
            }
        } catch (error) {
            console.error("An error occurred while fetching mascotas", error);
        }
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    };

    return (
        <>
            <div>
                <div className={listaMascotas.contenedor}>
                    <InputLabel id={"nombre"} name={"nombre"} label={"Nombre"} placeholder={"Nombre"} onChange={handleInputChange} />
                    <button className="btn btn-success btn-lg" onClick={fetchMascotas} >Buscar</button>
                </div>

                <div className={`${listaMascotas.contenedor} gap-3 d-flex`}>
                    <div className={listaMascotas.busqueda}>
                        <InputLabel id={"idMascota"} name={"id"} type={"number"} label={"ID de la mascota"} placeholder={"Id de la Mascota"} onChange={handleInputChange} />
                    </div>
                    <div className={`${listaMascotas.busqueda} `}>
                        <div className="input mb-3 mt-3">
                            <label htmlFor="especies" className="form-label">Especie</label>
                            <Especies handleChange={handleInputChange} especies={especies} />
                        </div>
                    </div>
                </div>
                <div className={`${listaMascotas.contenedor} gap-3 d-flex`}>
                    <div className={listaMascotas.busqueda}>
                        <div className="input mb-3 mt-3">
                            <label htmlFor="razas" className="form-label">Raza</label>
                            <Raza handleChange={handleInputChange} razas={razas} />
                        </div>
                    </div>
                    <div className={listaMascotas.busqueda}>
                        <InputLabel id={"edad"} name={"edad"} type={"number"} label={"Edad"} placeholder={"Edad"} onChange={handleInputChange} />
                    </div>
                    <div className={listaMascotas.busqueda}>
                        <div className="input mb-3 mt-3">
                            <label htmlFor="sexo" className="form-label">Sexo</label>
                            <Sexos handleChange={handleInputChange} />
                        </div>
                    </div>
                </div>
            </div>

            {mascotas.length !== 0 ? (
                <div className="d-flex flex-wrap">
                    {mascotas.map((mascota) => (
                        <Link key={mascota.id} href={`/adopcion/mascota/${mascota.id}`}>
                            <div className={listaMascotas.tarjeta}>
                                <div className={listaMascotas.imagen}>
                                    {mascota.imagen ? (
                                        <Image
                                            src={`/images/mascotas/${mascota.imagen}`}
                                            alt='default.png'
                                            width={300}
                                            height={300}
                                            loading="lazy"
                                            color="white"
                                            className="bg-white rounded bg-opacity-25"
                                        />
                                    ) : (
                                        <Image
                                            src={"/images/dogIcon.png"}
                                            alt='default.png'
                                            width={300}
                                            height={300}
                                            loading="lazy"
                                            color="white"
                                            className="bg-white rounded bg-opacity-25"
                                        />
                                    )}
                                </div>
                                <div className={listaMascotas.datos}>
                                    <p>id: {mascota.id}</p>
                                    <p>Nombre: {mascota.nombre}</p>
                                    <p>Edad: {mascota.edad}</p>
                                    <p>Sexo: {mascota.sexo.sexo}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (<center><h3 className="mt-3">No se encontraron resultados</h3></center>)}
        </>
    );
}