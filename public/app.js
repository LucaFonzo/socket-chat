const btnSend = document.querySelector('#btn-send');
const inputMessage = document.querySelector('#message');
const messagesContainer = document.querySelector('.messages-container');

const socket = io();

btnSend.addEventListener('click', (e) => {
  const message = inputMessage.value;
  socket.emit('message', message);
})

socket.on('send-message', ({ id, message }) => {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.innerHTML = `
  <span class="user-name">${id}:</span>${message}
  `;
  div.appendChild(p);
  messagesContainer.appendChild(div);
})