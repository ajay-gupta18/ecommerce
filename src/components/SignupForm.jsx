import React, { useContext, useRef, useState } from 'react';
import InputField from './micro-components/InputField';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        category: 'buyer'
    });
    const [errors, setErrors] = useState({});
    const { user, signupUser, getUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
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

        Object.keys(userData).forEach((key) => {
            if (!userData[key].trim()) {
                newErrors[key] = 'This field is required.';
                formIsValid = false;
            }
        });

        if (userData.password !== userData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            formIsValid = false;
        }

        setErrors(newErrors);
       const existingUsers =  await getUser(); // Fetch existing users
        if (formIsValid) {
            const userExist = existingUsers.some(item => item.email === userData.email);
            
            if (userExist) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'This email already exists. Please try with a different email.'
                }));
                return;
            }
            await signupUser(userData); // Await the signupUser call
            navigate('/');
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
                    value={userData.fullname}
                    onChange={handleChange}
                    error={errors.fullname}
                />
                <InputField
                    type="email"
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 0)}
                    error={errors.email}
                    ref={emailRef}
                />
                <InputField
                    type="password"
                    label="Password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 1)}
                    error={errors.password}
                    ref={passwordRef}
                />
                <InputField
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 2)}
                    error={errors.confirmPassword}
                    ref={confirmPasswordRef}
                />
                <label htmlFor="category">Category :</label>
                <select
                    className='input-category'
                    name="category"
                    id="category"
                    value={userData.category}
                    onChange={handleChange}
                >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <button type="submit" className="submit-button">Signup</button>
                <p>already have an account? <Link to='/loginPage'>Login</Link></p>
            </form>
        </div>
    );
}

export default SignupForm;
