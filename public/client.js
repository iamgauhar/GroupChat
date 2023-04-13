const socket = io();

let username;
do {
  username = prompt("Please Enter Your Name: ");
} while (!username);

sendMessage(`< ${username} > has joined the chat`);

document.querySelector("#user").innerHTML = username;
document.getElementById("sendBtn").addEventListener("click", () => {
  let mymsg = document.querySelector("#textarea").value;
  if (mymsg.length > 1) {
    sendMessage(mymsg);

    document.querySelector("#textarea").value = "";
  }
});
document.getElementById("textarea").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    let mymsg = document.querySelector("#textarea").value.trim();
    console.log(mymsg.length);
    if (mymsg.length > 1) {
      sendMessage(mymsg);
      document.querySelector("#textarea").value = "";
    }
  }
});

function sendMessage(message) {
  let msg = {
    user: username,
    message: message,
  };

  appendMessage(msg, "outgoing");
  scroll();

  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let msgDiv = document.createElement("div");
  msgDiv.classList.add(type, "message");

  let markup = `
        <h4> ${msg.user} </h4>
        <p> ${msg.message} </p>
    `;

  msgDiv.innerHTML = markup;
  document.querySelector(".message-area").appendChild(msgDiv);
}

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scroll();
});

function scroll() {
  document.querySelector(".message-area").scrollTop =
    document.querySelector(".message-area").scrollHeight;
}
