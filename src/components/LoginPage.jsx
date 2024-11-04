import React, { useContext, useRef, useState } from 'react';
import InputField from './micro-components/InputField';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { loginUser } = useContext(UserContext);
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const refs = [emailRef, passwordRef, confirmPasswordRef];

    const generateToken = () => {
        return Math.floor(Math.random().toString(16));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userIsValid = true;
        const newErrors = {};

        Object.keys(input).forEach((key) => {
            if (!input[key].trim()) {
                newErrors[key] = 'This field is required';
                userIsValid = false;
            }
        });

        setErrors(newErrors);

        if (userIsValid) {
            const success = await loginUser(input);
            if (!success) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    invalidCred: 'Invalid credentials'
                }));
            } else {
                const token = generateToken();
                localStorage.setItem('token', token);
                navigate('/');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput, [name]: value
        }));

        if (value.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ""
            }));
        }
    };

    const handleKeyDown = (e, index) => {

    };

    return (
        <div className='form-container'>
            <h3>Login form</h3>
            <form onSubmit={handleSubmit}>
                <InputField
                    type="email"
                    label="Email"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 0)}
                    error={errors.email}
                    ref={emailRef}
                />
                <InputField
                    type="password"
                    label="Password"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 1)}
                    error={errors.password}
                    ref={passwordRef}
                />
                <button type="submit" className="submit-button">Login</button>
                {errors.invalidCred && <p className="error">{errors.invalidCred}</p>}
                <p>Don't have an account? <span><Link to='/signupPage'>Signup</Link></span></p>
            </form>
        </div>
    );
};

export default Login;
