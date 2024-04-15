
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));


function generateTaskId() {
    return dayjs().valueOf().toString();
}

// String - "" or '' or ``
// Array - [element1, element2,] -> access them using index (0,1,2...)
//Number - 5 or 5.5
//Boolean - true or false
// Object - {key: value, property: value2}
// Undefined or null
// Function ()

function createTaskCard(task) {
  //task is what dataype? You are using . notation to traverse it
  //TASK IS AN OBJECT
  console.log("Create Task Card Function. My Task: ", task)
  var colorCodeClass = ""
var dueDate = dayjs(task.deadline)
var currentDate = dayjs()
var dateDifference = currentDate.diff(dueDate, "day")
console.log("Due Date: ", dueDate)
console.log(dateDifference)
//dueDate needs to not be a string -> Date object()
if(dateDifference > 0 ){
  colorCodeClass = "overdue"
} else if (dateDifference > -3){
  colorCodeClass = "approaching-deadline"
} else {
  colorCodeClass= "on-schedule"
}
 //if (the date is in the past){ var = overdue}
 // else if (the date is in the next 3 days){ var = approaching-deadline}
 // else {the date is more than 3 days ahead} var = on-schedule

  const cardTemplate = `
    <div class="card draggable mb-2 task-card ${colorCodeClass}" data-id="${task.id}">
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
    console.log("++++++++++++++++++++++++++++++++Start of loop +++++++++++++++++++++++++++")
    const task = taskList[i];
    const card = createTaskCard(task);
    // Add card to appropriate lane based on status
    if (task.status === "to-do") {
      $("#to-do .droppable").append(card);
      } else if (task.status === "in-progress") {
      $("#in-progress .droppable").append(card);
      } else if (task.status === "done") {
      $("#done .droppable").append(card);
      }
      // Make the newly created card draggable
      // $(card).draggable({
      //   revert: "invalid" // Return the card to its original position if not dropped on a valid target
      // });
      // Re-attach click event listener to newly created buttons
    $('.delete-task').on('click', handleDeleteTask);
      
    $('.task-card').draggable({
      opacity: 0.7,
      zIndex: 100,
      // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
      helper: function (e) {
        // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
        const original = $(e.target).hasClass('ui-draggable')
          ? $(e.target)
          : $(e.target).closest('.task-card');
        // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
        return original.clone().css({
          width: original.outerWidth(),
        });
      },
    });
}}

function handleAddTask(event){
    console.log("hello") 
    console.log("Save Task Button is Clicked!");
    
    const saveTaskButton = $('#saveTaskButton');

    if (saveTaskButton.attr('id') === 'saveTaskButton') {
    const title = $("#taskTitle").val();
    const description = $("#taskDescription").val();
    const deadline = $("#taskDeadline").val(); // Get deadline value
      console.log("deadline: ", deadline)
  // Use Day.js to parse deadline string
    const parsedDeadline = dayjs(deadline).isValid() ? dayjs(deadline) : null;
      console.log("Parsed Deadline: ", parsedDeadline)
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
  console.log("task added!")
}

saveTaskButton.addEventListener('click', handleAddTask)


function handleDeleteTask(event) {
  event.preventDefault();

  // Get the clicked button element
  const deleteButton = $(event.currentTarget);

   // Get the task ID from the button's data attribute
   const taskId = deleteButton.data('task-id').toString();

  // Remove the task card using its closest parent with the '.task-card' class
  deleteButton.closest('.task-card').remove();

  if (taskId) {
    // Find the task index in the taskList array
    const taskIndex = taskList.findIndex(task => task.id === taskId.toString());

    if (taskIndex !== -1) {
      // Remove the task from the taskList array
      const splicedTask = taskList.splice(taskIndex, 1);

      // Check if splice was successful (i.e., if an element was removed)
      if (splicedTask.length > 0) {
        // Update localStorage with the modified taskList
        localStorage.setItem("tasks", JSON.stringify(taskList));
      } else {
        console.warn("Task was not found in taskList for deletion.");
      }
    } else {
      console.error("Task with ID", taskId, "not found in taskList");
    }
  } else {
    console.warn("Task ID not found on delete button. Consider adding a data-task-id attribute");
  }
  console.log("Task deleted!")
}


function handleDrop(event, ui) {
  // 1. Read tasks from localStorage (similar to function 1)
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  // 2. Get dropped task data
  const taskElement = ui.draggable.closest('.task-card');
  const taskId = taskElement.data("id");

  // 3. Get target lane ID
  const targetLane = $(event.target).closest('.lane').attr('id');
  console.log(tasks)
  console.log(taskId)
  // 4. Find the task object by ID
  const taskIndex = tasks.findIndex(task => task.id === taskId.toString());
  const task = tasks[taskIndex];

  // 5. Update task status based on target lane
  task.status = targetLane;

  // 6. Save updated tasks to localStorage (similar to function 1)
  localStorage.setItem("tasks", JSON.stringify(tasks));
  
  // 7. Visually update task position (already present)
  taskElement.appendTo($('#' + targetLane));
}





  // Add event listeners for adding and deleting tasks
  $("#taskForm").on('submit', handleAddTask);
  $(document).on('click', '.delete-task', handleDeleteTask);

$(document).ready(function () {
  // Render the task list
  renderTaskList();

  // Initialize a date picker for the due date field
  $("#taskDeadline").datepicker();

    // Make status lanes droppable using the 'connectWith' option
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });

});


