let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.getElementById("tasks");
let clearBtn = document.querySelector(".clear");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks in LocalStorage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function 
getDataFromLocalStorage()

// Clear All Btn
clearBtn.onclick = function () {
    console.log("Clear All Successfully");
    arrayOfTasks = [];
    addElementsToPageFrom(arrayOfTasks);
    addDataToLocalStorageFrom(arrayOfTasks);
}

// Add Task
submit.onclick = function () {
    if(input.value !== "") {
        addTaskToArray(input.value); // Add Task To Array Of Tasks
        input.value = ""; // Empty Input Field
    }
    
} 

// Click on Task Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button 
    if (e.target.classList.contains("del")){
        // Remove Element From Page
        e.target.parentElement.remove();

        // Remove Task From Local Storge 
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        // console.log(e.target.parentElement.getAttribute("data-id"));
    }
    // Task Element
    if (e.target.classList.contains("task")); {
        // Toggle Done Class
        e.target.classList.toggle("done")

        // Toggle Completed For The Task 
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
    }
})

function addTaskToArray(taskText){
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false
    }
    
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    
    // Add Tasks To page
    addElementsToPageFrom(arrayOfTasks);

    // Add Tasks To Local Storage
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks){
    tasksDiv.innerHTML = "";
    crtona = ``
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].completed){
            crtona += `<div class="task done" 
            data-id="${arrayOfTasks[i].id}" 
            completed="${arrayOfTasks[i].completed}">
            ${arrayOfTasks[i].title} 
            <button class="del">Delete</button> </div>`
        }else{
            crtona += `<div class="task" 
            data-id="${arrayOfTasks[i].id}" 
            completed="${arrayOfTasks[i].completed}">
            ${arrayOfTasks[i].title} 
            <button class="del">Delete</button> </div>`
        }
    } tasksDiv.innerHTML = crtona;
};

function addDataToLocalStorageFrom(arrayOfTasks){
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage(){
    let data = localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(arrayOfTasks)
    }
}

function deleteTaskWith(taskId){
    // For Explain Only
    // for (i = 0; i < arrayOfTasks.length; i++){
    //     console.log(`${arrayOfTasks[i].id} === ${taskId}`);
    // }
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks)
}

function toggleStatusTaskWith(taskId){
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            if(arrayOfTasks[i].completed == false ){
                arrayOfTasks[i].completed = true
            }else{
                arrayOfTasks[i].completed = false
            }
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks)
}