import {useReducer, useState} from "react";
//No se puede modificar el email ya que lo he usado como identificador unico
const inicialValue = [
    {
      name: "Juan Pérez",
      email: "skyblue82@gmail.com",
      phone: "+34 600 123 456"
    },
    {
      name: "María López",
      email: "sunflower89@hotmail.com",
      phone: "+34 611 987 654"
    },
    {
      name: "Carlos Sánchez",
      email: "mountainview33@yahoo.com",
      phone: "+34 622 456 789"
    },
    {
      name: "Ana Martínez",
      email: "starlight74@gmail.com",
      phone: "+34 633 654 321"
    }
  ];
export default function UserList(){
    const emptyUser = {
        name: '',
        email: '', 
        phone: ''
    };
    const [userList, dispatch] = useReducer(userListReducer, inicialValue);
    const [newUser, setNewUser] = useState(emptyUser);
    const [modifiedUser, setModifiedUser] = useState(emptyUser);

    function userListReducer(state, action){
        switch(action.type){
            case 'handleAdd':{
                return [...state, action.newUser];
            }
            case 'handleDelete':{
                return state.filter((user) => user.email != action.email);
            }
            case 'handleModify':{
                return state.map((user) =>{
                    if(user.email != action.modifiedUser.email){
                        return user;
                    }else{
                        return action.modifiedUser;
                    }
                });
            }
            case 'handleReset':{
                return inicialValue;
            }
        }
    }

    return <div>
        <details>
            <summary>Añadir un nuevo usuario</summary>
            <form onSubmit={(e) => {e.preventDefault();dispatch({type:'handleAdd', newUser:newUser});setNewUser(emptyUser);}}>
                <p>Nombre: <input type="text" required value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})}></input></p>
                <p>Email: <input type="email" required value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})}></input></p>
                <p>Teléfono: <input type="tel" required value={newUser.phone} onChange={(e) => setNewUser({...newUser, phone: e.target.value})}></input></p>
                <p><input type="submit" value='Add'></input></p>
            </form>
        </details><br></br>
        
        
        <ul>
            {userList.map(user =>{
                if(user.email != modifiedUser.email){
                    return <li key={user.email}>
                        <p>Nombre: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Telefono: {user.phone}</p>
                        <p>
                        <button onClick={() => setModifiedUser(user)}>Modificar</button>
                        <button onClick={() => dispatch({type:'handleDelete', email:user.email})}>Eliminar</button>
                        </p>
                        <br></br>
                    </li>
                }else{
                    return <form key={user.email} onSubmit={(e) => {e.preventDefault();dispatch({type:'handleModify', modifiedUser:modifiedUser});setModifiedUser(emptyUser);}}>
                        <p>Nombre: <input type="text" required value={modifiedUser.name} onChange={(e) => setModifiedUser({...modifiedUser, name: e.target.value})}></input></p>
                        <p>Teléfono: <input type="tel" required value={modifiedUser.phone} onChange={(e) => setModifiedUser({...modifiedUser, phone: e.target.value})}></input></p>
                        <p><input type="submit" value='Save'></input></p>
                        <br></br>
                    </form>
                }
            }
                
            )}
        </ul>

        <button onClick={() => dispatch({type:'handleReset'})}>Reset</button>
    </div>
}