import logo from './logo.svg';
import './App.css';
import LearningComponent from './components/learning-examples/LearningComponent';
import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp'

function App() {
  return (
    <div className="App min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* <PlayingWithProps property1="value1" property2="value2"/> */}
      {/* <Counter/> */}
      <TodoApp/>
    </div>
  );
}
/*

//traditional way of using properties
function PlayingWithProps(properties){
  console.log(properties);//these properties are coming in as object
  console.log(properties.property1);
  return(
    <div>Props</div>
  )
}


*/

//modern javascript way of accessing properties //desconstructor based approach
function PlayingWithProps({property1, property2}){
  console.log(property1);
  console.log(property2);
  return(
    <div>Props</div>
  )
}

export default App;

/*
How can we have one state for all counters?
  1) Remane Couter to CounterButton
*/