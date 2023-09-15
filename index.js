import Todo from "./todo.js";
//global variables
const newItemBtn = document.querySelector("#newItemBtn");
const taskList = document.querySelector(".taskList");
// event handlers
function loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (!storedTodos) return;
    const parseTodos = JSON.parse(storedTodos);
    parseTodos.forEach((todo) => {
        console.log(todo.done);
        const newTodo = new Todo(todo.title, todo.done, taskList);
    });
}
loadTodos();

function makeNewTodo(e) {
    e.preventDefault();
    const todoTitle = document.querySelector("#textForNewTodo");
    if (!todoTitle.value) return;
    const newTodo = new Todo(todoTitle.value, false, taskList);

    const storedTodos = localStorage.getItem("todos");
    const todos = JSON.parse(storedTodos) || [];
    todos.push(newTodo);
    //add to local storage
    localStorage.setItem("todos", JSON.stringify(todos));

    todoTitle.value = "";
}

//event listeners
newItemBtn.addEventListener("click", makeNewTodo);
