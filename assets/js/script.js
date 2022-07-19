var formEl = document.querySelector("#task-form");
var tasktoDoEl = document.getElementById("tasks-to-do");


var createTaskHandler= function(event){
    console.log(event);
    event.preventDefault();
    var taskItemEl = document.createElement("li");
    taskItemEl.className="task-item";
    taskItemEl.textContent="this is a new task";
    tasktoDoEl.appendChild(taskItemEl);
}


formEl.addEventListener("submit", createTaskHandler)


