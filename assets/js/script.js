
// Define the button variable for later use. 
//var buttonEl = document.querySelector("#save-task");     // mvoved the listener to the form itself 

// Define the variable for the event listener for the form. 
var formEl = document.querySelector( "#task-form" );

// Define a variable for the "to do list". 
var tasksToDoEl = document.querySelector( "#tasks-to-do" );

// Define a variable to be used as a task ID value. */
var taskIdCounter = 0;

// Define a variable for the main page so an event listener for the action buttons can be implemented.
var pageContentEl = document.querySelector( "#page-content" );

// Define variables need to track the task status
var tasksInProgressEl = document.querySelector( "#tasks-in-progress" );
var tasksCompletedEl  = document.querySelector( "#tasks-completed" );


// ///////////////////////////////////////////////////////////////////////////////////  
//Define an anonymous function to create a new task item  
var taskFormHandler = function( event ) {

    event.preventDefault();                 // prevent the browser from reloading the page. 

    // Obtain the task name and type just defined from the input form. 
    var taskNameInput = document.querySelector( "input[name='task-name']").value;
    var taskTypeInput = document.querySelector( "select[name='task-type']").value;

    // Verify that input was provided to both form controls. 
    if( !taskNameInput  ||  !taskTypeInput ) {
        alert( "You need to define a task and select a type!");
        return false;
    }

    // Blank out any earlier data from the form. 
    formEl.reset();                              // this works since 'formEl' is global. 

    // Detect if a task is being added (created) or edited
    var isEdit = formEl.hasAttribute( "data-task-id" );

    // Based on whether or not the form has the 'data-task-id' decide if we are adding
    // or editing a task.
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {  // There was no 'data-task-id' attribute, this is a new task to be added (created)

        // Package this data in an 'object' to pass on to the 'createTaskEl' function. 
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        // Put the new task on the page. 
        createTaskEl(taskDataObj);
    } 
}

// ///////////////////////////////////////////////////////////////////////////////////  
// Define the function to change the status of a task
var taskStatusChangeHandler = function( event ) {
    
    // Get the Id of the task item to be moved.
    var taskId = event.target.getAttribute("data-task-id");

    // Get the currently selected opition (the current status), and convert to lower case
    var statusValue = event.target.value.toLowerCase();

    // Find the parent task item element based on id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']" );

    // Based on the selected option, put the task in the corresponding culumn.

    if( statusValue === "to do") {
        tasksToDoEl.appendChild( taskSelected );
    }
    else if( statusValue === "in progress" ) {
        tasksInProgressEl.appendChild( taskSelected );
    }
    else if ( statusValue === "completed" ) {
        tasksCompletedEl.appendChild( taskSelected );

    }
};

// ///////////////////////////////////////////////////////////////////////////////////  
// Define the function to create the HTML for a newly added task. 
var createTaskEl = function( taskDataObj ){

    var listItemEl = document.createElement( "li" );   // create the "li" item/selector. 
    listItemEl.className = "task-item";                // assign the proper class to this new item. 

    // Add a 'task-id' value as a custom attribute, so we know which task is which. 
    listItemEl.setAttribute("data-task-id", taskIdCounter );
    listItemEl.setAttribute("draggable", "true");      // also set this element to be draggable

    // Create a 'div' to hold the task info and add it to the list item just created. 
    var taskInfoEl = document.createElement( "div" );
    taskInfoEl.className = "task-info";                // give the 'div' a class name

    // Add content and style to this new 'div' element 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // Put things all together using .appendChild 
    listItemEl.appendChild( taskInfoEl );                    // this adds the 'h3' and 'span' data 
    var taskActionsEl = createTaskActions( taskIdCounter );  // create the action buttons
    listItemEl.appendChild( taskActionsEl );                 // add the buttons to the 'li'
    tasksToDoEl.appendChild( listItemEl );                   // add the new "li"  to its parent, the "ul" item    

    // Increment the 'task-id' value.
    taskIdCounter++;
}

// ///////////////////////////////////////////////////////////////////////////////////  
// Define a function to dynamically create the task actions. 
var createTaskActions = function( taskId ) {

    // Create a 'div' element to hold the 'task action buttons'
    var actionContainerEl = document.createElement( "div" );
    actionContainerEl.className = "task-actions";

    // Now create the buttons.  First the 'Edit Task' button
    var editButtonEl =  document.createElement( "button" );
    editButtonEl.textContent = "Edit";                         // give the button text to display
    editButtonEl.className = "btn edit-btn";                   // give the button classes
    editButtonEl.setAttribute( "data-task-id", taskId );       // assign custom data to the button

    actionContainerEl.appendChild( editButtonEl );             // add the new HTML element to the 'div'
    
    // Now create the 'Delete Task' button.  
    var deleteButtonEl =  document.createElement( "button" );
    deleteButtonEl.textContent = "Delete";                     // give the button text to display
    deleteButtonEl.className = "btn delete-btn";               // give the button classes
    deleteButtonEl.setAttribute( "data-task-id", taskId );     // assign custom data to the button

    actionContainerEl.appendChild( deleteButtonEl );           // add the new HTML element to the 'div'}

    // Now add the selection list, to change the task status
    var statusSelectEl = document.createElement( "select" );
    statusSelectEl.className = "select-status";                // give the drop-list classes
    statusSelectEl.setAttribute( "name", "status-change" );
    statusSelectEl.setAttribute( "data-task-id", taskId );     // asign custom data to the list

    actionContainerEl.appendChild( statusSelectEl );           // add the new HTML element to the 'div'}

    // Define the options for the drop-list.
    var statusChoices = [ "To Do", "In Progress", "Completed" ];

    for( var i = 0; i < statusChoices.length; i++ ) {

        // Create the option element
        var statusOptionEl = document.createElement( "option" );
        statusOptionEl.textContent = statusChoices[i];         // assign the text to display
        statusOptionEl.setAttribute( "value", statusChoices[i] );

        statusSelectEl.appendChild( statusOptionEl );         // append to the drop list
    }

    return actionContainerEl;
}


