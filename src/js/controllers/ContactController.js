import axios from 'axios';
import { showSpinner } from '../utils/showSpinner.js';

const ContactController = (() => {
  let form = null;

  const _showStatus = (res) => {
    console.log('Handle status', res);
    if (res.status === 200) {
      // show success
      console.log(res.data);
    } else {
      // show errors
      console.log(res.data);
    }
  };

  const _handleSubmit = (e) => {
    e.preventDefault();

    const nameVal = form.querySelector('[data-form-input="name"]').value;
    const emailVal = form.querySelector('[data-form-input="email"]').value;
    const messageVal = form.querySelector('[data-form-input="message"]').value;
    const submitBtn = e.target.querySelector('[data-form-input="submit"]');

    submitBtn.classList.add('form__submit--isProcessing');
    showSpinner(true);

    axios.post('/contact', {
      name: nameVal,
      email: emailVal,
      message: messageVal
    })
      .then((resp) => {
        showSpinner(false);

        form.classList.add('form--isHidden');
        // transition delay to show button animation?
        // form eventlistener transitionend > showstatus
        // Remove eventlistener on page transition
        submitBtn.classList.remove('form__submit--isProcessing');
        submitBtn.classList.add('form__submit--isDone');
        _showStatus(resp);
      })
      .catch((err) => {
        showSpinner(false);
        submitBtn.classList.remove('form__submit--isProcessing');
        _showStatus(err);
      });
  };

  const construct = () => {
    // Add 'check' if form input is valid
    form = document.querySelector('[data-form="contact"]');
    form.addEventListener('submit', _handleSubmit);
  };

  return {
    init: construct
  };
})();

export default ContactController;