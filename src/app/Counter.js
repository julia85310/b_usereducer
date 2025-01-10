import {useReducer} from "react";

export default function Counter(){

  const inicialValue = 0;

  const [contador, dispatch] = useReducer(counterReducer, inicialValue);

  function counterReducer(state, action){
    switch(action.type){
      case 'decrement':{
        return state - 1;
      }
      case 'increment':{
        return state + 1;
      }
      case 'reset':{
        return inicialValue;
      }
    }
  }

  return <div>
    <button onClick={() => dispatch({type:'decrement'})}> - </button>
    {contador}
    <button onClick={() => dispatch({type:'increment'})}> + </button><br></br>
    <button onClick={() => dispatch({type:'reset'})}> RESET </button>
  </div>
}