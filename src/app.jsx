import React, { useCallback, useState,useEffect } from "react";

import Footer from "./components/footerDate";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Users from "./USERS/pages/Users";
import UsersProducts from "./PRODUCTS/pages/userProducts";


import UpdateProducts from "./PRODUCTS/pages/UpdateProducts";
import Auth from "./USERS/pages/Auth";
import { Authcontext } from "./shared/auth-context";
import MAINNav from "./shared/MainNav";
import AddProducts from "./PRODUCTS/pages/addProducts";
import HomePage from "./HomePage";



function App() {


    const [userId, setuserId] = useState(false);
    const [loggedIn, setIsloggedIn] = useState(false);

    const login = useCallback((uid,expirationdate) => {
        setIsloggedIn(true);
        setuserId(uid);

        const expirationTime = expirationdate || new Date(new Date().getTime() + 1000 * 60 * 60);
        localStorage.setItem('userData'
        , JSON.stringify({
          userId: uid,
          expiration:expirationTime.toISOString()
        }));
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.userId && new Date(storedData.expiration) > new Date()) {
          login(storedData.userId,  new Date(storedData.expiration));
        }
      }, [login]);

    const logout = useCallback(() => {
        setIsloggedIn(false);
        setuserId(null);
        localStorage.removeItem('userData');
    }, []);

    let routes;
    if (loggedIn) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/users" exact>
                    <Users />
                </Route>
                <Route path="/:userId/products" exact>
                    <UsersProducts />
                </Route>
                <Route path="/products/new" exact>
                    <AddProducts />
                </Route>
                <Route path="/products/:productId" exact>
                    <UpdateProducts />
                </Route>
                <Redirect to="/" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/users" exact>
                    <Users />
                </Route>
                <Route path="/:userId/products" exact>
                    <UsersProducts />
                </Route>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Redirect to="/auth" />
            </Switch>
        );
    }


    return (
        <Authcontext.Provider
            value={{
                isloggedin: loggedIn,
                userId: userId,
                Login: login,
                Logout: logout
            }}>
            <Router >
                <MAINNav />
                <main>{routes}</main>
                <Footer />
            </Router>


        </Authcontext.Provider>
    )
}

export default App;