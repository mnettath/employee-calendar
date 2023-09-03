// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.

$(function () {
  var saveButton = $(".saveBtn");
  var userEvents = JSON.parse(localStorage.getItem("userEvents")) || [];

  // Purpose: display the time at the top of the calendar
  function displayDate() {
    var today = dayjs();
    console.log(today);
    $("#currentDay").text(today.format("dddd, MMMM D, YYYY"));
  }
  displayDate();

  // Purpose: revert from "Saved!" back to the regular saved button
  function handleSave(event) {
    console.log(event);
    $(this).text("Saved!");

    setTimeout(function () {
      saveButton.html('<i class="fas fa-save" aria-hidden="true"></i>');
    }, 1000);

    // Purpose: save the event the user types in to local storag

    var id = $(this).parent().attr("id");
    // this = refers to the object that triggered the event
    // children: access elements inside , parent: access the outer element , siblings: element next to
    // This code should use the id in the containing time-block as a key to  save the user input in local storage.
    console.log(id);
    var text = $(this).siblings("textarea").val();
    console.log(text);
    // using sibling because the text we are trying to target is a sibling of the button

    // Purpose: gethering the userInputs so that we can push them into the userEvents array in local storage
    var userInput = {
      id: id,
      text: text,
    };

    userEvents.push(userInput);

    localStorage.setItem("userEvents", JSON.stringify(userEvents));
  }

  // Purpose: listener for click events on the save button.
  saveButton.on("click", handleSave);

  // Purpose: code to apply the past, present, or future class to each time block by comparing the id to the current hour.

  var currentHour = dayjs().hour();
  console.log(currentHour);

  // Purpose: loop to iterate over each div with a class of time-block
  $(".time-block").each(function () {
    // going into the time block div, finding an attribute of id.
    // splits the id value into an array of substrings based on the dash. ["hour", "9"]
    // [1] accesses the "9", parseInt is used to convert from a string to an integer
    var hourId = parseInt($(this).attr("id").split("-")[1]);
    console.log(hourId);

    if (hourId < currentHour) {
      console.log("Adding 'past' class to hour", hourId);
      $(this).addClass("past");
    } else if (hourId === currentHour) {
      console.log("Adding 'present' class to hour", hourId);
      $(this).removeClass("past").addClass("present");
    } else {
      console.log("Adding 'future' class to hour", hourId);
      $(this).removeClass("past present").addClass("future");
    }
  });

  // Purpose: saves the events, even when the page is refreshed
  // loop iterates over each event in the userEvents array
  userEvents.forEach(function (event) {
    $("#" + event.id) // finds the html element with an id attribute that matches the event.id
      .find("textarea") // once we find the matching id, we are going to look for a textarea insitde its div
      .val(event.text);
  });
});
