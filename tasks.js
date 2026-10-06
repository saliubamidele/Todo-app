'use strict';

const taskForm = document.querySelector('.task-form');
const taskTitle = document.querySelector('#task-title');
const taskDescription = document.querySelector('#task-description');        
const cointainer = document.querySelector('.tasks-list');

// Select Filter Elements (Matches your filter HTML)
const searchInput = document.querySelector('.task-search input');
const statusFilter = document.querySelector('.task-controls select:nth-of-type(1)');
const priorityFilter = document.querySelector('.task-controls select:nth-of-type(2)');

// Track which task index is currently being edited (-1 means creating a new task)
let editIndex = -1; 

// Main function to display all tasks and wire up actions
function renderTasks() {
  const allTasks = JSON.parse(localStorage.getItem('Todolists')) ?? [];
  cointainer.innerHTML = ''; 

  // Get active filter inputs
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const selectedStatus = statusFilter ? statusFilter.value : '';
  const selectedPriority = priorityFilter ? priorityFilter.value : '';

  // 1. Map to preserve original index, then filter the items
  const filteredTasks = allTasks
    .map((task, originalIndex) => ({ ...task, originalIndex }))
    .filter(function(task) {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm) || 
                            task.description.toLowerCase().includes(searchTerm);
      const matchesStatus = selectedStatus === '' || task.status === selectedStatus;
      const matchesPriority = selectedPriority === '' || task.priority === selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

  // 2. Render out only the filtered list
  filteredTasks.forEach(function(task){
    const statusClasses = { 'pending': 'pending-status', 'completed': 'completed-status', 'in-progress': 'in-progress-status', 'overdue': 'overdue-status' };
    let status = statusClasses[task.status] || 'pending-status';

    const Html = `
      <div class="task-card ${status}">
        <div class="task-check">
          <!-- Added data-index to track checkbox changes -->
          <input type="checkbox" data-index="${task.originalIndex}" ${task.status === 'completed' ? 'checked' : ''}>
        </div>
        <div class="task-info">
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <div class="task-meta">
            <span class="priority ${task.priority}">${task.priority}</span>
            <span>${task.category}</span>
            <span>Due: ${task.dueDate}</span>
          </div>
        </div>
        <div class="task-status">
          <select data-index="${task.originalIndex}">
            <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
            <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
          </select>
        </div>
        <div class="task-actions">
          <button class="edit-btn" data-index="${task.originalIndex}">Edit</button>
          <button class="delete-btn" data-index="${task.originalIndex}">Delete</button>
        </div>
      </div>
    `;
    cointainer.insertAdjacentHTML('beforeend', Html);
  });

  // Wire up Edit buttons
  document.querySelectorAll('.edit-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      editIndex = e.target.dataset.index; // Secure index retrieved safely here
      
      let currentList = JSON.parse(localStorage.getItem('Todolists')) ?? [];
      let task = currentList[editIndex];

      taskTitle.value = task.title;
      taskDescription.value = task.description;

      const submitBtn = taskForm.querySelector('button[type="submit"]') || taskForm.querySelector('button');
      if (submitBtn) submitBtn.textContent = 'Update Task';
    });
  });

  // Wire up Delete buttons 
  document.querySelectorAll('.delete-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      let taskIndex = e.target.dataset.index;
      
      let currentList = JSON.parse(localStorage.getItem('Todolists')) ?? [];
      currentList.splice(taskIndex, 1); 
      localStorage.setItem('Todolists', JSON.stringify(currentList)); 
      
      renderTasks(); 
    });
  });

  // Wire up Status Dropdown updates
  document.querySelectorAll('.task-status select').forEach(function(dropdown) {
    dropdown.addEventListener('change', function(e) {
      let taskIndex = e.target.dataset.index;
      let newStatus = e.target.value;

      let currentList = JSON.parse(localStorage.getItem('Todolists')) ?? [];
      currentList[taskIndex].status = newStatus; 
      localStorage.setItem('Todolists', JSON.stringify(currentList));

      renderTasks(); 
    });
  });

  // Wire up Checkbox updates (Toggles status between completed and pending)
  document.querySelectorAll('.task-check input').forEach(function(checkbox) {
    checkbox.addEventListener('change', function(e) {
      let taskIndex = e.target.dataset.index;
      let isChecked = e.target.checked;

      let currentList = JSON.parse(localStorage.getItem('Todolists')) ?? [];
      currentList[taskIndex].status = isChecked ? 'completed' : 'pending';
      localStorage.setItem('Todolists', JSON.stringify(currentList));

      renderTasks();
    });
  });
}

// Handle Form Submission (Both for Creating and Updating tasks)
if (taskForm) {
  taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let currentList = JSON.parse(localStorage.getItem('Todolists')) ?? [];

    if (editIndex > -1) {
      // Edit mode
      currentList[editIndex].title = taskTitle.value;
      currentList[editIndex].description = taskDescription.value;
      
      editIndex = -1; // Reset tracking index back to creation mode
      const submitBtn = taskForm.querySelector('button[type="submit"]') || taskForm.querySelector('button');
      if (submitBtn) submitBtn.textContent = 'Add Task';
    } else {
      // Creation mode
      const newTask = {
        title: taskTitle.value,
        description: taskDescription.value,
        status: 'pending',
        priority: 'low',
        category: 'General',
        dueDate: new Date().toLocaleDateString() 
      };
      currentList.push(newTask);
    }

    localStorage.setItem('Todolists', JSON.stringify(currentList));
    taskForm.reset(); 
    renderTasks(); 
  });
}

// Listeners to live-trigger filtering when inputs change
if (searchInput) searchInput.addEventListener('input', renderTasks);
if (statusFilter) statusFilter.addEventListener('change', renderTasks);
if (priorityFilter) priorityFilter.addEventListener('change', renderTasks);

// Initial draw when the dashboard loads
renderTasks();
