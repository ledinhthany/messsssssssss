import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest, baseUrl } from "../utils/services";

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) =>{
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setRegisterLoading] = useState(false);

    const [user,setUser] = useState(null);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password:"",
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password:"",
    });


    console.log("Userr",user);
    console.log("loginInfo",loginInfo);

    useEffect(()=>{
        const user = localStorage.getItem("User")

        setUser(JSON.parse(user))
    }, []);


    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo( info);
    },[]);
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo( info);
    },[]);

    const registerUser = useCallback(async(e)=> {
        e.preventDefault();

        setRegisterLoading(true)
        setRegisterError(null)

        const response = await postRequest(
            // eslint-disable-next-line no-undef
            `${baseUrl}/users/register`,
            JSON.stringify(registerInfo));

        setRegisterLoading(false)

        if(response.error){
            return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [registerInfo]);

    const loginUser = useCallback(async(e) =>{

        e.preventDefault()

        setIsLoginLoading(true)
        setLoginError(null)

        const response = await postRequest(

            `${baseUrl}/users/login`,
            JSON.stringify(loginInfo)
        );

        setIsLoginLoading(false)

        if(response.error){
            return setLoginError(response)
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response);

    }, [loginInfo])

    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    }, []);
    

    return <AuthContext.Provider 
    value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
        logoutUser,
    }}
    >
        { children }
    </AuthContext.Provider>
}