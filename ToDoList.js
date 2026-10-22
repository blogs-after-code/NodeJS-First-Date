/*  
Run the following commands in terminal: 
1. Add a task
   node ToDoList.js add "Buy groceries"

2. List all tasks
   node ToDoList.js list

3. Remove a task
   node ToDoList.js remove 1 

Notes:
- Tasks are stored in tasks.json.
- Task numbers start from 1 (not 0).
- Enclose tasks with spaces in double quotes.
*/

// Import File System module
const fs = require("fs");

// Path to the JSON file
const file_path = "./tasks.json";

// Read tasks from tasks.json
const load_tasks = () => {
  try {
    // Read file
    const data_buffer = fs.readFileSync(file_path, "utf8");

    // Convert to string
    const data_json = data_buffer.toString();

    // Convert JSON to JavaScript array
    return JSON.parse(data_json);
  } catch (error) {
    // Return empty array if file doesn't exist
    return [];
  }
};

// Save tasks to tasks.json
const save_tasks = (tasks) => {
  // Convert array to JSON
  const data_json = JSON.stringify(tasks);

  // Write data to file
  fs.writeFileSync(file_path, data_json);
};

// Add a new task
const add_task = (task) => {
  // Load existing tasks
  const tasks = load_tasks();

  // Add new task
  tasks.push({ task });

  // Save updated tasks
  save_tasks(tasks);

  // Success message
  console.log(`Task "${task}" added successfully.`);
};

// Display all tasks
const list_tasks = () => {
  // Load tasks
  const tasks = load_tasks();

  // Print each task with numbering
  tasks.forEach((task, index) => {
    console.log(`${index + 1} - ${task.task}`);
  });
};

// Remove a task
const remove_task = (index) => {
  // Load tasks
  const tasks = load_tasks();

  // Check if index is valid
  if (index >= 0 && index < tasks.length) {
    // Remove one task
    const removed_task = tasks.splice(index, 1)[0];

    // Save updated tasks
    save_tasks(tasks);

    // Success message
    console.log(`Task "${removed_task.task}" removed successfully.`);
  } else {
    console.log("Invalid task index.");
  }
};

// Get command-line arguments
const command = process.argv[2];
const argument = process.argv[3];

// Execute the correct command
if (command === "add") {
  add_task(argument);
} else if (command === "list") {
  list_tasks();
} else if (command === "remove") {
  // Convert task number to array index
  remove_task(parseInt(argument) - 1);
} else {
  console.log("Invalid command. Please use 'add', 'list', or 'remove'.");
}
