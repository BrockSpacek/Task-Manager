// app.js
import {
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
  } from "./localstorage.js";
  
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
    let priority = taskPriorityInput.value.toLowerCase();
    let date = taskDateInput.value;
  
    if (name && description && priority && date) {
      if (priority != "low" || priority != "medium" || priority != "high") {
        alert('Priority must be low, medium, or high');
        return;
      }
  
      let task = { 
        name, 
        description, 
        priority, 
        date,
        status: 'todo' 
      };
  
      let tasks = getFromLocalStorage();
      
      if (editingTaskIndex !== null) {
        
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




  function deleteTask(index) {
    let tasks = getFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(tasks));
    displayTasks();
  }