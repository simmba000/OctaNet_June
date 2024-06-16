import React from "react";
import { useState, useEffect } from "react";
import "./toDoList.css";
import { faUndo, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Task({ task, index, completeTask, removeTask, undoTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {task.title}

      <button style={{ background: "red" }} onClick={() => removeTask(index)}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {!task.completed ? (
        <button onClick={() => completeTask(index)}>Complete</button>
      ) : (
        <>
          <button disabled>Completed</button>
          <button onClick={() => undoTask(index)}>
            <FontAwesomeIcon icon={faUndo} />
          </button>
        </>
      )}
    </div>
  );
}

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function ToDoList() {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasks, setTasks] = useState([
    {
      title: "Grab some Pizza",
      completed: true,
    },
    {
      title: "Do your workout",
      completed: true,
    },
    {
      title: "Hangout with friends",
      completed: false,
    },
  ]);

  useEffect(() => {
    setTasksRemaining(tasks.filter((task) => !task.completed).length);
  }, [tasks]);

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };

  const undoTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = false;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="todo-container">
      <div className="titleHeader">To-Do List</div>
      <div className="header">Pending tasks ({tasksRemaining})</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            completeTask={completeTask}
            removeTask={removeTask}
            undoTask={undoTask}
            key={index}
          />
        ))}
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask} />
      </div>
      <div className="taskFooter">
        {" "}
        Designed and Developed by Rituparna Deva Sharma © {currentYear}
      </div>
    </div>
  );
}

export default ToDoList;
