$(document).ready(function() {
  
  // Get logged in user's info and chat messages upon page load
  getUserInfo();
  getChat();

  const pusher = new Pusher('0a6f033fb9407c9c16ac', { 
    cluster: 'us2',
    encrypted: true,
    authEndpoint: 'pusher/auth'
  });

  var username = '';
  var newMessage = '';
  var messages = [];
  var status = $("#status");

  var localUser;
  // Store current user info on client side. Set form placeholder to welcome user
  function getUserInfo() {
    $.get("/api/user_data", function(data) {
      if (!data.email) {
        console.log("not signed in");
        bodyInput.attr("placeholder", "Please sign in to chat!");
      } else {
        localUser = data;
        bodyInput.attr("placeholder", "Welcome " + localUser.name + "! Type your message here.");
        joinChat();
      }
    });
  }

  // Authenticate user and add to chat's connected users
  function joinChat() {
    // Pass userId and name to pusher
    $.post('join-chat', {userId: localUser.id, username: localUser.name}, function() {
      const channel = pusher.subscribe('presence-groupChat');
      channel.bind('pusher:subscription_succeeded', (member) => {
        showUsers(channel)
      });
      
      // Begin listening for chat updates
      listen();
    });
  };
  
  // Listeners for new messages and changes in connected users
  function listen() {
    const channel = pusher.subscribe('presence-groupChat');
    // New message in chat
    channel.bind('message_sent', getChat);
    // User joins chat
    channel.bind('pusher:member_added', (member) => {
      showUsers(channel);
      
      // Post alert using 'system' account
      $.post("/api/chat", {
        body: member.info.name + " has joined the chat",
        UserId: 1
      }); 
    });
    // User leaves chat
    channel.bind('pusher:member_removed', (member) => {
        showUsers(channel);
      $.post("/api/chat", {
        body: member.info.name + " has left the chat",
        UserId: 1
      }); 
    });
  };
  
  var connectionList = $("#connectionList")
  // Iterate through pusher's list of connected members and push to display div
  function showUsers(channel) {
    connectionList.empty();
    channel.members.each(function(member) {
      var userId = member.id;
      var userInfo = member.info;
      connectionList.append(userInfo.name + "<br>");
    });
  };
      
  // Getting jQuery references to the message body
  var bodyInput = $("#submitBody");

  // Adding an event listener for when the form is submitted
  $("#chatSubmit").on("submit", handleFormSubmit);

  // A function for handling what happens when the form to create a new message is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Won't submit the post if we are missing a body
    if (!bodyInput.val().trim()) {
      return;
    }
    // Constructing a newMessage object to hand to the database
    var newMessage = {
      body: bodyInput.val().trim(),
      UserId: localUser.id
    };
    // Post to database, retrieve updated view, change placeholder to standard
    $.post("/api/chat", newMessage, getChat);
    bodyInput.attr("placeholder", "Type your message here.");
    bodyInput.val("");
  }

  // A function to get and then render our list of messages
  function getChat() {
    $.get("/api/chat", renderMessageList);
    // Auto-scroll to bottom of container so newest messages are visible
    $("#messageContainer").animate(
      { scrollTop: $("#messageContainer").prop("scrollHeight") },
      1000
    );
  }

  var printUsername; // Variable to determine whether to print the time and username above a chat message

  function renderMessageList(data) {
    var messageContainer = $("#messageContainer");
    messageContainer.empty();
    // Initial message when chat is empty
    if (!data.length) {
      var $noMessages = $("<div>", { class: "messageBody" }).html(
        "No messages yet.."
      );
      messageContainer.append($noMessages);
    } else {
      for (var i = 0; i < data.length; i++) {
        if (
          i > 0 && // Name must be printed on first message, so exclude first loop.
          data[i].User.id === data[i - 1].User.id && // If a message has the same author as the previous message...
          moment(data[i].createdAt).diff(data[i - 1].createdAt, "minutes") < 1 // ...and it has been less than one minute since the previous...
        ) {
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
    var $message = $("<div>", { class: "messageComplete" });
    var $authorName = $("<span>", { class: "authorName" }).html(
      data.User.name + "&nbsp;&nbsp;"
    );
    var $postedAt = $("<span>", { class: "postedAt" }).html(
      moment(data.createdAt).format("h:mm A")
    );
    var $messageBody = $("<div>", { class: "messageBody" }).html(data.body);
    // Print author and time if conditions are met
    if (printUsername === true) {
      $message.append($authorName);
      $message.append($postedAt);
    }
    $message.append($messageBody);
    return $message;
  }
});

jQuery(document).ready(function() {
  if ($(".cd-stretchy-nav").length > 0) {
    var stretchyNavs = $(".cd-stretchy-nav");

    stretchyNavs.each(function() {
      var stretchyNav = $(this),
        stretchyNavTrigger = stretchyNav.find(".cd-nav-trigger");

      stretchyNavTrigger.on("click", function(event) {
        event.preventDefault();
        stretchyNav.toggleClass("nav-is-visible");
      });
    });

    $(document).on("click", function(event) {
      !$(event.target).is(".cd-nav-trigger") &&
        !$(event.target).is(".cd-nav-trigger span") &&
        stretchyNavs.removeClass("nav-is-visible");
    });
  }
});
