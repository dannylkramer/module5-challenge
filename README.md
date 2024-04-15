## Task Board

This is a simple Kanban board web application for task management. It allows users to create tasks, assign descriptions and due dates, and categorize them based on their status (to-do, in-progress, done). 

### Dependencies

This application uses the following external libraries:

* Bootstrap 5 - https://getbootstrap.com/
* jQuery - https://jquery.com/
* jQuery UI - https://jqueryui.com/
* Day.js - https://www.npmjs.com/package/dayjs

### Running the application

1. Save the HTML, CSS, and JavaScript files in the same directory.
2. Ensure you have Bootstrap, jQuery, jQuery UI, and Day.js libraries linked or included in your HTML file.
3. Open the HTML file in a web browser to run the application.

### Features

* Add tasks with titles, descriptions, and due dates.
* Categorize tasks into different stages (to-do, in-progress, done) using a Kanban board layout.
* Tasks can be dragged and dropped between different stages.
* Tasks are saved and persisted in the browser's local storage.
* Visual cues are provided to indicate task deadlines (overdue, approaching deadline, on schedule).

### Code Structure

The codebase consists of the following files:

* `index.html`: The main HTML file containing the application's structure and layout.
* `style.css` Contains custom CSS styles for the application.
* `script.js`: Contains JavaScript code for the application's logic and functionality.

The JavaScript code is well-structured and utilizes functions for better organization. Here's a brief explanation of some of the key functions:

* `generateTaskId()`: Generates a unique ID for each new task.
* `createTaskCard(task)`: Creates the HTML structure for a task card based on the provided task data.
* `renderTaskList()`: Renders the task list by iterating through the task data and creating corresponding task cards.
* `handleAddTask(event)`: Handles the form submission event for adding a new task.
* `handleDeleteTask(event)`: Handles the click event on the delete button of a task card.
* `handleDrop(event, ui)`: Handles the drop event when a task card is dragged and dropped into a different stage.

### Credits
Daniel Kramer | 
dannylkramer@icloud.com |
Northwestern University |
Coding Bootcamp |
Module 5 Challenge 
