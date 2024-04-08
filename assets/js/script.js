
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));


function generateTaskId() {
    return dayjs().valueOf().toString();
}

function createTaskCard(task) {
 
  const cardTemplate = `
    <div class="card mb-2 task-card" data-id="${task.id}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text text-muted">Due: ${dayjs(task.deadline).format('YYYY-MM-DD')}</p>
        <button class="btn btn-sm btn-danger float-end delete-task" data-task-id="${task.id}">Delete</button>
      </div>
    </div>`;
  return cardTemplate;
}


function renderTaskList() {
   
  // Loop through taskList using a for loop
  for (let i = 0; i < taskList.length; i++) {
    const task = taskList[i];
    const card = createTaskCard(task);

    // Add card to appropriate lane based on status
    $("#todo-cards").append(card);
      // Re-attach click event listener to newly created buttons
    $('.delete-task').on('click', handleDeleteTask);
  }
}

function handleAddTask(event){
    console.log("hello") 
    console.log("Save Task Button is Clicked!");
    
    const saveTaskButton = $('#saveTaskButton');

    if (saveTaskButton.attr('id') === 'saveTaskButton') {
    const title = $("#taskTitle").val();
    const description = $("#taskDescription").val();
    const deadline = $("#taskDeadline").val(); // Get deadline value

  // Use Day.js to parse deadline string
    const parsedDeadline = dayjs(deadline).isValid() ? dayjs(deadline) : null;

    if (title) {
        const newTask = {
        id: generateTaskId(),
        title,
        description,
        deadline: parsedDeadline,
        status: "to-do", // Default status
    };
    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
    $("#formModal").modal("hide"); // Close modal after adding task
  } else {
    alert("Please enter a task title.");
  }}
}

saveTaskButton.addEventListener('click', handleAddTask)

function handleDeleteTask(event){
  const taskId = $(event.target).closest(".task-card").data("id");
  const taskIndex = taskList.findIndex(task => task.id === taskId);
  
  if (taskIndex !== -1) {
    taskList.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
  }
}


function handleDrop(event, ui) {
// Get the task element being dropped
const task = ui.draggable;

// Get the status lane where the task was dropped
const targetLane = $(this);

// Update the task's status based on the target lane's ID or class
const newStatus = targetLane.attr('id') || targetLane.attr('class');
task.data('status', newStatus);

// Visually move the task element to the new lane
task.appendTo(targetLane);

// Update the task's status in taskList
const taskIndex = taskList.findIndex(task => task.id === task.data('id'));
taskList[taskIndex].status = newStatus;

// Persist the updated taskList to localStorage
localStorage.setItem("tasks", JSON.stringify(taskList));
}

$(document).ready(function () {
  // Render the task list
  renderTaskList();
  // Make task elements draggable
  $('.task-card').draggable();

  // Make status lanes droppable
  $('.lane').droppable({
    drop: handleDrop
  });

  // Initialize a date picker for the due date field
  $("#taskDeadline").datepicker();

  // Add event listeners for adding and deleting tasks
  $("#taskForm").on('submit', handleAddTask);
  $(document).on('click', '.delete-task', handleDeleteTask);

});
