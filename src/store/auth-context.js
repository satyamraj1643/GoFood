import React, {useState} from 'react'



const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) =>{},
    logout:()=>{},
})



export const AuthContextProvider = (props)=>{

    const initialToken = localStorage.getItem('authToken');
    const toSet = !!initialToken? initialToken : null;
    const [token,setToken] = useState(toSet);

    const   userIsLoggedIn = !!token;

    const loginHandler = (token)=>{
        setToken(token);
        localStorage.setItem('authToken' , token);
    }

    const logoutHandler = ()=>{
        localStorage.clear()
        setToken(null);
    }

    const contextValue={
        token:token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout:logoutHandler,
    }

    return(
        <AuthContext.Provider value ={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )

};


export default AuthContext;


