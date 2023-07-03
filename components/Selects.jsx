export function Especies({ handleChange, especies }) {
    return (
        <>
            <select
                id="especies"
                onChange={handleChange}
                name="especie"
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
export function Sexos({ handleChange }) {
    return (
        <>
            <select
                id="sexo"
                onChange={handleChange}
                name="sexo"
                className="form-select">
                <option value="">Selecciona Sexo</option>
                <option value={1}>Macho</option>
                <option value={2}>Hembra</option>
            </select>
        </>
    )
}

