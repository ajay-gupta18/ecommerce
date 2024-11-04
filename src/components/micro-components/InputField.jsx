// TextInput.js
import React from 'react';

const InputField = React.forwardRef(({ type,label, name, value, onChange, onKeyDown, error }, ref) => {
    return (
        <div className="input-field">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                ref={ref}
                name={name}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                id={name}
            />
            {error && (
                <div className="error-container">
                    <p className='error'>{error}</p>
                </div>
            )}
        </div>
    );
});

export default InputField;
