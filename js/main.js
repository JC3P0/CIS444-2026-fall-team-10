// QUEUE - CIS 444 Group 10
// JavaScript for all pages. The database is added in the next phase,
// so for now these functions check the forms and update the page.

// When the pages are opened straight from a folder (no PHP server),
// show a message and go to the next page instead of sending to PHP.
function noServer( message, nextPage )
{
   if ( window.location.protocol === "file:" )
   {
      window.alert( message + "\n(The database will be added in the next phase.)" );
      if ( nextPage !== "" )
         window.location.href = nextPage;
      return true;
   }
   return false;
}

// ---------- Home page ----------

// hide businesses that do not match the search box
function searchBusinesses()
{
   var text = document.getElementById( "search" ).value.toLowerCase();
   var businesses = document.getElementsByClassName( "business" );
   var shown = 0;

   for ( var i = 0; i < businesses.length; ++i )
   {
      if ( businesses[ i ].getAttribute( "data-name" ).indexOf( text ) !== -1 )
      {
         businesses[ i ].style.display = "flex";
         shown++;
      }
      else
         businesses[ i ].style.display = "none";
   }

   document.getElementById( "noResults" ).style.display = ( shown === 0 ) ? "block" : "none";
   return false; // stay on the page
}

// ---------- Log in / Sign up page ----------

function checkLogin()
{
   var email = document.getElementById( "loginEmail" ).value;
   var password = document.getElementById( "loginPassword" ).value;
   var error = document.getElementById( "loginError" );

   if ( email.indexOf( "@" ) === -1 || password === "" )
   {
      error.innerHTML = "Please enter your email and password.";
      return false;
   }

   error.innerHTML = "";
   if ( noServer( "Logged in!", "my_bookings.html" ) )
      return false;
   return true; // send the form to php/login.php
}

function checkSignup()
{
   var name = document.getElementById( "name" ).value;
   var email = document.getElementById( "signupEmail" ).value;
   var password = document.getElementById( "signupPassword" ).value;
   var type = document.getElementById( "accountType" ).value;
   var error = document.getElementById( "signupError" );

   if ( name === "" || email.indexOf( "@" ) === -1 )
   {
      error.innerHTML = "Please enter your name and a valid email.";
      return false;
   }
   if ( password.length < 8 )
   {
      error.innerHTML = "Password must be at least 8 characters.";
      return false;
   }

   error.innerHTML = "";
   var nextPage = ( type === "owner" ) ? "owner.html" : "index.html";
   if ( noServer( "Account created!", nextPage ) )
      return false;
   return true; // send the form to php/register.php
}

// ---------- Book page ----------

// called when a time slot button is clicked
function pickTime( button )
{
   var slots = document.getElementsByClassName( "slot" );
   for ( var i = 0; i < slots.length; ++i )
      slots[ i ].className = "btn slot";

   button.className = "btn slot picked";
   document.getElementById( "time" ).value = button.innerHTML;
   updateSummary();
}

// copy the choices into the summary box
function updateSummary()
{
   var service = document.getElementById( "service" );
   var date = document.getElementById( "date" ).value;
   var time = document.getElementById( "time" ).value;

   if ( service.value !== "" )
      document.getElementById( "sumService" ).innerHTML = service.options[ service.selectedIndex ].text;
   if ( date !== "" )
      document.getElementById( "sumDate" ).innerHTML = date;
   if ( time !== "" )
      document.getElementById( "sumTime" ).innerHTML = time;
}

function checkBooking()
{
   var error = document.getElementById( "bookError" );

   if ( document.getElementById( "service" ).value === "" ||
        document.getElementById( "date" ).value === "" ||
        document.getElementById( "time" ).value === "" )
   {
      error.innerHTML = "Please pick a service, date and time.";
      return false;
   }

   error.innerHTML = "";
   if ( noServer( "Booking sent! The business will confirm it.", "my_bookings.html" ) )
      return false;
   return true; // send the form to php/book.php
}

// ---------- My Bookings page ----------

function cancelBooking( button )
{
   if ( window.confirm( "Cancel this booking?" ) )
      setStatus( button, "cancelled" );
}

// ---------- Business Dashboard page ----------

// change the Status cell of the row this button is in
function setStatus( button, status )
{
   var row = button.parentNode.parentNode;
   var cell = row.cells[ 3 ];
   cell.className = "status " + status;
   cell.innerHTML = status.charAt( 0 ).toUpperCase() + status.substring( 1 );

   // after accepting, show Done / Cancel buttons. Otherwise remove the buttons.
   if ( status === "confirmed" )
      row.cells[ 4 ].innerHTML =
         "<button type='button' class='btn' onclick=\"setStatus(this, 'done')\">Done</button> " +
         "<button type='button' class='btn' onclick=\"setStatus(this, 'cancelled')\">Cancel</button>";
   else
      row.cells[ 4 ].innerHTML = "";
}

function addService()
{
   var name = document.getElementById( "svcName" ).value;
   var minutes = document.getElementById( "svcMinutes" ).value;
   var price = document.getElementById( "svcPrice" ).value;

   if ( name === "" || minutes === "" || price === "" )
   {
      document.getElementById( "serviceError" ).innerHTML = "Please fill in all three fields.";
      return false;
   }
   document.getElementById( "serviceError" ).innerHTML = "";

   if ( window.location.protocol === "file:" )
   {
      // no server yet: just add the new row to the table
      var row = document.getElementById( "services" ).insertRow( -1 );
      row.insertCell( 0 ).innerHTML = name;
      row.insertCell( 1 ).innerHTML = minutes;
      row.insertCell( 2 ).innerHTML = "$" + price;
      document.getElementById( "svcName" ).value = "";
      document.getElementById( "svcMinutes" ).value = "";
      document.getElementById( "svcPrice" ).value = "";
      return false;
   }
   return true; // send the form to php/add_service.php
}

function saveHours()
{
   if ( noServer( "Hours saved!", "" ) )
      return false;
   return true; // send the form to php/update_hours.php
}

// ---------- Admin page ----------

function reviewBusiness( button, result )
{
   var row = button.parentNode.parentNode;
   row.cells[ 3 ].innerHTML = "<span class='status " +
      ( result === "approved" ? "done" : "declined" ) + "'>" +
      ( result === "approved" ? "Approved" : "Rejected" ) + "</span>";
}

function toggleUser( button )
{
   var row = button.parentNode.parentNode;
   var cell = row.cells[ 3 ];

   if ( button.innerHTML === "Suspend" )
   {
      cell.className = "status suspended";
      cell.innerHTML = "Suspended";
      button.innerHTML = "Restore";
   }
   else
   {
      cell.className = "status active";
      cell.innerHTML = "Active";
      button.innerHTML = "Suspend";
   }
}
