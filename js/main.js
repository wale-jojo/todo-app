document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const clearBtn = document.getElementById("clear-btn");
    const list = document.getElementById("todo-list");

    function saveTodos() {
        const todos = Array.from(list.children).map(li => ({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function addTodo(text, completed = false) {
        const li = document.createElement("li");
        li.textContent = text;
        if (completed) li.classList.add('completed');

        li.addEventListener("click", () => {
            li.classList.toggle('completed');
            saveTodos();
        });

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
    if (saved.length === 0) {
        saved = [{ text: "to do a small project", completed: false }];
    }
    saved.forEach(item => addTodo(item.text, item.completed));

    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
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

    document.getElementById("todo-form").addEventListener("submit", function(e) {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            addTodo(text);
            saveTodos();
            input.value = "";
        }
    });
});
