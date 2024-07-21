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
        const parentTaskContent = document.createElement("span");
        parentTaskContent.textContent = task.taskDescription;
        parentTask.className = "parent-task";
        parentTaskContent.className = "parent-task-content";

        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.className = 'delete-btn';
        removeButton.addEventListener('click', () => {
            const confirmDeleteTask = confirm('Are you sure you want to delete this task?');
                if(confirmDeleteTask){
            tasks.splice(index, 1);

            if(tasks.every(task => task.completed)){
                markAllasCompletedBtn.textContent =  'Mark all as Incomplete';
            }
            else{
                markAllasCompletedBtn.textContent =  'Mark all as complete';
            }
              
            displayTasks();
                }
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
            else{
                task.subTasks.forEach(subTask => subTask.completed = false);
            }
            if(tasks.every(task => task.completed)){
                markAllasCompletedBtn.textContent =  'Mark all as Incomplete';
            }
            else{
                markAllasCompletedBtn.textContent =  'Mark all as complete';
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
                
                 //Mark as complete if all sub tasks are marked complete
            if (task.subTasks.every(subTask => subTask.completed)) {
                task.completed = true;
            }else{
                task.completed = false;
            }
            if(tasks.every(task => task.completed)){
                markAllasCompletedBtn.textContent =  'Mark all as Incomplete';
            }
            else{
                markAllasCompletedBtn.textContent =  'Mark all as complete';
            }
              


                displayTasks();
            }
        });

        parentTask.appendChild(parentTaskContent);
        parentTask.appendChild(removeButton);
        parentTask.appendChild(completedButton);
        parentTask.appendChild(subtaskButton);

        // Display sub-tasks
        const subTaskList = document.createElement('ul');
        task.subTasks.forEach((subTask, subIndex) => {
            const subTaskItem = document.createElement('li');
            const subTaskItemContent = document.createElement('span');
            subTaskItemContent.textContent = subTask.subTaskDescription;
            subTaskItemContent.className = 'sub-task-content';
            subTaskItem.className = 'sub-task';

            // Add mark as complete button for sub-task
            const subTaskCompleteButton = document.createElement('span');
            subTaskCompleteButton.className = subTask.completed ? 'fa-solid fa-square-check' : 'fa-regular fa-square';

            //Button event to mark sub task completed
            subTaskCompleteButton.addEventListener('click', () => {
                subTask.completed = !subTask.completed;

              //Mark as complete if all sub tasks are marked complete
            if (task.subTasks.every(subTask => subTask.completed)) {
                task.completed = true;
            }else{
                task.completed = false;
            }
             if(tasks.every(task => task.completed)){
                markAllasCompletedBtn.textContent =  'Mark all as Incomplete';
            }
            else{
                markAllasCompletedBtn.textContent =  'Mark all as complete';
            }
                displayTasks();
            });

             
            //Add delete icon for sub-task
            const subTaskDeleteIcon = document.createElement('i');
            subTaskDeleteIcon.className = "fa-solid fa-trash"

            subTaskDeleteIcon.addEventListener('click', () =>{

                const confirmDeleteSubTask = confirm('Are you sure you want to delete this sub task?');
                if(confirmDeleteSubTask){
                task.subTasks.splice(subIndex, 1);
                
                if(tasks.every(task => task.completed)){
                markAllasCompletedBtn.textContent =  'Mark all as Incomplete';
            }
            else{
                markAllasCompletedBtn.textContent =  'Mark all as complete';
            }
              
                displayTasks();
                }
            });

           

            subTaskItem.appendChild(subTaskItemContent);
            subTaskItem.appendChild(subTaskCompleteButton);
            subTaskItem.appendChild(subTaskDeleteIcon);
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
   
   
    if(markAllasCompletedBtn.textContent == 'Mark all as Incomplete'){
        
        tasks.forEach((task) => {
        task.completed = false;
        task.subTasks.forEach(subTask => subTask.completed = false);
        markAllasCompletedBtn.textContent =  'Mark all as complete';
    });
    displayTasks();
    //  markAllasCompletedBtn.textContent = tasks.completed ? 'Mark all as Incomplete' : 'Mark all as complete';
    }else{
    tasks.forEach((task) => {
        task.completed = true;
        task.subTasks.forEach(subTask => subTask.completed = true);
        markAllasCompletedBtn.textContent =  'Mark all as Incomplete';
    });
    
    displayTasks();
    }
});

             


// Delete all tasks on the task list 
const deleteAll = () => {
    const confirmDeleteAllTasks = confirm('Are you sure you want to delete this all tasks?');
                if(confirmDeleteAllTasks){
    tasks.splice(0, tasks.length);
    displayTasks();
                }
};

