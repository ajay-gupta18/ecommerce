import React, { useContext, useRef, useState } from 'react';
import InputField from './micro-components/InputField';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        cart:[],
        wishlist:[]
    });
    const [errors, setErrors] = useState({});
    const { signupUser, getUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        if (value.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ""
            }));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (index < refs.length - 1) {
                refs[index + 1].current.focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formIsValid = true;
        const newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = 'This field is required.';
                formIsValid = false;
            }
        });

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            formIsValid = false;
        }

        setErrors(newErrors);

        const existingUsers = await getUser(); 
        if (formIsValid) {
            const userExist = existingUsers.some(item => item.email === formData.email);

            if (userExist) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'This email already exists. Please try with a different email.'
                }));
                return;
            }
            await signupUser(formData); 
            navigate('/loginPage');
        }
    };

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const refs = [emailRef, passwordRef, confirmPasswordRef];

    return (
        <div className='form-container'>
            <h3>Signup form</h3>
            <form onSubmit={handleSubmit}>
                <InputField
                    type='text'
                    label='Full Name'
                    name='fullname'
                    value={formData.fullname}
                    onChange={handleChange}
                    error={errors.fullname}
                />
                <InputField
                    type="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 0)}
                    error={errors.email}
                    ref={emailRef}
                />
                <InputField
                    type="password"
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 1)}
                    error={errors.password}
                    ref={passwordRef}
                />
                <InputField
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 2)}
                    error={errors.confirmPassword}
                    ref={confirmPasswordRef}
                />
                <button type="submit" className="submit-button">Signup</button>
                <p>Already have an account? <Link to='/loginPage'>Login</Link></p>
            </form>
        </div>
    );
}

export default SignupForm;

