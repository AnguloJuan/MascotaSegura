export default function Input({ id, type, label, placeholder, onChange, value, disabled }) {
    return (
        id !== "" ? (
            <>
                <div className="input mb-3">
                    <label htmlFor={id} className="form-label">{label}</label>
                    {disabled ? (
                        <input type={type} className="form-control" id={id} placeholder={placeholder} onChange={onChange} value={value} disabled />
                    ) : (
                        <input type={type} className="form-control" id={id} placeholder={placeholder} onChange={onChange} value={value} />
                    )}
                </div>
            </>) : <></>
    )
}
