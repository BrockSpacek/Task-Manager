function saveToLocalStorage(task){

    let taskArr = getFromLocalStorage();

    if(!taskArr.includes(task)){
        taskArr.push(task);
    }

    localStorage.setItem('task', JSON.stringify(taskArr));

}

function getFromLocalStorage(){
    let localStorageData = localStorage.getItem('task');

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(task){

    let localStorageData = getFromLocalStorage();

    let taskIndex = localStorageData.indexOf(task);

    localStorageData.splice(taskIndex, 1);

    localStorage.setItem('task', JSON.stringify(localStorageData));
}



export{ saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage }