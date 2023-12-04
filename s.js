document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = getTasksFromLocalStorage();
 
    tasks.forEach(function (task, index) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");
        taskItem.innerHTML = `
            <span>${task}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks;
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const newTaskInput = document.getElementById("newTask");
    const newTask = newTaskInput.value.trim();

    if (newTask !== "") {
        const tasks = getTasksFromLocalStorage();
        tasks.push(newTask);
        saveTasksToLocalStorage(tasks);
        newTaskInput.value = "";
        loadTasks();
    }
}

function editTask(index) {
    const tasks = getTasksFromLocalStorage();
    const updatedTask = prompt("Edit task:", tasks[index]);

    if (updatedTask !== null) {
        tasks[index] = updatedTask.trim();
        saveTasksToLocalStorage(tasks);
        loadTasks();
    }
}

function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    const isConfirmed = confirm("Are you sure you want to delete this task?");

    if (isConfirmed) {
        tasks.splice(index, 1);
        saveTasksToLocalStorage(tasks);
        loadTasks();
    }
}

function clearTasks() {
    const isConfirmed = confirm("Are you sure you want to clear all tasks?");
    
    if (isConfirmed) {
        localStorage.removeItem("tasks");
        loadTasks();
    }
}
