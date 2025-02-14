




addTaskBtn.addEventListener('click', () => {
    budgetPopup.classList.remove('hidden')
});


saveTaskBtn.addEventListener('click', () => {
    let Name = nameInput.value;
    if (Name) {
        saveToLocalStorage(Name);
        nameInput.value = '';
        displayNames();
    }
});