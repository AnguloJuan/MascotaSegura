import { ChangeEventHandler } from "react";
interface Input {
    id: string,
    type?: string,
    name?: string,
    label?: string,
    placeholder?: string,
    onChange?: ChangeEventHandler,
    value?: string,
    required?: boolean,
    disabled?: boolean,
}

export default function Input(props: Input) {
    const { id, type, name, label, placeholder, onChange, value, required, disabled } = props;
    return (
        id !== "" ? (
            <>
                <div className="input my-3 flex flex-col gap-1 w-full">
                    <label htmlFor={id} className="form-label">{label}</label>
                    <input
                        id={id}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        className="rounded py-1.5 px-3 border-2 border-gray-400 border-opacity-75 focus:border-cyan-400 focus:border-opacity-100 focus:outline-0 focus:shadow-lg focus:ring-2 transition-color transition ease-in"
                        required={required}
                        disabled={disabled} />
                </div>
            </>) : <></>
    )
}
