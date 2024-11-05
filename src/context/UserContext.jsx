import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState([]); 

    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const userData = await response.json();
                return userData
                setUser(userData); 
            } else {
                console.log("Failed to get data");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const signupUser = async (newUser) => {
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                const createdUser = await response.json();
                setUser(prevUser => [...prevUser, createdUser]); // Update state with new user
                navigate('/');
            } else {
                console.error('Failed to sign up');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const loginUser = async (credentials) => {
        try {
            const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const users = await response.json();
                if (users.length > 0) {
                    setUser(users[0]);
                    navigate('/'); 
                    return true;
                } else {
                    console.error('Invalid credentials');
                    return false;
                }
            } else {
                console.error('Failed to login');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <UserContext.Provider value={{ user, signupUser, loginUser, logout, getUser }}>
            {children}
        </UserContext.Provider>
    );
};
