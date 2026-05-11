

const taskInput = document.getElementById('taskInput');
const category = document.getElementById('category');
const priority = document.getElementById('priority');
const dueDate = document.getElementById('dueDate');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const filterTasks = document.getElementById('filterTasks');
const progressBar = document.getElementById('progressBar');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  if(taskInput.value.trim() === '') return;

  const task = {
    id: Date.now(),
    text: taskInput.value,
    category: category.value,
    priority: priority.value,
    dueDate: dueDate.value,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = '';
}

function renderTasks() {
  taskList.innerHTML = '';

  let filteredTasks = tasks.filter(task => {

    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());

    const matchesFilter =
      filterTasks.value === 'all' ||
      (filterTasks.value === 'completed' && task.completed) ||
      (filterTasks.value === 'pending' && !task.completed);

    return matchesSearch && matchesFilter;
  });

  filteredTasks.forEach(task => {

    const li = document.createElement('li');
    li.className = `task-card ${task.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox"
          ${task.completed ? 'checked' : ''}
          onchange="toggleTask(${task.id})">

        <div class="task-info">
          <h3>${task.text}</h3>
          <p>
            ${task.category} • Due: ${task.dueDate || 'No date'}
          </p>
        </div>
      </div>

      <div class="action-btns">
        <span class="priority ${task.priority.toLowerCase()}">
          ${task.priority}
        </span>

        <button class="edit-btn"
          onclick="editTask(${task.id})">
          Edit
        </button>

        <button class="delete-btn"
          onclick="deleteTask(${task.id})">
          Delete
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? {...task, completed: !task.completed}
      : task
  );

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);

  const updatedText = prompt('Edit task:', task.text);

  if(updatedText !== null) {
    task.text = updatedText;
    saveTasks();
    renderTasks();
  }
}

function updateStats() {

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  document.getElementById('totalTasks').innerText = total;
  document.getElementById('completedTasks').innerText = completed;
  document.getElementById('pendingTasks').innerText = pending;

  const progress = total === 0
    ? 0
    : (completed / total) * 100;

  progressBar.style.width = `${progress}%`;
}

searchInput.addEventListener('input', renderTasks);
filterTasks.addEventListener('change', renderTasks);

const themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});
