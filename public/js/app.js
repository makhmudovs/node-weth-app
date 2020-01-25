const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  const location = search.value;

  if (!location) {
    alert('Please provide and address first then search');
  } else {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then(response => {
      response.json().then(data => {
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo.textContent = '';
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    });
  }

  e.preventDefault();
});
