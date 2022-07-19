var buttonEl = document.querySelector("#save-task");
var tasktoDoEl = document.getElementById("tasks-to-do");


var createTaskHandler= function(){
    var taskItemEl = document.createElement("li");
    taskItemEl.className="task-item";
    taskItemEl.textContent="this is a new task";
    tasktoDoEl.appendChild(taskItemEl);
}


buttonEl.addEventListener("click", createTaskHandler)


