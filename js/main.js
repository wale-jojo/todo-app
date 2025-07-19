const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const list = document.getElementById("todo-list");

window.onload = () => {
    const saved = JSON.parse(localStorage.getItem("todos") || "[]");
    saved.forEach(addTodo);
};

addBtn.onclick = () => {
    const text = input.value.trim();
    if (text) {
        addTodo(text);
        saveTodos();
        input.value = "";
    }
};

clearBtn.onclick = () => {
    list.innerHTML = "";
    saveTodos();
};

function addTodo(text) {
    const li = document.createElement("li");
    li.textContent = text;
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
        saveTodos();
    };
    li.appendChild(delBtn);
    list.appendChild(li);
}

function saveTodos() {
    const todos = Array.from(list.children).map(li => li.childNodes[0].textContent);
    localStorage.setItem("todos", JSON.stringify(todos));
}
