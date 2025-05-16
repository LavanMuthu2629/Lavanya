const fs = require('fs');
const readlineSync = require('readline-sync');

// Path to the file where tasks will be stored
const filePath = 'todos.txt';

// Function to read tasks from the file
function readTasks() {
    if (!fs.existsSync(filePath)) {
        console.log('No tasks found. Starting a new list.');
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? data.split('\n').filter(Boolean) : [];
}

// Function to save tasks to the file
function saveTasks(tasks) {
    fs.writeFileSync(filePath, tasks.join('\n'), 'utf8');
    console.log('new message is saved successfully!');
}

// Function to display the menu
function showMenu() {
    console.log('\nTo-Do List Menu:');
    console.log('1. Display the existing Message ');
    console.log('2. Append a new Message');
    console.log('3. Delete the unwanted Message');
    console.log('4. Exit');
}

// Main function to run the to-do list app
function runApp() {
    let tasks = readTasks();

    while (true) {
        showMenu();
        const choice = readlineSync.question('Enter your choice: ');

        switch (choice) {
            case '1':
                if (tasks.length === 0) {
                    console.log('No Message is here to display.');
                } else {
                    console.log('\nYour tasks:');
                    tasks.forEach((task, index) => {
                        console.log(`${index + 1}. ${task}`);
                    });
                }
                break;

            case '2':
                const newTask = readlineSync.question('Enter a new Message: ');
                tasks.push(newTask);
                saveTasks(tasks);
                break;

            case '3':
                if (tasks.length === 0) {
                    console.log('No Message is here to delete.');
                } else {
                    const taskToDelete = readlineSync.question('Enter Unwanted Messages number to delete: ');
                    const taskIndex = parseInt(taskToDelete) - 1;
                    if (taskIndex >= 0 && taskIndex < tasks.length) {
                        tasks.splice(taskIndex, 1);
                        saveTasks(tasks);
                    } else {
                        console.log('Invalid Message number.');
                    }
                }
                break;

            case '4':
                console.log('Exiting the application...');
                return;

            default:
                console.log('Invalid choice. Please try again.');
                break;
        }
    }
}

// Start the app
runApp();