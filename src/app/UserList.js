import {useReducer} from "react";
const usersData = [
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
    },
    {
      name: "Luis Fernández",
      email: "greenforest27@outlook.com",
      phone: "+34 644 789 123"
    },
    {
      name: "Sofía Ramírez",
      email: "silvermoon91@gmail.com",
      phone: "+34 655 321 987"
    },
    {
      name: "Miguel Torres",
      email: "goldensun56@yahoo.com",
      phone: "+34 666 987 112"
    },
    {
      name: "Isabella Gómez",
      email: "bluesky47@hotmail.com",
      phone: "+34 677 765 432"
    },
    {
      name: "Gabriel Ruiz",
      email: "dreamer88@outlook.com",
      phone: "+34 688 234 567"
    },
    {
      name: "Lucía Castillo",
      email: "hiddenstar29@gmail.com",
      phone: "+34 699 876 543"
    }
  ];
  
export default function UserList(){
    const inicialValue = {filtro: '', resultado:usersData};
    const[busqueda, dispatch] = useReducer(userListReducer, inicialValue);
    
    function userListReducer(state, action){
        switch(action.type){
            case 'handleSearch':{
                if(action.value.target.value == ''){
                    return inicialValue;
                } 
                const busqueda = action.value.target.value;
                const result = usersData.filter((user) =>
                user.name.toLowerCase().includes(busqueda.toLowerCase()) || user.email.toLowerCase().includes(busqueda.toLowerCase())
                );
                return {filtro:busqueda, resultado:result}
            }
        }
    }

    return <div>
        <h2>Buscador de usuarios</h2>
        <input type="text" placeholder="nombre o email" value={busqueda.filtro} onChange={(e) => dispatch({type:'handleSearch', value:e})}></input>
        <h2>Resultado</h2>
        <ul>
            {busqueda.resultado.map(user =>
                <li key={user.email}>
                    <p>Nombre: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Telefono: {user.phone}</p>
                    <br></br>
                </li>
            )}
            
        </ul>
    </div>
}