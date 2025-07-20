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

    let saved = JSON.parse(localStorage.getItem("todos") || "[]");

    // 如果没有数据，自动添加默认项
    if (saved.length === 0) {
        saved = ["to do a small project"];
    }
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
});document.getElementById('



