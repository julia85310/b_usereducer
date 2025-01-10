import {useReducer} from "react";

export default function Form(){

  const initialState = { name: "", email: "" };

  const[formValues, dispatch] = useReducer(formReducer, initialState);

  function formReducer(state, action){
    switch(action.type){
      case 'reset':{
        return initialState;
      }
      case 'handleChange':{
        return {...state, [action.field]: action.value}
      }
    }
  }


  return <div>
    <form onSubmit={(e) => {e.preventDefault(); dispatch({type: 'reset'});}}>
      <input name="name" type="text" placeholder="nombre" value={formValues.name} onChange={(e) => dispatch({type:'handleChange', field: e.target.name, value: e.target.value})}></input><br></br>
      <input name="email" type="email" placeholder="email" value={formValues.email} onChange={(e) => dispatch({type:'handleChange', field: e.target.name, value: e.target.value})}></input><br></br>
      <input type="submit" value='Reset'></input>
    </form>
  </div>
}