
import {  saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage} from "./localstorage.js";
  
  // IDs
  const addTaskBtn = document.getElementById("addTaskBtn");
  const toDoCard = document.getElementById("toDoCard");
  const inProgressCard = document.getElementById("inProgressCard");
  const completedCard = document.getElementById("completedCard");
  const taskPopup = document.getElementById("taskPopup");
  
  const saveTaskBtn = document.getElementById("saveTaskBtn");
  const cancelTaskBtn = document.getElementById("cancelTaskBtn");
  let taskNameInput = document.getElementById("taskNameInput");
  let taskDescriptionInput = document.getElementById("taskDescriptionInput");
  let taskPriorityInput = document.getElementById("taskPriorityInput");
  let taskDateInput = document.getElementById("taskDateInput");
  
  let editingTaskIndex = null;
  
  addTaskBtn.addEventListener("click", () => {
    editingTaskIndex = null;
    taskPopup.classList.remove("hidden");
  });
  
  cancelTaskBtn.addEventListener("click", () => {
    taskPopup.classList.add("hidden");
    clearInputs();
  });
  
  saveTaskBtn.addEventListener("click", () => {
    let name = taskNameInput.value;
    let description = taskDescriptionInput.value;
    let priority = taskPriorityInput.value
    let date = taskDateInput.value;
  
    if (name && description && priority && date) {
     
      let tasks = getFromLocalStorage();
      
      let task = { 
        name, 
        description, 
        priority, 
        date,
        status: 'todo' 
      };
  
      if (editingTaskIndex !== null) {
        
        task.status = tasks[editingTaskIndex].status;
        tasks[editingTaskIndex] = task;
      } else {
        tasks.push(task);
      }
  
      localStorage.setItem('task', JSON.stringify(tasks));
      displayTasks();
      taskPopup.classList.add("hidden");
      clearInputs();
    }
  });
  
  function clearInputs() {
    taskNameInput.value = "";
    taskDescriptionInput.value = "";
    taskPriorityInput.value = "";
    taskDateInput.value = "";
    editingTaskIndex = null;
  }
  
  function createTaskElement(task, index) {
    let taskItemMain = document.createElement("div");
    taskItemMain.className = "bg-white text-white p-4 rounded-lg w-[300px] border mb-2";
  
  
    let taskContent = document.createElement("div");
    taskContent.className = "space-y-2";
  
    let name = document.createElement("h3");
    name.className = "font-bold text-lg text-black";
    name.textContent = task.name;
  
    let description = document.createElement("p");
    description.className = "text-sm text-black";
    description.textContent = task.description;
  
    let priority = document.createElement("div");
    priority.className = "text-sm text-black";
    priority.textContent = `Priority: ${task.priority}`;
  
    let date = document.createElement("div");
    date.className = "text-sm text-black";
    date.textContent = `Due: ${task.date}`;
  
    
    let buttonContainer = document.createElement("div");
    buttonContainer.className = "flex gap-2 mt-4";
  
    
    if (!task.status || task.status === 'todo') {
      let startBtn = document.createElement("button");
      startBtn.textContent = "Start";
      startBtn.className = "bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm";
      startBtn.addEventListener("click", () => {
        moveToInProgress(index);
      });
      buttonContainer.appendChild(startBtn);
    }
  
    
    if (task.status === 'inprogress') {
      let completeBtn = document.createElement("button");
      completeBtn.textContent = "Complete";
      completeBtn.className = "bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm";
      completeBtn.addEventListener("click", () => {
        moveToCompleted(index);
      });
      buttonContainer.appendChild(completeBtn);
    }
  
    
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm";
    editBtn.addEventListener("click", () => {
      editTask(index);
    });
  
    
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm";
    deleteBtn.addEventListener("click", () => {
      deleteTask(index);
    });
  
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
  
    
    taskContent.appendChild(name);
    taskContent.appendChild(description);
    taskContent.appendChild(priority);
    taskContent.appendChild(date);
    taskContent.appendChild(buttonContainer);
    taskItemMain.appendChild(taskContent);
  
    return taskItemMain;
  }
  
  function moveToInProgress(index) {
    let tasks = getFromLocalStorage();
    tasks[index].status = 'inprogress';
    localStorage.setItem('task', JSON.stringify(tasks));
    displayTasks();
  }
  
  function moveToCompleted(index) {
    let tasks = getFromLocalStorage();
    tasks[index].status = 'completed';
    localStorage.setItem('task', JSON.stringify(tasks));
    displayTasks();
  }
  
  function editTask(index) {
    let tasks = getFromLocalStorage();
    let task = tasks[index];
    
    taskNameInput.value = task.name;
    taskDescriptionInput.value = task.description;
    taskPriorityInput.value = task.priority;
    taskDateInput.value = task.date;
    
    editingTaskIndex = index;
    taskPopup.classList.remove("hidden");
  }
  
  function deleteTask(index) {
    let tasks = getFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(tasks));
    displayTasks();
  }
  
  function displayTasks() {
    let tasks = getFromLocalStorage();
    
    toDoCard.innerHTML = "";
    inProgressCard.innerHTML = "";
    completedCard.innerHTML = "";
  
    
    tasks.forEach((task, index) => {
      const taskElement = createTaskElement(task, index);
      
      if (task.status === 'inprogress') {
        inProgressCard.appendChild(taskElement);
      } else if (task.status === 'completed') {
        completedCard.appendChild(taskElement);
      } else {
        toDoCard.appendChild(taskElement);
      }
    });
  }
  
  
  displayTasks();
