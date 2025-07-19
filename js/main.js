document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const clearBtn = document.getElementById("clear-btn");
    const list = document.getElementById("todo-list");

    function saveTodos() {
        const todos = Array.from(list.children).map(li => li.childNodes[0].textContent);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

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

    const saved = JSON.parse(localStorage.getItem("todos") || "[]");
    saved.forEach(addTodo);

    addBtn.addEventListener("click", () => {
        const text = input.value.trim();
        if (text) {
            addTodo(text);
            saveTodos();
            input.value = "";
        }
    });

    clearBtn.addEventListener("click", () => {
        list.innerHTML = "";
        saveTodos();
    });
});


