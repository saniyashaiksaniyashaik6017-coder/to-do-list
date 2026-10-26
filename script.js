const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const clearCompletedButton = document.getElementById("clear-completed");

let tasks = [];

try {
  tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
} catch {
  tasks = [];
}

function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task${task.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark ${task.text} as completed`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const label = document.createElement("label");
    label.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((currentTask) => currentTask.id !== task.id);
      saveTasks();
      renderTasks();
    });

    item.append(checkbox, label, deleteButton);
    taskList.appendChild(item);
  });

  emptyMessage.hidden = tasks.length > 0;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();

  if (!text) return;

  tasks.push({
    id: `${Date.now()}-${Math.random()}`,
    text,
    completed: false
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

renderTasks();
