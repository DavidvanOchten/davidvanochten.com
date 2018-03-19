import { firebaseConfig } from '../../../firebase.config.js';

const ContactController = (() => {
  console.log('Handle form submit Firebase possibly in Node?')
  // <script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>

  // firebase.initializeApp(firebaseConfig);
  // const MESSAGES_REF = firebase.database().ref('messages');
  let form = null;

  // const _saveMessage = (name, email, message) => {
  //   MESSAGES_REF.push({ name, email, message })
  //     .then((data) => {
  //       console.log('Data', data);
  //       // Display pop up with confirmation message. Email has been sent to me.
  //       // Add class that disables/hides form
  //       form.style.display = 'none';
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // Display pop up with error message
  //     });
  // };

  const _handleSubmit = (e) => {
    e.preventDefault();
    const NAME_VAL = e.target.querySelector('[data-form-input="name"]').value;
    const EMAIL_VAL = e.target.querySelector('[data-form-input="email"]').value;
    const MESSAGE_VAL = e.target.querySelector('[data-form-input="message"]').value;
    // _saveMessage(NAME_VAL, EMAIL_VAL, MESSAGE_VAL);
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