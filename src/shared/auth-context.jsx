import { createContext } from "react";

export const Authcontext = createContext({
    isloggedin: false,
    userId:null,
    Login: () =>{},
    Logout: () =>{}
});