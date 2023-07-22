export function Especies({ handleChange, especies, required, value }) {
    return (
        <>
            <select
                id="especies"
                onChange={handleChange}
                name="especie"
                required={required}
                value={value}
                className="form-select">
                <option value="">Selecciona Especie</option>
                {especies.map((especie) => (
                    <option key={especie.id} value={especie.id}>
                        {especie.especie}
                    </option>
                ))}
            </select>
        </>
    )
}
export function Raza({ handleChange, razas }) {
    return (
        <>
            <select
                id="razas"
                onChange={handleChange}
                name="raza"
                className="form-select">
                <option value="">Selecciona Raza</option>
                {razas.map((raza) => (
                    <option key={raza.id} value={raza.raza}>
                        {raza.raza}
                    </option>
                ))}
            </select>
        </>
    )
}
export function Sexos({ handleChange, required, value }) {
    return (
        <>
            <select
                id="sexo"
                onChange={handleChange}
                name="sexo"
                required={required}
                value={value}
                className="form-select">
                <option value="">Selecciona Sexo</option>
                <option value={1}>Macho</option>
                <option value={2}>Hembra</option>
            </select>
        </>
    )
}
export function Tamanos({ handleChange, required, value }) {
    return (
        <>
            <select
                id="tamano"
                onChange={handleChange}
                name="tamano"
                required={required}
                value={value}
                className="form-select">
                <option value="">Selecciona el tamaño</option>
                <option value={1}>No especificado</option>
                <option value={2}>Diminuto</option>
                <option value={3}>Pequeño</option>
                <option value={4}>Mediano</option>
                <option value={5}>Grande</option>
                <option value={6}>Enorme</option>
            </select>
        </>
    )
}
export function EstadosReporte({ handleChange, required, value, disabled }) {
    return (
        <>
            <select
                id="estadoReporte"
                onChange={handleChange}
                name="estadoReporte"
                required={required}
                value={value}
                disabled={disabled}
                className="form-select">
                <option value="">Selecciona el estado del reporte</option>
                <option value={1}>Reportado</option>
                <option value={2}>Confirmado</option>
                <option value={3}>En proceso</option>
                <option value={4}>Resuelto</option>
                <option value={5}>Falso</option>
            </select>
        </>
    )
}
export function Estados({ handleChange, estados, value, disabled }) {
    return (
        <>
            <select
                id="estado"
                onChange={handleChange}
                value={value ? value : 0}
                name="estado"
                disabled={disabled}
                className="form-select">
                <option value="">Selecciona Estado</option>
                {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                        {estado.nombre}
                    </option>
                ))}
            </select>
        </>
    )
}