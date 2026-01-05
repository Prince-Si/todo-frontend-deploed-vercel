import './Counter.css'
import {useState} from 'react'
import CounterButton from './CounterButton'

//now we will move counter state up from counter button to counter so that they will have a common state
export default function Counter(){

    const [count, setCount] = useState(0);

    function incrementCounterParentFunction(by){
        setCount(count + by);
    }

    function decrementCounterParentFunction(by){
        setCount(count - by);
    }

    function resetCounter(){
        setCount(0);
    }

    return(
        <>
            <span className="totalCount">{count}</span>
            <CounterButton by={1} 
            incrementCounterParentFunction={incrementCounterParentFunction} 
            decrementCounterParentFunction={decrementCounterParentFunction}/>
            <CounterButton by={2} 
            incrementCounterParentFunction={incrementCounterParentFunction} 
            decrementCounterParentFunction={decrementCounterParentFunction}/>
            <CounterButton by={5} 
            incrementCounterParentFunction={incrementCounterParentFunction} 
            decrementCounterParentFunction={decrementCounterParentFunction}/>

            <button className="resetButton" 
                        onClick={resetCounter}
            >Reset</button>
        </>
    )
}
