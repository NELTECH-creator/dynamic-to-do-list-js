// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Select key DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Define the function to add new tasks
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";

        // Use classList.add() to assign the button's class
        removeButton.classList.add('remove-btn');

        // Add functionality to remove the task when the button is clicked
        removeButton.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Add the task (li) to the task list (ul)
        taskList.appendChild(li);

        // Clear the input field after adding the task
        taskInput.value = "";
    }

    // Add event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Allow pressing "Enter" to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // (Optional) Function call when page loads if needed
    // addTask(); // Uncomment if default tasks are to be added
});
// Note: The above code implements a dynamic to-do list where users can add and remove tasks.