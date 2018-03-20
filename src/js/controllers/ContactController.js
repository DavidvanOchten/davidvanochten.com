import { firebaseConfig } from '../../../firebase.config.js';
import axios from 'axios';

const ContactController = (() => {
  let form = null;

  const _showStatus = (res) => {
    console.log('Handle status', res);
    if (res.status === 200) {
      // hide form
      console.log(res.data);
    } else {
      // show errors / enable form
      console.log(res.data);
    }
  };

  const _handleSubmit = (e) => {
    e.preventDefault();
    const NAME_VAL = e.target.querySelector('[data-form-input="name"]').value;
    const EMAIL_VAL = e.target.querySelector('[data-form-input="email"]').value;
    const MESSAGE_VAL = e.target.querySelector('[data-form-input="message"]').value;

    // Set loader / disable form
    axios.post('/contact', {
      name: NAME_VAL,
      email: EMAIL_VAL,
      message: MESSAGE_VAL
    })
      .then((resp) => {
        // Remove loader
        _showStatus(resp);
      })
      .catch((err) => {
        // Remove loader
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