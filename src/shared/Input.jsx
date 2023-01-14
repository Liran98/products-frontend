import React, { useReducer, useEffect } from 'react';

import "../STYLING/inputs.css"

function inputReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,

            };

        default:
            return state;
    }

}


function Input(props) {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.theupdate || "",
    });

    const { id, onInput } = props;
    const { value } = inputState;

    useEffect(() => {
        onInput(id, value);
    }, [id, value, onInput]);

    function changeHandler(event) {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,

        });
    }





    const element =
        props.element === 'input' ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                value={inputState.value}
              
                minLength={props.min}
                maxLength={props.max}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                value={inputState.value}
                placeholder={props.placeholder}
                required
               
            />
        );


    return (
        <div className='form_control'>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
        </div>
    )
}

export default Input;