// /////////////////////////////////////////////////////////////////////////////////// 
// Define the 'task button handler' function.
var taskButtonHandler = function( event ) {
  
    // Get the target element from the 'event'
    var targetEl = event.target;

    // Test to see which button was clicked.
    if( targetEl.matches( ".edit-btn")) {  // The 'edit' button was clicked.
        
        // Get the element's (the button's) task id
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    else if( targetEl.matches( ".delete-btn")) {  // The 'delete' button was clicked
        
        // Get the element's (the button's) task id
        var taskId = targetEl.getAttribute("data-task-id");

        // Delete the task with Id = 'taskId'
        taskDelete( taskId );
    };
};


// /////////////////////////////////////////////////////////////////////////////////// 
// Define the 'edit task' function.
var editTask = function( taskId ){
    
    // Find the task associated with 'taskId'
    var taskSelected = document.querySelector( ".task-item[data-task-id='" + taskId + "']" );

    // Get content from the task name and task type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;

    // Change the button text from 'Edit' to 'Save Task'
    document.querySelector("#save-task").textContent = "Save Task";

    // Create a new attribute so we don't lose the 'taskId'
    formEl.setAttribute( "data-task-id", taskId );
 
}

// /////////////////////////////////////////////////////////////////////////////////// 
// Finish off the 'edit task' function.
var completeEditTask = function( taskName, taskType, taskId ) {
    
    // Need to find the matching "task list" item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']" );

    // Set the new (edited) values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert( "Task has been updated!" );

    // Reset the form by removing the 'data-task-id' and putting the button text back to normal
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

// /////////////////////////////////////////////////////////////////////////////////// 
// Define the 'delete task' function.
var taskDelete = function( taskId ) {

    // Find the task associated with 'taskId', and delete it.
    var taskSelected = document.querySelector( ".task-item[data-task-id='" + taskId + "']" );
    taskSelected.remove();
}


// /////////////////////////////////////////////////////////////////////////////////// 
// Define the event handler function for the drag/drop operation
var dragTaskHandler = function( event ) {

    // Get the task Id for the event
    var taskId = event.target.getAttribute("data-task-id");
   
    // Store this Id in the "dataTransfer" property of the (drag) event object
    event.dataTransfer.setData("text/plain", taskId);      // format and value

    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);
}


// /////////////////////////////////////////////////////////////////////////////////// 
// Define the event handler function for the dropzone event.
var dropZoneDragHandler = function( event ) {

    // Determine if the dropzone is over a "task list", which is what we want
    var taskListEl = event.target.closest(".task-list");

    // Disable the default behavior preventing us dropping this object
    if( taskListEl ) {
        event.preventDefault();
        
    }

}


// /////////////////////////////////////////////////////////////////////////////////// 
// Define the event handler function for the 'drop' event.
var dropTaskHandler = function( event ) {

    // Get the drop target's id
    var id = event.dataTransfer.getData( "text/plain" );

    // Get the id of the 'dragged' task item.
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");

    // Get the dropzone where our task was dropped.
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;

    // Set the status of our task based on the new dropzone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    
    if( statusType === "tasks-to-do" )  {
        statusSelectEl.selectedIndex = 0;
    }
    else if( statusType === "tasks-in-progress" ){
        statusSelectEl.selectedIndex = 1;
    }
    else if( statusType === "tasks-completed" ){
        statusSelectEl.selectedIndex = 2;
    }

    // Append the dropped task to its new parent list.
    dropZoneEl.appendChild( draggableElement );
}


// /////////////////////////////////////////////////////////////////////////////////// 
// Setup the (form) event handler and call-back function .  When the form is submitted the handler will create a new task. 
// The "submit" event is invoked when a button with 'type=submit' is clicked, or the user presses '[Enter]'. 
formEl.addEventListener( "submit", taskFormHandler );

// Add the evemnt listener for the main page to determine when the edit/delete/action controls were activated.
pageContentEl.addEventListener( "click", taskButtonHandler );

// Add an event listenter for the main page to detect a change in task status
pageContentEl.addEventListener( "change", taskStatusChangeHandler );

// Add an event listenter for the main page to detect the drag/drop action
pageContentEl.addEventListener( "dragstart", dragTaskHandler );

// Add an event listener for the 'drag over' event.
pageContentEl.addEventListener( "dragover", dropZoneDragHandler );

// Add an evet listener for the 'drop' event.
pageContentEl.addEventListener( "drop", dropTaskHandler );
