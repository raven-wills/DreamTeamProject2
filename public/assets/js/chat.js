$(document).ready(function() {
  // Getting jQuery references to the message body and author
  var bodyInput = $("#submitBody");
  var authorInput = $("#submitAuthor");
  // Adding an event listener for when the form is submitted
  $("#chatSubmit").on("submit", handleFormSubmit);
  
  // Get messages upon page load
  getChat();

  // A function for handling what happens when the form to create a new message is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Won't submit the post if we are missing a body or author
    if (!bodyInput.val().trim() || !authorInput.val()) {
      return;
    }
    // Constructing a newMessage object to hand to the database
    var newMessage = {
      body: bodyInput.val().trim(),
      UserId: authorInput.val()
    };
    // Post to database, then retrieve updated view
    $.post("/api/chat", newMessage, getChat); 
  }

  
  // A function to get and then render our list of messages
  function getChat() {
    $.get("/api/chat", renderMessageList);
    // Auto-scroll to bottom of container so newest messages are visible
    $("#messageContainer").animate({ scrollTop: $('#messageContainer').prop("scrollHeight")}, 1000);
  }

  var printUsername; // Variable to determine whether to print the time and username above a chat message

  function renderMessageList(data) {
    var messageContainer = $("#messageContainer");
    messageContainer.empty();
    // Initial message when chat is empty
    if (!data.length) {
      var $noMessages = $("<div>", {"class": "messageBody"}).html("No messages yet..");
      messageContainer.append($noMessages);
    } else {
      for (var i = 0; i < data.length; i++) {
        if ((i > 0) // Name must be printed on first message, so exclude first loop.
          && (data[i].User.id === data[i-1].User.id) // If a message has the same author as the previous message...
          && (moment(data[i].createdAt).diff(data[i-1].createdAt, 'minutes') < 1) // ...and it has been less than one minute since the previous...
        ){
          printUsername = false; // ...then don't print the name
        } else {
          printUsername = true;
        }
        messageContainer.append(createMessageRow(data[i]));
      }
    }
  }

  // Creates the individual messages
  function createMessageRow(data) {
    // Create separate elements for each part of the message so that they can be individually styled
    var $message = $("<div>", {"class": "messageComplete"});
    var $authorName = $("<span>", {"class": "authorName"}).html(data.User.name + "&nbsp;&nbsp;");
    var $postedAt = $("<span>", {"class": "postedAt"}).html(moment(data.createdAt).format("h:mm A"));
    var $messageBody = $("<div>", {"class": "messageBody"}).html(data.body);
    // Print author and time if conditions are met
    if (printUsername === true) {
      $message.append($authorName);
      $message.append($postedAt);
    }
    $message.append($messageBody);
    return $message;
  }
});
