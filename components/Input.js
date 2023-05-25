export default function InputLabel({id, type ,label, placeholder}) {
    return (
        id !== "" ? (
            <>
            <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input type={type} className="form-control" id={id} placeholder={placeholder}/>
            </div>
            </>) : <></>
    )
}
/*
            <div class="input-group mb-3">
                <input type="number" id="numero" min="0" max="100" name="numero" class="form-control" placeholder="Ingrese un número del 1 al 100"
                    aria-label="Ingrese un número" aria-describedby="button-addon2">
                    <div class="input-group-append">
                        <button onclick="adivinar()" class="btn btn-outline-secondary" type="button"
                            id="button-addon2">Adivinar</button>
                    </div>
                </input >
            </div>
*/