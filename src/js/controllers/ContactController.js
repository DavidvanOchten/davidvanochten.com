import axios from 'axios';

const ContactController = (() => {

  const form = {};

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

    const nameVal = form.root.querySelector('[data-form-input="name"]').value;
    const emailVal = form.root.querySelector('[data-form-input="email"]').value;
    const messageVal = form.root.querySelector('[data-form-input="message"]').value;
    const submitBtn = form.root.querySelector('[data-form-input="submit"]');

    submitBtn.classList.add(form.processingClass);
    spinner.show(true);

    axios.post('/contact', {
      name: nameVal,
      email: emailVal,
      message: messageVal
    })
      .then((resp) => {
        spinner.show(false);

        form.root.classList.add('form--isHidden');
        // transition delay to show button animation?
        // form eventlistener transitionend > showstatus
        // Remove eventlistener on page transition
        submitBtn.classList.remove(form.processingClass);
        submitBtn.classList.add('form__submit--isDone');
        _showStatus(resp);
      })
      .catch((err) => {
        spinner.show(false);
        submitBtn.classList.remove(form.processingClass);
        _showStatus(err);
      });
  };

  const construct = () => {
    form.processingClass = 'form__submit--isProcessing';
    // Add 'check' if form input is valid
    form.root = document.querySelector('[data-form="contact"]');
    form.root.addEventListener('submit', _handleSubmit);
  };

  return {
    init: construct
  };
})();

export default ContactController;