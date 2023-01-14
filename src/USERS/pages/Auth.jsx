import React, { useContext, useState, useReducer, useCallback } from 'react';
import Input from '../../shared/Input';
import ErrorModal from '../../shared/ErrorModal';
import LoadingSpinner from '../../shared/loadingspinner';
import Card from '../../shared/card';
// import ImageUpload from '../../shared/imageUpload';
import { useHistory } from 'react-router';
import { Authcontext } from '../../shared/auth-context';
import Button from 'react-bootstrap/Button';

import "../../STYLING/auth.css";


const AuthReducer = (state, action) => {

    switch (action.type) {

        case 'INPUT_CHANGE':
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue;
                }

            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value }
                },

            };

        default:
            return state;
    }

};

function Auth() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isloginMode, setisloginMode] = useState(true);
    const auth = useContext(Authcontext);

    const [Authstate, dispatch] = useReducer(AuthReducer, {
        inputs: {
            email: {
                value: "",
            },
            password: {
                value: "",
            },
        }
    });

    const inputhandler = useCallback((id, value) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            inputId: id
        });
    }, []);




    function modechange() {
        if (!isloginMode) {
            dispatch({
                ...Authstate.inputs,
                name: undefined,
                // image: undefined,
            });
        } else {
            dispatch({
                ...Authstate.inputs,
                name: {
                    value: '',
                },
                // image: {
                //     value: null,
                // }
            });
        }
        setisloginMode((prevmode) => {
            return !prevmode;
        });
    }


    const history = useHistory();
    async function Submithandler(event) {
        event.preventDefault();
        if (isloginMode) {
            try {
                setIsLoading(true);
                const response = await fetch(`https://${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: Authstate.inputs.email.value,
                        password: Authstate.inputs.password.value,
                    }),

                });
                const responsedata = await response.json();
              if(!response.ok){
                throw new Error(responsedata.message);

              }

                auth.Login(responsedata.user.id);
                setIsLoading(false);
                history.push('/users');
             
            } catch (err) {
                setIsLoading(false);
                console.log(err);
                setError(err.message);
            }
           
        } else {
            try {
                setIsLoading(true);
                const formDATA = new FormData();
                formDATA.append('email', Authstate.inputs.email.value);
                formDATA.append('password', Authstate.inputs.password.value);
                formDATA.append('name', Authstate.inputs.name.value);
                // formDATA.append('image', Authstate.inputs.image.value);
                const response = await fetch(`https://${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, {
                    method: 'POST',
                    body: formDATA,
                
                });
                const responsedata = await response.json();
             
                if(!response.ok){
                  throw new Error(responsedata.message);
  
                }
                auth.Login(responsedata.user.id);
                setIsLoading(false);
                history.push('/users');
            } catch (err) {
                setIsLoading(false);
                setError(err.messsage || "something went wrong ,please try again");
                throw err;
            }
         
        }

    }
    const clearError = () => {
        setError(null);
    }
    return (
<React.Fragment>
<ErrorModal error={error} onClear={clearError}/>
        <Card
            className='authentication'>
                 {isLoading && <LoadingSpinner asOverlay />}
            {isloginMode ? <h1>Login Required</h1> : <h1>SignUp Required</h1>}
            <hr />
            <form onSubmit={Submithandler}>
           
                {!isloginMode &&
                    <Input
                        id="name"
                        type="text"
                        placeholder='Name...'
                        label="Name"
                        element="input"
                        onInput={inputhandler}
                    />}
                {/* {!isloginMode &&
                    <ImageUpload
                        id="image"
                        onInput={inputhandler}
                    />} */}
                <Input
                    id="email"
                    element="input"
                    type="email"
                    placeholder='Email...'
                    label="Email"
                    onInput={inputhandler}

                />

                <Input
                    id="password"
                    element="input"
                    label="Password"
                    type="password"
                    placeholder='Password...'
                    onInput={inputhandler}
                    min="6"
                />

                <Button variant="outline-light btn-primary" type="submit">{isloginMode ? "LOGIN" : "SIGNUP"}</Button>
            </form>
            <Button variant="outline-light btn-secondary" onClick={modechange}>{isloginMode ? "SWITCH TO SIGNUP" : "SWITCH TO LOGIN"}</Button>


        </Card>
</React.Fragment>
    )
}

export default Auth
