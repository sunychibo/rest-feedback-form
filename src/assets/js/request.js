import axios from 'axios';

let feedbackURL = "http://localhost:8083/feedback";
const loaderOverlay = document.querySelector('.feedback-form__overlay');

const xhrPOST = (data) => {
  const jsonString = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  loaderOverlay.style.display = 'block';
  xhr.open("POST", feedbackURL, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function () {
    var responseData = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "201") {
      loaderOverlay.style.display = 'none';
      console.table(responseData);
    } else {
      loaderOverlay.style.display = 'none';
      console.error('Error', xhr.statusText);
    }
  }
  xhr.send(jsonString);
}

const fetchPOST = (data) => {
  loaderOverlay.style.display = 'block';
  fetch(feedbackURL,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(response => {
      response.json();
      loaderOverlay.style.display = 'none';
    })
    .then(responseData => console.table(responseData))
    .catch(responseData => {
      console.error('Error', responseData);
      loaderOverlay.style.display = 'none';
    });
}

const axiosPOST = (data) => {
  loaderOverlay.style.display = 'block';
  axios.post(feedbackURL, data)
    .then((response) => {
      console.table(response.data);
      loaderOverlay.style.display = 'none';
    })
    .catch((error) => {
      console.error('Error', error);
      loaderOverlay.style.display = 'none';
    });
}

export { xhrPOST, fetchPOST, axiosPOST }