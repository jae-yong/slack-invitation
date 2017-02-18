/* eslint no-alert: off */

import axios from 'axios';

import './index.css';

function createSpinner() {
  const spinner = document.createElement('i');
  spinner.className += 'fa fa-spinner fa-spin fa-2x';
  spinner.setAttribute('aria-hidden', 'true');
  return spinner;
}

const invitationForm = document.getElementById('invitationForm');
const inputEmail = document.getElementById('inputEmail');
const btnSend = document.getElementById('btnSendInvitation');

// focus
inputEmail.focus();

invitationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  btnSend.disabled = true;
  btnSend.appendChild(createSpinner());

  axios({
    method: 'POST',
    url: '/api/v1/invitation',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: inputEmail.value,
    },
  })
  .then(() => {
    alert('Sent invitation email successfully.\nCheck your email.');
    location.reload();
  })
  .catch(() => {
    alert('Sending invitation email is fail!\nMaybe you are already invited.');
    location.reload();
  });
});
