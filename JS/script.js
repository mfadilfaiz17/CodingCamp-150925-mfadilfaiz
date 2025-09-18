const addBtn = document.getElementById("addBtn");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const todoBody = document.getElementById("todoBody");

let todos = [];

function renderTodos(list = todos) {
  todoBody.innerHTML = "";
  if (list.length === 0) {
    todoBody.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
    return;
  }
  list.forEach((todo, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td class="${todo.done ? 'status-done' : ''}">
        ${todo.done ? 'Done' : 'Pending'}
      </td>
      <td>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    todoBody.appendChild(tr);
  });
}

function validateForm(task, date) {
  if (!task.trim()) {
    alert("Task is required");
    return false;
  }
  if (!date) {
    alert("Date is required");
    return false;
  }
  return true;
}

addBtn.addEventListener("click", () => {
  const task = taskInput.value;
  const date = dateInput.value;
  if (!validateForm(task, date)) return;
  todos.push({ task, date, done: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
});

filterBtn.addEventListener("click", () => {
  const today = new Date().toISOString().split("T")[0];
  const filtered = todos.filter(t => t.date === today);
  renderTodos(filtered);
});

deleteAllBtn.addEventListener("click", () => {
  if (confirm("Delete all tasks?")) {
    todos = [];
    renderTodos();
  }
});

function deleteTask(index) {
  todos.splice(index, 1);
  renderTodos();
}

renderTodos();
