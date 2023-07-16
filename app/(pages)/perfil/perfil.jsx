"use client"
import InputLabel from "@/components/Input";
import perfilAdoptador from "./perfil.module.css";
import { Estados } from "@/components/Selects";
import { Municipios } from "@/components/SelectsClient";
import { useState } from "react";

export default function Perfil({ estados, municipios, props }) {
    const [changes, setChanges] = useState({
        estado: props.userEstado.idEstado,
        municipio: props.userMunicipio,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChanges((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    };

    const handleEstadoChange = (e) => {
        const { name, value } = e.target;
        setChanges((prevCriteria) => ({ ...prevCriteria, [name]: value }));
        // Reset selected municipio when estado changes
        setChanges((prevCriteria) => ({ ...prevCriteria, municipio: 0 }));
        event.target.value ?
            document.getElementById("municipio").disabled = false
            : document.getElementById("municipio").disabled = true;
    };

    return (
        <>
            <div className={perfilAdoptador.datosperfil}>
                <Estados handleChange={handleEstadoChange} estados={estados} value={changes.estado} />
                <Municipios handleChange={handleInputChange} municipiosInicial={municipios} selectedEstado={changes.estado} value={changes.municipio} />
            </div>
            <div className="contenedor-btn d-flex flex-row justify-content-center gap-2 m-3">
                <button type="submit" className="btn btn-primary btn-lg">Guardar</button>
                <button type="submit" className="btn btn-danger btn-lg">Eliminar cuenta</button>
            </div>

        </>
    )
}
