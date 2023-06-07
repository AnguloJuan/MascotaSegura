export default function Input({ id, type, label, placeholder }) {
    return (
        id !== "" ? (
            <>
                <div className={"input"}>
                    <label htmlFor={id} className="form-label">{label}</label>
                    <input type={type} className="form-control" id={id} placeholder={placeholder} />
                </div>
            </>) : <></>
    )
}