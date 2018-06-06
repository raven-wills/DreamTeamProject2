$(document).ready(function() {
  // Getting jQuery references to the message body and author
  var bodyInput = $("#messageBody");
  var authorInput = $("#messageAuthor");
  // Adding an event listener for when the form is submitted
  $("#chatSubmit").on("submit", handleFormSubmit);
  
  // Getting the chat messages
  getChat();

  // A function for handling what happens when the form to create a new message is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or author
    if (!bodyInput.val().trim() || !authorInput.val()) {
      return;
    }
    // Constructing a newMessage object to hand to the database
    var newMessage = {
      body: bodyInput
        .val()
        .trim(),
      UserId: authorInput.val()
    };
    // Post to database, then retrieve updated view
    $.post("/api/chat", newMessage, function() {
      getChat();
    }); 
  }

  // A function to get and then render our list of messages
  function getChat() {
    $.get("/api/chat", renderMessageList);
  }
  function renderMessageList(data) {
    var messageBox = $("#messageBox");
    if (!data.length) {
      console.log("no messages yet");
    }
    var messageToAdd = [];
    for (var i = 0; i < data.length; i++) {
      messageToAdd.push(createMessageRow(data[i]));
    }
    messageBox.empty();
    messageBox.append(messageToAdd);
  }

  // Creates the individual messages
  function createMessageRow(message) {
    var listOption = $("<div>");
    listOption.text(message.User.name + " (" + moment(message.createdAt).format("hh:mm:ss") + "): " + message.body);
    return listOption;
  }
});
