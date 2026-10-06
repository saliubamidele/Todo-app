'use strict';

let username = document.querySelector('.Username')
let icon = document.querySelector('.profile-icon')
let tast_container = document.querySelector('.task-item')
let Total = document.querySelector('#Total')
let pending = document.querySelector('#pending')
let completed = document.querySelector('#completed')



const Active_user = JSON.parse(localStorage.getItem('Active_user')) ?? []
const Todolist = JSON.parse(localStorage.getItem('Todolists')) ?? [];


Todolist.forEach(function(task){
    let status = ''
   if(task.status === 'pending'){
    status = 'pending-status'
   }else if(task.status === 'completed'){
    status = 'completed-status'
   }else if(task.status === 'in-progress'){
    status = 'in-progress-status'
   }else if(task.status === 'overdue'){
    status = 'overdue-status'
   }else{
    status = 'pending-status'
   }


    let html = ` 
    <div class="task-item">

            <div class="task-info">

              <h3>${task.title}</h3>

              <p class="task-description">
                ${task.description}
              </p>

              <div class="task-details">
                <span class="priority ${task.priority.toLowerCase()}"> Priority: ${task.priority} </span>

                <span class="task-status ${status}">
                  Status: ${task.status}    
                </span>

                <span> Category: ${task.category} </span>

                <span> Due Date: ${task.dueDate} </span>

                <span> Due Time: ${task.dueTime} </span>
              </div>

            </div>

          </div> `
          tast_container.insertAdjacentHTML('beforeend', html)

});


Total.textContent = Todolist.length

let pendingTasks = Todolist.filter(function(task){
    return task.status === 'pending'
})
pending.textContent = pendingTasks.length

let completedTasks = Todolist.filter(function(task){
    return task.status === 'completed'
})  
completed.textContent = completedTasks.length


username.textContent = Active_user.email
icon.textContent = Active_user.name.charAt(0).toUpperCase()
