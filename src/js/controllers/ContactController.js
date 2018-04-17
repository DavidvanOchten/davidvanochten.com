import axios from 'axios';
import { setSpinner } from '../utils/setSpinner.js';

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

    const NAME_VAL = form.querySelector('[data-form-input="name"]').value;
    const EMAIL_VAL = form.querySelector('[data-form-input="email"]').value;
    const MESSAGE_VAL = form.querySelector('[data-form-input="message"]').value;
    const SUBMIT_BTN = e.target.querySelector('[data-form-input="submit"]');

    SUBMIT_BTN.classList.add('form__submit--isProcessing');
    setSpinner(true);

    axios.post('/contact', {
      name: NAME_VAL,
      email: EMAIL_VAL,
      message: MESSAGE_VAL
    })
      .then((resp) => {
        setSpinner(false);

        form.classList.add('form--isHidden');
        // transition delay to show button animation?
        // form eventlistener transitionend > showstatus
        // Remove eventlistener on page transition
        SUBMIT_BTN.classList.remove('form__submit--isProcessing');
        SUBMIT_BTN.classList.add('form__submit--isDone');
        _showStatus(resp);
      })
      .catch((err) => {
        setSpinner(false);
        SUBMIT_BTN.classList.remove('form__submit--isProcessing');
        _showStatus(err);
      });
  };

  const _construct = () => {
    // Add 'check' if form input is valid
    form = document.querySelector('[data-form="contact"]');
    form.addEventListener('submit', _handleSubmit);
  };

  return {
    init: _construct
  };
})();

export default ContactController;