function enableForm() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
  document.querySelector('#form-contact').classList.remove('bounceOut');
  document.querySelector('#form-contact').classList.add('bounceIn');
  document.querySelector('div.contact__feedback').classList.add('contact__feedback--disabled');
}

function successSubmit () {
  document.querySelector('#form-contact').classList.add('animated','bounceOut');
  document.querySelector('div.contact__feedback').classList.remove('contact__feedback--disabled');
}

function handleSubmit() {
  document.querySelector('#form-contact').addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var nameField = document.getElementById('name');
    var emailField = document.getElementById('email');
    var messageField = document.getElementById('message');
    if (!nameField.value) {
      valid = false;
      nameField.classList.add('is-invalid');
    }
    if (nameField.value) {
      nameField.classList.remove('is-invalid');
    }
    if (!emailField.value) {
      valid = false;
      emailField.classList.add('is-invalid');
    }
    if (emailField.value) {
      emailField.classList.remove('is-invalid');
    }

    if (!valid) {
      return
    }
    document.querySelector('.contact-container').classList.add('contact-container--loading');

    setTimeout(function () {
      submitForm(nameField.value, emailField.value, messageField.value);
    }, 2000);
  })
}

function submitForm (name, email, message) {

  var xhr = new XMLHttpRequest();
  var url = 'https://api.hsforms.com/submissions/v3/integration/submit/4150797/c2c24c3f-f34e-4cdd-a971-995910bef28c'

  var data = {
    "submittedAt": new Date().getTime(),
    "fields": [
      {
        "name": "email",
        "value": email
      },
      {
        "name": "firstname",
        "value": name
      },
      {
        "name": "message",
        "value": message
      }
    ]
  }

  var finalData = JSON.stringify(data)

  xhr.open('POST', url);
  // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
  xhr.setRequestHeader('Content-type', 'application/json');

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      document.querySelector('.contact-container').classList.remove('contact-container--loading');
      // alert(xhr.responseText); // Returns a 200 response if the submission is successful.
      successSubmit();
    } else if (xhr.readyState == 4 && xhr.status == 400){
      document.querySelector('.contact-container').classList.remove('contact-container--loading');
      alert(xhr.responseText); // Returns a 400 error the submission is rejected.
    } else if (xhr.readyState == 4 && xhr.status == 403){
      document.querySelector('.contact-container').classList.remove('contact-container--loading');
      alert(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.
    } else if (xhr.readyState == 4 && xhr.status == 404){
      document.querySelector('.contact-container').classList.remove('contact-container--loading');
      alert(xhr.responseText); //Returns a 404 error if the formGuid isn't found
    }
  }

  xhr.send(finalData);
}

setTimeout( function () { handleSubmit() }, 1000);