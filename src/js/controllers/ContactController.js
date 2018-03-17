import { firebaseConfig } from '../../../firebase.config.js';

const ContactController = (() => {
  firebase.initializeApp(firebaseConfig);
  const MESSAGES_REF = firebase.database().ref('messages');
  let form = null;

  const _saveMessage = (email, name) => {
    MESSAGES_REF.push({ email, name })
      .then((data) => {
        console.log('Data', data);
        // Display pop up with confirmation message. Email has been sent to me.
        form.style.display = 'none';
      })
      .catch((err) => {
        console.log(err);
        // Display pop up with error message
      });
  };

  const _handleSubmit = (e) => {
    e.preventDefault();
    const EMAIL_VAL = e.target.querySelector('[data-form-input="email"]').value;
    const NAME_VAL = e.target.querySelector('[data-form-input="name"]').value;
    _saveMessage(EMAIL_VAL, NAME_VAL);
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