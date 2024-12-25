import React from "react";
import { useState, useEffect } from "react";
import Todo from "./components/Todo";

function App() {
  const [todoList, setTodoList] = useState(()=>{
    const localTodos = localStorage.getItem('todoList')
    return localTodos ? JSON.parse(localTodos) : []
  });

  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState("");

  useEffect(()=>{
    setStatus('all')
    localStorage.setItem('todoList',JSON.stringify(todoList))
  },[todoList])

  const handleChange = (e) => {
    console.log(e.target.value);
    setNewTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();

    if (newTask === "") {
      return null;
    }
    const newTodo = {
      id: todoList.length + 1,
      title: newTask,
      isComplete: "false",
    };

    setTodoList((prev) => {
      return [...todoList, newTodo];
    });

    setNewTask("");
    console.log("add");
  };

  const doneClickHandle = (todoId) => {
    let newTodoList = [...todoList];

    newTodoList.forEach((todo) => {
      if (todoId === todo.id) {
        todo.isComplete = !todo.isComplete;
      }
    });
    setTodoList(newTodoList);
    console.log(todoList);
  };

  const removeHandle = (removeId) => {
    setTodoList(todoList.filter((todo) => removeId !== todo.id));
  };

  const statusHandle = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  return (
    <div className="h-full">
      <header className="bg-gray-700 h-20 flex justify-between items-center p-5">
        <div className="">
          <h1 className="text-2xl text-white font-bold">Pouria Mobaraki</h1>
        </div>

        <div className="text-2xl text-yellow-200 font-extrabold">Todo List</div>
      </header>

      <main>
        <h1 className="flex justify-center items-center font-bold mt-3 text-black text-3xl">
          Todo-List
        </h1>

        <div className="flex justify-center items-center mx-auto mt-5">
          <input
            onChange={handleChange}
            type="text"
            value={newTask}
            placeholder="Enter your task..."
            className="flex justify-center items-center w-56 text-center rounded-lg bg-slate-300 h-16 mr-3"
          />
          <button
            onClick={addTask}
            className="flex items-center justify-center text-center h-16 bg-sky-700 rounded-lg px-4 text-white font-medium"
          >
            Add Task
          </button>
        </div>

        <div className="mb-10 mt-10 mx-auto flex justify-center items-center">
          <select
            onChange={statusHandle}
            name="todoList"
            className="rounded-sm w-1/6 bg-sky-300 mb-5 p-3"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>

        <section className="bg-gray-600 m-5 mt-7 mx-auto w-1/2 h-auto  rounded-lg p-5 ">
          {/* {
          todoList.map(todo=>(  <Todo
            key={todo.id}
            {...todo}
            onDone={doneClickHandle}
            onRemove={removeHandle}
          />))
        } */}

          {status === "all" &&
            todoList.map((todo) => (
              <Todo
                key={todo.id}
                {...todo}
                onDone={doneClickHandle}
                onRemove={removeHandle}
              />
            ))}

          {status === "completed" &&
            todoList
              .filter((todo) => !todo.isComplete)
              .map((todo) => (
                <Todo
                  key={todo.id}
                  {...todo}
                  onDone={doneClickHandle}
                  onRemove={removeHandle}
                />
              ))}

             {
              status === 'uncompleted' && todoList.filter(todo=>todo.isComplete).map(todo =>(
                <Todo
                key={todo.id}
                {...todo}
                onDone={doneClickHandle}
                onRemove={removeHandle}
              />
              ))
             }

        </section>
      </main>
    </div>
  );
}

export default App;
