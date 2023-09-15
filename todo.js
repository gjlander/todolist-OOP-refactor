// Each todo is an object, I want the functions from each part of the todo to be a method on the object
export default class Todo {
    constructor(title, done, domContainer) {
        this.title = title;
        this.done = done;
        this.container = domContainer;
        this.init();
    }
    init() {
        const li = document.createElement("li");
        li.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "gap-1"
        );
        const leftWrapper = document.createElement("div");
        leftWrapper.classList.add("d-flex", "me-auto");

        const checkDoneBox = document.createElement("input");
        checkDoneBox.classList.add("form-check-input", "me-1", "checkDone");
        checkDoneBox.setAttribute("type", "checkbox");
        checkDoneBox.addEventListener("click", () => {
            const storedTodos = localStorage.getItem("todos");
            if (storedTodos) {
                const todos = JSON.parse(storedTodos);
                todos.forEach((todo) => {
                    if (todo.title === todoText.textContent) {
                        todo.done = !todo.done;
                    }
                });
                localStorage.setItem("todos", JSON.stringify(todos));
            }
            todoText.classList.toggle("done");
        });

        const todoText = document.createElement("label");
        todoText.textContent = `${this.title}`;
        todoText.classList.add("form-check-label", "todoText");
        if (this.done) {
            checkDoneBox.setAttribute("checked", true);
            todoText.classList.add("done");
        }

        leftWrapper.appendChild(checkDoneBox);
        leftWrapper.appendChild(todoText);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("btn", "btn-success");
        editBtn.addEventListener("click", (e) => {
            const inputWrapper = document.createElement("div");
            inputWrapper.classList.add("input-group");

            const editInput = document.createElement("input");
            editInput.classList.add("form-control");
            editInput.setAttribute("type", "text");
            let textValue =
                e.target.previousElementSibling.lastElementChild.textContent;
            editInput.setAttribute("value", `${textValue}`);
            const confirmBtn = document.createElement("button");
            confirmBtn.classList.add("btn", "btn-success");
            confirmBtn.setAttribute("type", "submit");
            confirmBtn.textContent = "Confirm";
            confirmBtn.addEventListener("click", () => {
                //localstorage
                const storedTodos = localStorage.getItem("todos");
                if (storedTodos) {
                    const todos = JSON.parse(storedTodos);
                    todos.forEach((todo) => {
                        if (todo.title === todoText.textContent) {
                            todo.title = editInput.value;
                        }
                    });
                    localStorage.setItem("todos", JSON.stringify(todos));
                }
                this.title = editInput.value;
                todoText.textContent = `${this.title}`;
                console.log("after", this.title);

                leftWrapper.classList.remove("d-none");
                inputWrapper.remove();
            });

            const cancelBtn = document.createElement("button");
            cancelBtn.classList.add("btn", "btn-danger");
            cancelBtn.setAttribute("type", "submit");
            cancelBtn.textContent = "Cancel";
            cancelBtn.addEventListener("click", () => {
                leftWrapper.classList.remove("d-none");
                inputWrapper.remove();
            });

            inputWrapper.appendChild(editInput);
            inputWrapper.appendChild(confirmBtn);
            inputWrapper.appendChild(cancelBtn);

            leftWrapper.classList.add("d-none");
            li.prepend(inputWrapper);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.addEventListener("click", (e) => {
            const storedTodos = localStorage.getItem("todos");
            if (storedTodos) {
                const todos = JSON.parse(storedTodos);
                todos.forEach((todo, i) => {
                    if (todo.title === this.title) {
                        todos.splice(i, 1);
                    }
                });
                localStorage.setItem("todos", JSON.stringify(todos));
                if (todos.length === 0) {
                    localStorage.removeItem("todos");
                }
            }
            e.target.parentElement.remove();
        });

        li.appendChild(leftWrapper);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        this.container.appendChild(li);
    }
}
