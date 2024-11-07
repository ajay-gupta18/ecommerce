import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const initialUserData = {
        id: '',
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        cart: [],
        wishlist: []
    };
    const [usersData, setUsersData] = useState(()=>{
        const storedUserData = localStorage.getItem('usersData');
        return storedUserData ? JSON.parse(storedUserData) : initialUserData;
    });
    const [allUsersData, setAllUsersData] = useState([]); 

    useEffect(() => {
        // Fetch user data when the component mounts
        const fetchUsers = async () => {
            await getUser();
        };
        fetchUsers();
    }, []);
    useEffect(()=>{
        localStorage.setItem('usersData',JSON.stringify(usersData))
    },[usersData])

    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const users = await response.json();
                setAllUsersData(users); 
                // Ensure cart is always an array
                users.forEach(user => {
                    if (!Array.isArray(user.cart)) {
                        user.cart = []; // Set cart to an empty array if it's not an array
                    }
                });
                return users; 
            } else {
                console.log("Failed to get data");
                return [];
            }
        } catch (error) {
            console.log("Error:", error);
            return [];
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
                setUsersData(createdUser); // Set the created user data in the context, including the `id`
                setAllUsersData((prevUsers) => [...prevUsers, createdUser]); // Update all users
                toast("User created successfully")
                navigate('/loginPage'); 
                
            } else {
                console.error('Failed to sign up');
            }
        } catch (error) {
            console.error('Error during signup:', error);
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
                    setUsersData(users[0]); // This will set the entire user object, including the `id`
                    navigate('/');
                    toast('login successfully')
                    return true;
                } else {
                    toast('Invalid credentials');
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
        localStorage.removeItem('token','usersData');
        setUsersData(initialUserData); 
        navigate('/');
    };

    const addToCart = async (product) => {
        try {
            if (!usersData.id) {
                console.error("User ID is missing. Cannot update cart.");
                return;
            }
            const isProductInCart = usersData.cart.some(item => item.id === product.id);
            if (isProductInCart) {
                toast.error("Product is already in the cart");
                return;
            }
    
    
            // Ensure cart is an array before updating
            const updatedCart = Array.isArray(usersData.cart) ? [...usersData.cart, product] : [product];
            setUsersData((prevData) => ({
                ...prevData,
                cart: updatedCart
            }));
    
            const response = await fetch(`http://localhost:3000/users/${usersData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart: updatedCart })
            });
    
            if (!response.ok) {
                toast.error('Failed to update cart in backend');
            } else {
                toast.success('Cart successfully updated in backend');
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const removeFromCart =async(productId)=>{
        try {
            if (!usersData.id) {
                console.error("User ID is missing. Cannot update cart.");
                return;
            }
    
            // Ensure cart is an array before updating
            const updatedCart = usersData.cart.filter(product=>product.id!==productId)
            setUsersData((prevData) => ({
                ...prevData,
                cart: updatedCart
            }));
    
            const response = await fetch(`http://localhost:3000/users/${usersData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart: updatedCart })
            });
    
            if (!response.ok) {
                toast.error('Failed to update cart in backend');
            } else {
                toast.success('Cart successfully updated in backend');
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    }
    const removeFromWishlist =async(productId)=>{
        try {
            if (!usersData.id) {
                console.error("User ID is missing. Cannot update cart.");
                return;
            }
    
            // Ensure cart is an array before updating
            const updatedWishlist = usersData.wishlist.filter(product=>product.id!==productId)
            setUsersData((prevData) => ({
                ...prevData,
                wishlist: updatedWishlist
            }));
    
            const response = await fetch(`http://localhost:3000/users/${usersData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ wishlist: updatedWishlist })
            });
    
            if (!response.ok) {
                toast.error('Failed to update wishlist in backend');
            } else {
                toast.success('Wishlist successfully updated in backend');
            }
        } catch (error) {
            console.error('Error updating Wishlist:', error);
        }
    }

    const addToWishList =async(product)=>{
        try {
            if (!usersData.id) {
                console.error("User ID is missing. Cannot update wishlist.");
                return;
            }
            // Ensure cart is an array before updating
            const updatedWishlist = Array.isArray(usersData.wishlist) ? [...usersData.wishlist, product] : [product];
            setUsersData((prevData) => ({
                ...prevData,
                wishlist: updatedWishlist
            }));
    
            const response = await fetch(`http://localhost:3000/users/${usersData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ wishlist: updatedWishlist })
            });
    
            if (!response.ok) {
                toast.error('Failed to update wishlist in backend');
            } else {
                toast.success('Wishlist successfully updated in backend');
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    }

    return (
        <UserContext.Provider value={{ usersData, allUsersData, signupUser, loginUser, logout, getUser, setUsersData, addToCart,addToWishList,removeFromCart,removeFromWishlist }}>
            {children}
        </UserContext.Provider>
    );
};
