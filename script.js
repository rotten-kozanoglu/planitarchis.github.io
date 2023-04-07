var form = document.getElementById("texter");

const API_KEY = 'vn-1Q4HaFYt3lBCQ8s9dSmbW3EoenIM0hQADGV0SfnDd9h1MSpD';

function decryptCeaser(text, shift) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i);
    if (c >= 65 && c <= 90) {  // Büyük harfler için
      result += String.fromCharCode(((c - 65 - shift + 26) % 26) + 65);
    }
    else if (c >= 97 && c <= 122) {  // Küçük harfler için
      result += String.fromCharCode(((c - 97 - shift + 26) % 26) + 97);
    }
    else {  // Diğer karakterler için
      result += text.charAt(i);
    }
  }
  return result;
}


function openSettings() {
  var settings = document.querySelector('.profile-wrapper');
  if (settings.classList.contains('open')) {
    settings.classList.remove('open');
    settings.classList.add('close');
    setTimeout(function() {
      settings.style.display = 'none';
      settings.classList.remove('close');
    }, 300);
  } else {
    settings.style.display = 'block';
    setTimeout(function() {
      settings.classList.add('open');
    }, 0);
  }
}

const profileSettings = [
  {username: "This is you, you're magnificent."},
  {avatar: 'files/pfp.jpg'}
]

profileSettings.username = "This is you, you're magnificent.";
profileSettings.avatar = 'files/pfp.jpg';

function updateProfile() {
  var username = document.getElementById("username").value;
  var avatar = document.getElementById("avatar").value;
  profileSettings.username = username;
  if (avatar.startsWith("http") || avatar.startsWith("https")) { 
    profileSettings.avatar = avatar;
  } else {
    alert("For now you can change your profile photo by URL.");
  }
}



async function chatBotMessage(message) {
    const response = await fetch('https://chatgpt-api.shn.hk/v1/s', {
      model: 'gpt-3.5-turbo',
      headers: {
        'Content-Type': 'application/json',
      },
      messages: JSON.stringify({
        role: 'user',
        content: message
      })
    });
    const data = await response.json();
    return data.choices[0].text;
}
var isChatBotResponding = false;

function sendMessage() {
  var userInput = document.getElementById("texter").innerText.trim();
  var chatbox = document.getElementById("chatbox_messages");
  if (isChatBotResponding) {
    return;
  }

  var newMessage = document.createElement("div");
  newMessage.classList.add("message");

  var newMessageContent = document.createElement("div");
  newMessageContent.classList.add("message-content");

  var messageSender = document.createElement("div");
  messageSender.classList.add("message-sender");
  messageSender.innerText = profileSettings.username;
  var messageSenderBefore = window.getComputedStyle(messageSender, ':before');
  messageSender.style.setProperty('--message-sender-before-background-image', 'url(' + profileSettings.avatar + ')');

  var messageText = document.createElement("div");
  messageText.classList.add("message-text");

  // Check if the user input is a link to an image
  if (/\.(jpeg|jpg|gif|png)$/.test(userInput)) {
    var image = document.createElement("img");
    image.src = userInput;
    image.classList.add("message-image");
    messageText.appendChild(image);
  } else {
    messageText.innerText = userInput;
  }

  newMessageContent.appendChild(messageSender);
  newMessageContent.appendChild(messageText);
  newMessage.appendChild(newMessageContent);
  chatbox.appendChild(newMessage);
  document.getElementById("texter").innerText = "";

  isChatBotResponding = true;

  var botMessage = document.createElement("div");
  botMessage.classList.add("message");

  var botMessageContent = document.createElement("div");
  botMessageContent.classList.add("message-content", "botiswriting");

  var botMessageSender = document.createElement("div");
  botMessageSender.classList.add("message-sender");
  botMessageSender.innerText = "ChatopenAI";
  var messageSenderBefore = window.getComputedStyle(botMessageSender, ':before');
  botMessageSender.style.setProperty('--message-sender-before-background-image', 'url(files/chatopenai.jpg)');

  var botMessageText = document.createElement("div");
  botMessageText.classList.add("message-text");
  botMessageText.innerText = "ChatopenAI is typing...";

  botMessageContent.appendChild(botMessageSender);
  botMessageContent.appendChild(botMessageText);
  botMessage.appendChild(botMessageContent);
  chatbox.appendChild(botMessage);

  document.getElementById("texter").classList.add("botiswriting");

  chatBotMessage(userInput).then(function(response) {
    var newBotMessage = document.createElement("div");
    newBotMessage.classList.add("message");

    var newBotMessageContent = document.createElement("div");
    newBotMessageContent.classList.add("message-content");

    var botMessageSender = document.createElement("div");
    botMessageSender.classList.add("message-sender");
    botMessageSender.innerText = "ChatopenAI";
    var messageSenderBefore = window.getComputedStyle(botMessageSender, ':before');
    botMessageSender.style.setProperty('--message-sender-before-background-image', 'url(files/chatopenai.jpg)');

    var botMessageText = document.createElement("div");
    botMessageText.classList.add("message-text");
    botMessageText.innerText = response;

    newBotMessageContent.appendChild(botMessageSender);
    newBotMessageContent.appendChild(botMessageText);
    newBotMessage.appendChild(newBotMessageContent);
    chatbox.appendChild(newBotMessage);

    isChatBotResponding = false;
    botMessage.remove();
    document.getElementById("texter").classList.remove("botiswriting");
    document.getElementById("texter").focus();
  });
}



form.addEventListener("keydown", function(event) {
    var userInput = document.getElementById("texter").innerText.trim();
    if (event.keyCode === 13 && !event.shiftKey) {
        if (userInput === "") {
        return;
        } else {
    var hint = document.querySelector('.hint');
    hint.style.display = 'none';
    event.preventDefault();
    sendMessage();
    }
  }
});
