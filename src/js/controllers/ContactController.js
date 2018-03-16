import * as firebase from 'firebase';
import { firebaseConfig } from '../../../firebase.config.js';

const ContactController = (() => {
  firebase.initializeApp(firebaseConfig);
  const MESSAGES_REF = firebase.database().ref('messages');

  const _saveMessage = (email, name) => {
    console.log(email, name);
    MESSAGES_REF.push({ email, name });
  };

  const _handleSubmit = (e) => {
    e.preventDefault();
    const EMAIL_VAL = e.target.querySelector('[data-form-input="email"]').value;
    const NAME_VAL = e.target.querySelector('[data-form-input="name"]').value;
    _saveMessage(EMAIL_VAL, NAME_VAL);
  };

  const construct = () => {
    // Add 'check' if form input is valid
    const FORM = document.querySelector('[data-form="contact"]');
    // console.log(FORM, FORM.querySelectorAll('[data-form-input]'));
    // const FORM_SUBMIT = FORM.querySelector('[data-form-input="submit"]');
    FORM.addEventListener('submit', _handleSubmit);
  };

  return {
    init: construct
  };
})();

export default ContactController;