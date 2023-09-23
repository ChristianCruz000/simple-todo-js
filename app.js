// SELECTORS ----------------------------------------------------

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EVENT LISTENERS -----------------------------------------------

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// FUNCTIONS -----------------------------------------------------

// Function for adding task:
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Add todo to localstorage
  saveLocalTodos(todoInput.value);

  //Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="bi bi-check-circle"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Trashcan Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="bi bi-trash3"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append to list
  todoList.appendChild(todoDiv);

  //Clear input value
  todoInput.value = "";
}

// Function for deleting task:
function deleteCheck(event) {
  const item = event.target;
  // DELETE Todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    item.classList.add("green-check");
  }
}

// Function for filtering tasks:
function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Function for saving todos to local storage
// see line 32
function saveLocalTodos(todo) {
  // Check if there's already a todo
  // if so, parse it back into array
  // if not, create empty array
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // If we have an array, push new todo to it:
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // Check if there's already a todo
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="bi bi-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Trashcan Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="bi bi-trash3"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Check if there's already a todo
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
