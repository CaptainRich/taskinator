
// Define the button variable for later use. 
//var buttonEl = document.querySelector("#save-task");     // mvoved the listener to the form itself 

// Define the variable for the event listener for the form. 
var formEl = document.querySelector( "#task-form" );

// Define a variable for the "to do list". 
var tasksToDoEl = document.querySelector( "#tasks-to-do" );

// Define a variable to be used as a task ID value. */
var taskIdCounter = 0;


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
    
    // Package this data in an 'object' to pas on to the 'createTaskEl' function. 
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // Put the new task on the page. 
    createTaskEl( taskDataObj );
    
}

// ///////////////////////////////////////////////////////////////////////////////////  
// Define the function to create the HTML for a newly added task. 
var createTaskEl = function( taskDataObj ){

    var listItemEl = document.createElement( "li" );   // create the "li" item/selector. 
    listItemEl.className = "task-item";                // assign the proper class to this new item. 

    // Add a 'task-id' value as a custom attribute, so we know which task is which. 
    listItemEl.setAttribute("data-task-id", taskIdCounter );

    // Create a 'div' to hold the task info and add it to the list item just created. 
    var taskInfoEl = document.createElement( "div" );
    taskInfoEl.className = "task-info";                // give the 'div' a class name

    // Add content and style to this new 'div' element 
    taskInfoEl.innerHTML = "<h3 class-'task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

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
// Setup the (form) event handler and call-back function .  When the form is submitted the handler will create a new task. 
// The "submit" event is invoked when a button with 'type=submit' is clicked, or the user presses '[Enter]'. 
formEl.addEventListener( "submit", taskFormHandler );