import {useReducer, useState} from "react";

export default function TaskList(){
  const inicialTasks = [{
    id: 1,
    text: 'Ir al mercadona',
    completed: false
  },{
    id: 2,
    text: 'Ejercicio 2 useReducer',
    completed: true
  }];

  const[tasks, dispatch] = useReducer(tasksReducer, inicialTasks);
  const[newTask, setNewTask] = useState('');

  function tasksReducer(state, action){
    switch(action.type){
      case('addTask'):{
        return [...state, {
          id: state.length + 1,
          text: action.newTask,
          completed: false
        }]
      }
      case('handleDelete'):{
        const newTasks = state.filter((task) => task.id != action.idTask);
        return newTasks;
      }
      case('handleCompleted'):{
        const newTasks = state.map((task) => {
          if(task.id == action.idTask){
            return {...task, completed:!task.completed}
          }else{
            return task;
          }
        });
        return newTasks;
      }
    }

  }

  return <div>
    <input type="text" placeholder="Nueva tarea" value={newTask} onChange={(e) => setNewTask(e.target.value)}></input>
    <button onClick={() => {dispatch({type:'addTask', newTask:newTask}); setNewTask('');}}>Add</button>
    <ul>
    {tasks.map((task) => 
      <li key={task.id}>
        <input type="checkbox" checked={task.completed} onChange={() => dispatch({type:"handleCompleted", idTask:task.id})}></input>
        {task.completed? <del>{task.text}</del>:task.text}
        <button onClick={() => dispatch({type:'handleDelete', idTask:task.id})}>Eliminar</button>
      </li>
    )}
    </ul>
  </div>
}