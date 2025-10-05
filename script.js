// Persisted To-Do List with Local Storage
document.addEventListener('DOMContentLoaded', function() {

    // Select key DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory array of tasks (keeps sync with localStorage)
    let tasks = [];

    // Save current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a DOM <li> element for a given task text, and wire up its remove button
    function createTaskElement(taskText) {
        const li = document.createElement('li');

        // Use a span to hold the task text separately from the remove button
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        // Create remove button and style it using classList.add()
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Remove button click handler: remove from DOM and update localStorage
        removeButton.addEventListener('click', function() {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove a single instance of this taskText from the tasks array
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        li.appendChild(removeButton);
        return li;
    }

    /**
     * Adds a task to the UI and optionally saves it to localStorage.
     * @param {string} [taskTextParam] - Optional task text (used when loading from storage)
     * @param {boolean} [save=true] - Whether to save the added task to localStorage
     */
    function addTask(taskTextParam, save = true) {
        // Determine source of task text: parameter (when loading) or input field (when user adds)
        let taskText;
        if (typeof taskTextParam === 'undefined') {
            taskText = taskInput.value.trim();
        } else {
            taskText = String(taskTextParam).trim();
        }

        // Validate input
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create and append the DOM element
        const li = createTaskElement(taskText);
        taskList.appendChild(li);

        // Update in-memory array and localStorage if requested
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear input field
        taskInput.value = "";
    }

    // Load tasks from localStorage and populate the list
    function loadTasks() {
        tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(taskText => addTask(taskText, false)); // false -> don't resave while loading
    }

    // Event listeners

    // Click on "Add Task" button
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });

    // Initialize by loading tasks from localStorage
    loadTasks();
});
