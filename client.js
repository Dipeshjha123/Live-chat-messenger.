// public/js/client.js
const socket = io();

const form = document.getElementById('sendContainer');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.getElementById('messageContainer');

const appendMessage = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message', position);
  messageContainer.appendChild(messageElement);
};

// Prompt user for name
const name = prompt('Enter your name:');
socket.emit('new-user-joined', name);

// Listen for user joined event
socket.on('user-joined', (name) => {
  appendMessage(`${name} joined the chat`, 'right');
});

// Listen for receive event
socket.on('receive', (data) => {
  appendMessage(`${data.name}: ${data.message}`, 'left');
});

// Listen for left event
socket.on('left', (name) => {
  appendMessage(`${name} left the chat`, 'left');
});

// Handle form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    appendMessage(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
  }
});
