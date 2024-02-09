import { useEffect, useState } from "react";


function ListTodo() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newCreatedAt, setNewCreatedAt] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/todolist')
      .then(response => response.json())
      .then(tasks => setTasks(tasks))
      .catch(error => console.error(`Error fetching tasks:`, error));
  }, []);

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {

    if (newTask.trim() !== '') {
      fetch('http://localhost:8000/todolist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title: newTask
        })
      })
        .then(response => response.json())
        .then(newTask => setTasks(t => [...t, newTask]))
        .catch(error => console.error(`Error adding task:`, error));
      setNewTask('');
    }
  }

  function completeTask(index) {
    
    fetch('http://localhost:8000/todolist/' + tasks[index]._id, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ 
        status: 'Completed'
      })
    })
      .then(response => response.json())
      .then(completedTask => setTasks(t => [...t, completedTask]))
      .catch(error => console.error(`Error finishing task:`, error));
  }

  function removeTask(index) {

    fetch('http://localhost:8000/todolist/' + tasks[index]._id, {
      method: 'DELETE'
    })
      .then(res => res);

    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTask();
  }

  return (
    <div className="todo-list">

      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="taskInput" placeholder="Enter new task" onChange={handleInputChange} />
        <button className="add-btn" type="submit">Add</button>
      </form>
      <hr />
      <ol>
        {tasks.map((task, index) =>
          <li key={index}>
            <p className="text">{task.title}</p>
            <p>Created at: {task.createdAt.split('T')[0]}</p>
            <p>Status: <b>{task.status}</b></p>
            <button className="done-btn material-symbols-outlined" onClick={() => completeTask(index)}>done</button>
            <button className="edit-btn material-symbols-outlined">edit</button>
            <button className="delete-btn" onClick={() => removeTask(index)}>Delete</button>
          </li>
        )}
      </ol>

    </div>
  );
}

export default ListTodo;