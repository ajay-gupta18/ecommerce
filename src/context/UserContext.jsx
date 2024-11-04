import { Children, createContext, useState, } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();


export  const UserProvider =({children})=>{
    const navigate = useNavigate()
    const [user, setUser] = useState([]);
    
    const signupUser =async (newUser)=>{
        setUser((prevUser)=>[...prevUser,newUser]);
        await fetch("http://localhost:3000/users",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newUser),
        }).then(()=>{
            navigate('/')
        })
    }

    
    const loginUser = async (credentials) => {
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const authenticatedUser = await response.json();
                setUser([...user, authenticatedUser]);
                navigate('/');
                return true;
            } else {
                console.error('Invalid credentials');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };


    return (
        <UserContext.Provider value={{user,signupUser,loginUser }}>
          {children}
        </UserContext.Provider>
        )
}