export default function Input({ id, type, label, placeholder, onChange }) {
    return (
        id !== "" ? (
            <>
                <div className="input mb-3">
                    <label htmlFor={id} className="form-label">{label}</label>
                    <input type={type} className="form-control" id={id} placeholder={placeholder} onChange={onChange}/>
                </div>
            </>) : <></>
    )
}