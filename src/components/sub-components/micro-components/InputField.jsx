import React, { Children } from 'react'

const InputField = ({ htmlFor, name, type, }) => {
    return (
        <div className="input-field">
            <label htmlFor={htmlFor}>{name}</label>
            <input type={type} name={name}  />
        </div>
    )
}

export default InputField
