/*
Basic React Application with all built in hooks and 2 custom made hooks.
Custom Made Hooks:
1. useLocalStorage(): For persisiting value in local storage. Functionality wise same as useState.
2. useUpdateLogger(): Printing value everytime when it gets updated.
*/

import React, {useState, useEffect, useReducer} from 'react';
import './App.css';
import useLocalStorage from './useLocalStorage'
import useUpdateLogger from './useUpdateLogger'

//Reducer function to handle actions
function reducer (state,action) {
  switch(action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state-1;
    default:
      throw new error();
  }
}

function App() {

  const [count, setCount] = useState(0);               //useState Hook
  const [state, dispatch] = useReducer(reducer,0);     // useReducer Hook with reducer Function
  const [name, setName] = useLocalStorage('','name');  // custom hook made to persist value
  useUpdateLogger(count);                              //custom hook to log value on every change
  useUpdateLogger(name);
  const incrementCounter = () => {
    setCount(count+1);
  }

  //Component Lifecycle 
  useEffect(() => {      
    alert("Hello");          //Component did mount

    return () => alert("goodbye");  //Component destory/unmount
  },[count])                //Component updation
  
  return (
   <div>
   <button onClick={incrementCounter}>useState count: {count}</button>
    <button onClick={() => dispatch({type: 'increment'})}>reducer +: {state}</button>
     <button onClick={() => dispatch({type: 'decrement'})}>reducer -: {state}</button>

     <input 
       type = "text"
       value = {name}   
       onChange={e => setName(e.target.value)} 
       />
   </div>

  );
}

export default App;

