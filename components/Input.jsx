export default function Input({ id, type, name, label, placeholder, onChange, value, disabled, required }) {
    return (
        id !== "" ? (
            <>
                <div className="input mb-3">
                    <label htmlFor={id} className="form-label">{label}</label>
                    <input id={id} type={type} name={name} placeholder={placeholder} onChange={onChange} value={value} className="form-control" required={required} disabled={disabled} />
                </div>
            </>) : <></>
    )
}
