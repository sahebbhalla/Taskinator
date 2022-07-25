var tasks=[];
var taskIdCounter =0 ;
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasktoDoEl = document.getElementById("tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var statusChoices = ["To Do", "In Progress", "Completed"];

var taskAction = function(taskId,listItemEl){

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent ="Edit";
    editButtonEl.className="btn edit-btn"
    editButtonEl.setAttribute("data-task-id",taskId);
    actionContainerEl.appendChild(editButtonEl);   

    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent="Delete";
    deleteButtonEl.className = "btn delete-btn"
    deleteButtonEl.setAttribute("data-task-id",taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = createTaskAction(taskId);
    actionContainerEl.appendChild(statusSelectEl);
    listItemEl.appendChild(actionContainerEl);
}
var completeEditTask = function(taskName, taskType, taskId) {
    console.log(taskName, taskType, taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.querySelector("h3.task-name").textContent= taskName;
    taskSelected.querySelector("span.task-type").textContent=taskType;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
          tasks[i].name = taskName;
          tasks[i].type = taskType;
        }
      };
      saveTasks();
    formEl.removeAttribute("data-task-id");
  
    document.querySelector("#save-task").textContent = "Add Task";
  };
var taskFormHandler= function(event){

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    var isEdit = formEl.hasAttribute("data-task-id");
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
      } 
      // no data attribute, so create object as normal and pass to createTaskEl function
      else {
        var taskDataObj = {
          name: taskNameInput,
          type: taskTypeInput,
          status:"to do"
        };
      
        createTaskEl(taskDataObj);
        }
        console.log(taskDataObj);
        formEl.reset();
    }


var createTaskEl = function(taskDataObj) {
    
    var listItemEl = document.createElement("li");
    listItemEl.className="task-item";
    listItemEl.setAttribute('data-task-id',taskIdCounter);
    
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className="task-info";
    taskInfoEl.innerHTML="<h3 class='task-name'>"+taskDataObj.name+"</h3><span class='task-type'>"+taskDataObj.type+"</span>";
    
    
    listItemEl.appendChild(taskInfoEl);
    tasktoDoEl.appendChild(listItemEl);
    taskDataObj.id=taskIdCounter;
    tasks.push(taskDataObj);

    taskAction(taskIdCounter,listItemEl);
    saveTasks();
    taskIdCounter++;

}
var deleTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
    updatedTaskArr.push(tasks[i]);
  }
 
}

// reassign tasks array to be the same as updatedTaskArr
tasks = updatedTaskArr;
saveTasks();
}
var editTask = function(taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id",taskId);
};
var taskButtonHandler = function(event) {
    var targetEl = event.target;
    if (event.target.matches(".delete-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleTask(taskId);
      }
      if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
      } 
  };
var taskStatusChangeHandler = function(event){
    var taskId= event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();

    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
          tasks[i].status = statusValue;
        }
    };
    saveTasks();
}
var saveTasks = function(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
var createTaskAction=function(taskId){
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return statusSelectEl;
}
var loadTasks = function(){
    tasks= localStorage.getItem("tasks")
    tasks=JSON.parse(tasks);
    if(tasks==null){
        tasks=[];
        return false;
    }
  
    for(var i=0;i<tasks.length;i++){
        tasks[i].id =taskIdCounter;
       
        var listEl = document.createElement("li");
        listEl.className="task-item";
        listEl.setAttribute("data-task-id",tasks[i].id);
        console.log(listEl);
        var taskInfoEl = document.createElement("div");
        taskInfoEl.className ="task-info";
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
        listEl.appendChild(taskInfoEl);
        var taskActionEl = taskAction(tasks[i].id,listEl);
       
        if(tasks[i].status == "to do"){
            listEl.querySelector("select[name='status-change']").selectedIndex=0;
            tasktoDoEl.appendChild(listEl);
        }
        else if(tasks[i].status == "in progress"){
            listEl.querySelector("select[name='status-change']").selectedIndex=1;
            tasksInProgressEl.appendChild(listEl);
        }
        else if(tasks[i].status == "completed"){
            listEl.querySelector("select[name='status-change']").selectedIndex=2;
            tasksCompletedEl.appendChild(listEl);
        }
        console.log(listEl);
        taskIdCounter++;
    
    }
}
formEl.addEventListener("submit", taskFormHandler)
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change",taskStatusChangeHandler);
loadTasks();
