import Todo from "./todo.js";
//global variables
const newItemBtn = document.querySelector("#newItemBtn");
const taskList = document.querySelector(".taskList");
// event handlers
function makeNewTodo() {
    const todoTitle = document.querySelector("#textForNewTodo");
    if (!todoTitle) return;
    const newTodo = new Todo(todoTitle.value, taskList);
    todoTitle.value = "";
}

//event listeners
newItemBtn.addEventListener("click", makeNewTodo);
