'use strict';

const taskForm = document.querySelector('.task-form');
const taskTitle = document.querySelector('#task-title');
const taskDescription = document.querySelector('#task-description');
const priority = document.querySelector('#priority');
const category = document.querySelector('#category');
const dueDate = document.querySelector('#due-date');
const dueTime = document.querySelector('#due-time');
const cancelButton = document.querySelector('.cancel-btn');
const addTaskButton = document.querySelector('.save-task-btn');



const Todolist = [];



// create a todolist object

addTaskButton.addEventListener('click', function(e){
    e.preventDefault();
    let task = {
        title: taskTitle.value,
        description: taskDescription.value,
        priority: priority.value,
        category: category.value,
        dueDate: dueDate.value,
        dueTime: dueTime.value,
        status: 'pending'
    }



    Todolist.push(task);
    localStorage.setItem('Todolists', JSON.stringify(Todolist));
    taskForm.reset();
    alert('Task added successfully!');
    window.location.href = 'dashboard.html';
});








// cancel button functionality
cancelButton.addEventListener('click', function(e){
    e.preventDefault();
    taskForm.reset();
    window.location.href = 'dashboard.html';
});
