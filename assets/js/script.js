// https://day.js.org/en/

// VARIABLES

// FUNCTIONS

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  var saveButton = $(".saveBtn");
  var userEvent = JSON.parse(localStorage.getItem("userEvent")) || {};
  // key value?
  // Purpose: display the time at the top of the calendar
  function displayDate() {
    var today = dayjs();
    $("#currentDay").text(today.format("dddd, MMMM D, YYYY"));
  }
  displayDate();
  // This code should use the id in the containing time-block as a key to  save the user input in local storage.
  // HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Key to save the user input in local storage: id = "hour-5"

  // Purpose: save the event the user types in to local storage
  function handleSave(event) {
    $(this).text("Clicked!");
    var id = $(this).parent().attr("id"); // this = refers to the object that triggered the event
    console.log(id);
    var text = $(this).siblings("textarea").val();
    console.log(text);
    // using sibling because the text we are trying to target is a sibling of the button

    localStorage.setItem("userEvent", JSON.stringify(userEvent));
  }
  // children: access elements inside , parent: access the outer element , siblings: element next to

  // TODO: Add a listener for click events on the save button.
  saveButton.on("click", handleSave);

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time? USE AN IF STATEMENT
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
