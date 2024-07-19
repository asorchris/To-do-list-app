const tasks = [];
const taskDescriptionInput = document.getElementById("NewTask");
const Button = document.getElementById("Button");
const Emptytask = document.getElementById("Emptytask");
const markAllasCompletedBtn = document.getElementById("mark-all-as-completed");

// Button.addEventListener('click', addTask);

function addTask() {
    const taskDescription = taskDescriptionInput.value;

    if (taskDescription === "") {
        alert("Task description cannot be empty!");
        return;
    }

    const newTask = {
        taskDescription: taskDescription,
        completed: false,
        subTasks: []
    };

    tasks.push(newTask);
    displayTasks();
    taskDescriptionInput.value = "";
}

function displayTasks() {
    const TaskList = document.getElementById("tasks");
    TaskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const parentTask = document.createElement("ul");
        parentTask.textContent = task.taskDescription;
        parentTask.className = "parent-task";

        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.className = 'delete-btn';
        removeButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            displayTasks();
        });

        // Add completed button
        const completedButton = document.createElement('button');
        completedButton.textContent = task.completed ? 'Completed' : 'Mark as Complete';
        completedButton.className = task.completed ? 'completed' : 'not-completed';
        completedButton.addEventListener('click', () => {
            task.completed = !task.completed;
             if (task.completed) {
                task.subTasks.forEach(subTask => subTask.completed = true);
            }

            displayTasks();
        });

        // Add sub-task button
        const subtaskButton = document.createElement('button');
        subtaskButton.textContent = 'Add sub-task';
        subtaskButton.className = 'sub-task-button';
        subtaskButton.addEventListener('click', () => {
            const subTaskContent = prompt("Enter your sub-task");
            if (subTaskContent) {
                const newSubTask = {
                    subTaskDescription: subTaskContent,
                    completed: false
                };
                task.subTasks.push(newSubTask);
                displayTasks();
            }
        });

        parentTask.appendChild(removeButton);
        parentTask.appendChild(completedButton);
        parentTask.appendChild(subtaskButton);

        // Display sub-tasks
        const subTaskList = document.createElement('ul');
        task.subTasks.forEach((subTask, subIndex) => {
            const subTaskItem = document.createElement('li');
            subTaskItem.textContent = subTask.subTaskDescription;
            subTaskItem.className = 'sub-task';

            // Add mark as complete button for sub-task
            const subTaskCompleteButton = document.createElement('button');
            subTaskCompleteButton.textContent = subTask.completed ? 'Completed' : 'Mark as Complete';
            subTaskCompleteButton.className = subTask.completed ? 'sub-completed' : 'sub-not-completed';
            subTaskCompleteButton.addEventListener('click', () => {
                subTask.completed = !subTask.completed;
                displayTasks();
            });

            subTaskItem.appendChild(subTaskCompleteButton);
            subTaskList.appendChild(subTaskItem);
        });

        parentTask.appendChild(subTaskList);
        TaskList.appendChild(parentTask);
    });

    if (tasks.length > 0) {
        Emptytask.style.display = 'none';
    } else {
        Emptytask.style.display = 'block';
    }
}

// Mark all as completed
markAllasCompletedBtn.addEventListener('click', () => {
    tasks.forEach((task) => {
        task.completed = true;
    });
    displayTasks();
});

// Delete all tasks on the task listgit 
const deleteAll = () => {
    tasks.splice(0, tasks.length);
    displayTasks();
};
