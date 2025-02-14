import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './localstorage.js';

// IDs
const addTaskBtn = document.getElementById("addTaskBtn");
const toDoCard = document.getElementById("toDoCard");
const inProgressCard = document.getElementById("inProgressCard");
const completedCard = document.getElementById("completedCard");
const taskPopup = document.getElementById("taskPopup")

const saveTaskBtn = document.getElementById("saveTaskBtn");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
let taskNameInput = document.getElementById("taskNameInput");
let taskDescriptionInput = document.getElementById("taskDescriptionInput");
let taskPriorityInput = document.getElementById("taskPriorityInput");
let taskDateInput = document.getElementById("taskDateInput");




addTaskBtn.addEventListener('click', () => {
    taskPopup.classList.remove('hidden')
});

cancelTaskBtn.addEventListener('click', () => {
    taskPopup.classList.add('hidden');
})


saveTaskBtn.addEventListener('click', () => {
    let name = taskNameInput.value
    let description = taskDescriptionInput.value
    let priority = taskPriorityInput.value
    let date = taskDateInput.value

    if (name && description && priority && date) {
        let task = { name, description, priority, date };
        saveToLocalStorage(task);

        // displayTasks();
        taskPopup.classList.add('hidden');
        taskNameInput.value = '';
        taskDescriptionInput.value = '';
        taskPriorityInput.value = '';
        taskDateInput.value = '';
    }
});