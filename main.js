const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const list = document.getElementById("todo-list");

// 初始化加载
window.onload = function() {
  const saved = JSON.parse(localStorage.getItem("todos") || "[]");
  saved.forEach(addTodo);
};

// 添加新待办
addBtn.onclick = function() {
  const text = input.value.trim();
  if (text) {
    addTodo(text);
    saveTodos();
    input.value = "";
  }
};

// 清空全部
clearBtn.onclick = function() {
  list.innerHTML = "";
  saveTodos();
};

// 新增单个项
function addTodo(text) {
  const li = document.createElement("li");
  li.textContent = text;

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.style.marginLeft = "10px";
  delBtn.onclick = function (e) {
    e.stopPropagation();
    li.remove();
    saveTodos();
  };

  li.appendChild(delBtn);
  list.appendChild(li);
}

// 保存到本地
function saveTodos() {
  const todos = Array.from(list.children).map(li => li.childNodes[0].textContent);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// 监听输入框回车事件
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addBtn.click();
  }
});