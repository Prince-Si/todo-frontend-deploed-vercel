import {useState} from 'react'
import PropTypes from 'prop-types'

export default function CounterButton({by, incrementCounterParentFunction, decrementCounterParentFunction}) {
    /*
    const buttonStyle = {
        fontSize:"16px",
        backgroundColor: "#00a5ab",
        width:"100px",
        margin:"10px",
        color:"white",
        padding: "15px",
        borderRadius: "30px"
    };*/
    //const state = useState(0);
    const [count, setCount] = useState(0); //deconstructor to update the state
    console.log(by);
    /* //we can directly call parent methods
    function incrementCounterFunction() {

        setCount(count+by); //does the same thing as below commented first line but in a simpler way
        incrementCounterParentFunction(by);
        
        //state[1](state[0]+1);
        //console.log(state); //returns a array with two elements first is current state value and second is a function to update the state
        //console.log(state[0]);//current state value
        //console.log(state[1]);//function to update state
        //this code is complex to write hence we use deconstructor in the cariable declaration of the state
        
        console.log(count);
    }
    function decrementCounterFunction() {
        setCount(count-by);
        decrementCounterParentFunction(by);
        console.log(count);
    }
    */
    return (
        <div className="Counter">
            {/*<span className="count">{count}</span> // uncomment to individual count states*/}
            <div>
                <button className="counterButton" 
                        onClick={() => incrementCounterParentFunction(by)} /*To pass the param to parent we need to use the arrow function here*/
                        //style={{fontSize:"30px"}}
                        //style={buttonStyle}
                >+{by}</button>
                <button className="counterButton" 
                        onClick={() => decrementCounterParentFunction(by)}
                >-{by}</button>
            </div>
        </div>
    )
}

CounterButton.propTypes = {
    by: PropTypes.number
}// to enforce the type of the props passed to this componenet are number

//also we can set default values for props
CounterButton.defaultProps={
    by: 1
}

/*
State: Built in React object used to contain data or information about the component

(REMEMBER) in earlier versions of React , ONLY Class components can have state.
    - And implementing state was very complex!

Hooks were introduced in React 16.8
    - Hooks are very easy to use
    - useState hook allows adding state to Function components
        -useState returns two things:
            1: Current state
            2: A function to update state
        -Each Instance of componenet has its own state
        -How to share state between components?
            Move state "upwards"
*/

//---------------------------------------------------------------
/*
Props : Properties
    - You can pass "props" (short for properties) object to a React Component
    - Used for things that remain a constant during lifetime of a component
        @Example: increment value of a sepecific component
*/