import { useEffect, useState } from "react";


function ListTodo() {

  const [tasks, setTasks] = useState(['Fumar', 'mimir', 'sair']);
  const [newTask, setNewTask] = useState('');

  function inputChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {

    if(newTask.trim() !== '') {
      setTasks(t => [...t, newTask]);
      setNewTask('');
    }
    
  }

  function removeTask(index) {
   const updatedTasks = tasks.filter((_, i) => i !== index);
   setTasks(updatedTasks);
  }

  return (
    <div className="todo-list">

      <h1>To-Do List</h1>
      <div>
        <input type="text" id="taskInput" placeholder="New Task" onChange={inputChange} />
        <button className="add-btn" type="submit" onClick={addTask}>Add</button>
      </div>

      <ol>
        {tasks.map((task, index) =>
          <li key={index}>
            <span className="text">{task}</span>
            <button className="delete-btn" onClick={() => removeTask(index)}>Delete</button>
          </li>
        )}
      </ol>

    </div>
  );
}

export default ListTodo;