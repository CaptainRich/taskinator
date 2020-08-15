
/* Define the button variable for later use. 
var buttonEl = document.querySelector("#save-task");  */ /* mvoved the listener to the form itself */

/* Define the variable for the event listener for the form. */
var formEl = document.querySelector( "#task-form" );

/* Define a variable for the "to do list". */
var tasksToDoEl = document.querySelector( "#tasks-to-do" );

/* Define an anonymous function to create a new task item  */
var createTaskHandler = function( event ) {

    event.preventDefault();                            /* prevent the browser from reloading the page. */

    var listItemEl = document.createElement( "li" );   /* create the "li" item/selector. */
    listItemEl.className = "task-item";                /* assign the proper class to this new item. */
    listItemEl.textContent = "This is a new task." ;   /* add the text content to the item. */
    tasksToDoEl.appendChild( listItemEl );             /* add the new "li"  to its parent, the "ul" item */   
    console.log( event );
}

/* Setup the (form) event handler and call-back function .  When the form is submitted the handler will create a new task. The "submit" event is invoked when a button with 'type=submit' is clicked, or the user presses '[Enter]'. */
formEl.addEventListener( "submit", createTaskHandler );