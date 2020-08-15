
/* Define the button variable for later use. 
var buttonEl = document.querySelector("#save-task");  */ /* mvoved the listener to the form itself */

/* Define the variable for the event listener for the form. */
var formEl = document.querySelector( "#task-form" );

/* Define a variable for the "to do list". */
var tasksToDoEl = document.querySelector( "#tasks-to-do" );

/* Define an anonymous function to create a new task item  */
var createTaskHandler = function( event ) {

    event.preventDefault();                            /* prevent the browser from reloading the page. */

    /* Obtain the task name and type just defined from the input form. */
    var taskNameInput = document.querySelector( "input[name='task-name']").value;
    var taskTypeInput = document.querySelector( "select[name='task-type']").value;
    

    var listItemEl = document.createElement( "li" );   /* create the "li" item/selector. */
    listItemEl.className = "task-item";                /* assign the proper class to this new item. */

    /* Create a 'div' to hold the task info and add it to the list item just created. */
    var taskInfoEl = document.createElement( "div" );
    taskInfoEl.className = "task-info";                /* give the 'div' a class name

    /* Add content and style to this new 'div' element */
    taskInfoEl.innerHTML = "<h3 class-'task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    /* Put things all together using .appendChild */
    listItemEl.appendChild( taskInfoEl );              /* this adds the 'h3' and 'span' data */
    tasksToDoEl.appendChild( listItemEl );             /* add the new "li"  to its parent, the "ul" item */   
}

/* Setup the (form) event handler and call-back function .  When the form is submitted the handler will create a new task. The "submit" event is invoked when a button with 'type=submit' is clicked, or the user presses '[Enter]'. */
formEl.addEventListener( "submit", createTaskHandler );