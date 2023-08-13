import { especie, estado } from "@prisma/client"

export function Especies({ handleChange, especies, required, value }: {
    handleChange: React.ChangeEventHandler<HTMLSelectElement>,
    especies: Array<especie>,
    required?: boolean,
    value?: string
}) {
    return (
        <>
            <select
                id="especies"
                onChange={handleChange}
                name="especie"
                required={required}
                value={value}
                className="rounded py-1.5 px-3 border-2 border-gray-400 border-opacity-75 focus:border-cyan-400 focus:border-opacity-100 focus:outline-0 focus:shadow-lg focus:ring-2 transition-color transition ease-in cursor-pointer">
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
type raza = {
    id: number,
    raza: string,
}
export function Raza({ handleChange, razas }: {
    handleChange: React.ChangeEventHandler<HTMLSelectElement>,
    razas: Array<raza>,
}) {
    return (
        <>
            <select
                id="razas"
                onChange={handleChange}
                name="raza"
                className="rounded py-1.5 px-3 border-2 border-gray-400 border-opacity-75 focus:border-cyan-400 focus:border-opacity-100 focus:outline-0 focus:shadow-lg focus:ring-2 transition-color transition ease-in cursor-pointer">
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
export function Sexos({ handleChange, required, value }:{
    handleChange: React.ChangeEventHandler<HTMLSelectElement>,
    required?: boolean,
    value?: number,
}) {
    return (
        <>
            <select
                id="sexo"
                onChange={handleChange}
                name="sexo"
                required={required}
                value={value}
                className="rounded py-1.5 px-3 border-2 border-gray-400 border-opacity-75 focus:border-cyan-400 focus:border-opacity-100 focus:outline-0 focus:shadow-lg focus:ring-2 transition-color transition ease-in cursor-pointer">
                <option value="">Selecciona Sexo</option>
                <option value={1}>Macho</option>
                <option value={2}>Hembra</option>
            </select>
        </>
    )
}
export function Tamanos({ handleChange, required, value }:{
    handleChange: React.ChangeEventHandler<HTMLSelectElement>,
    required?: boolean,
    value: number,
}) {
    return (
        <>
            <select
                id="tamano"
                onChange={handleChange}
                name="tamano"
                required={required}
                value={value}
                className="rounded py-1.5 px-3 border-2 border-gray-400 border-opacity-75 focus:border-cyan-400 focus:border-opacity-100 focus:outline-0 focus:shadow-lg focus:ring-2 transition-color transition ease-in cursor-pointer">
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
export function EstadosReporte({ handleChange, required, value, disabled }:{
    handleChange: React.ChangeEventHandler<HTMLSelectElement>,
    required?: boolean,
    value: number,
    disabled?: boolean
}) {
    return (
        <>
            <select
                id="estadoReporte"
                onChange={handleChange}
                name="estadoReporte"
                required={required}
                value={value}
                disabled={disabled}
                className="rounded py-1.5 px-3 border-2 border-gray-400 border-opacity-75 focus:border-cyan-400 focus:border-opacity-100 focus:outline-0 focus:shadow-lg focus:ring-2 transition-color transition ease-in cursor-pointer">
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
export function Estados({ handleChange, estados, value, disabled }: {
    handleChange: React.ChangeEventHandler<HTMLSelectElement>,
    estados: Array<estado>,
    value: number,
    disabled?: boolean
}) {
    return (
        <>
            <select
                id="estado"
                onChange={handleChange}
                value={value ? value : 0}
                name="estado"
                disabled={disabled}
                className="rounded py-1.5 px-3 border-2 border-gray-400 border-opacity-75 focus:border-cyan-400 focus:border-opacity-100 focus:outline-0 focus:shadow-lg focus:ring-2 transition-color transition ease-in cursor-pointer">
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