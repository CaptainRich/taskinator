
/* Define the button variable for later use. */
var buttonEl = document.querySelector("#save-task");

/* Define a variable for the "to do list". */
var tasksToDoEl = document.querySelector( "#tasks-to-do" );

/* Define the function to create a new task item  */
var createTaskHandler = function() {
    var listItemEl = document.createElement( "li" );   /* create the "li" item/selector. */
    listItemEl.className = "task-item";                /* assign the proper class to this new item. */
    listItemEl.textContent = "This is a new task." ;   /* add the text content to the item. */
    tasksToDoEl.appendChild( listItemEl );             /* add the new "li"  to its parent, the "ul" item */   
}

/* Setup the (button) event handler and call-back function .  When the button is clicked the handler will create a new task. */
buttonEl.addEventListener( "click", createTaskHandler );