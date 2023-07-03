export default function Input({ id, type, name, label, placeholder, onChange, value, disabled }) {
    return (
        id !== "" ? (
            <>
                <div className="input mb-3">
                    <label htmlFor={id} className="form-label">{label}</label>
                    {disabled ? (
                        <input id={id} type={type} name={name} placeholder={placeholder} onChange={onChange} value={value} disabled className="form-control" />
                    ) : (
                        <input id={id} type={type} name={name} placeholder={placeholder} onChange={onChange} value={value} className="form-control" />
                    )}
                </div>
            </>) : <></>
    )
}
