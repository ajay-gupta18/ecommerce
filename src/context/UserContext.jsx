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
                users.forEach(user => {
                    if (!Array.isArray(user.cart)) {
                        user.cart = [];
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
                setUsersData(createdUser);
                setAllUsersData((prevUsers) => [...prevUsers, createdUser]);
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
                    setUsersData(users[0]);
                    navigate('/');
                    toast('login successfully')
                    return true;
                } else {
                    toast.error('Invalid credentials');
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

    const toggleWishlist = (product) => {
        if (!usersData.id) {
            console.error("User ID is missing. Cannot update wishlist.");
            return;
        }

        const isProductInWishlist = usersData.wishlist.some(item => item.id === product.id);
        const updatedWishlist = isProductInWishlist
            ? usersData.wishlist.filter(item => item.id !== product.id)
            : [...usersData.wishlist, product];

        setUsersData((prevData) => ({
            ...prevData,
            wishlist: updatedWishlist
        }));

        const updateWishlistInBackend = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${usersData.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ wishlist: updatedWishlist })
                });

                if (!response.ok) {
                    console.error('Failed to update wishlist in backend');
                } else {
                    console.log('Wishlist successfully updated in backend');
                }
            } catch (error) {
                console.error('Error updating wishlist:', error);
            }
        };

        updateWishlistInBackend();
    };

    return (
        <UserContext.Provider value={{ usersData, allUsersData, signupUser, loginUser, logout, getUser, setUsersData, addToCart,removeFromCart,removeFromWishlist,toggleWishlist }}>
            {children}
        </UserContext.Provider>
    );
};
