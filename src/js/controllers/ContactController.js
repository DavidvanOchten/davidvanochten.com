import axios from 'axios';

const ContactController = (() => {

  const form = {};

  const _createMessage = (type) => {

    if (type === 'error') {
      if (form.response.data.errors) {
        form.errors = form.response.data.errors.map(error => {
          const inputs = [].slice.call(form.root.querySelectorAll('[data-form-input]'));
          const invalidInput = inputs.filter(item => item.dataset.formInput === error.param);
          const errorMessage = document.createElement('div');
          errorMessage.textContent = error.msg;
          errorMessage.classList.add('form__error');
          invalidInput[0].parentNode.appendChild(errorMessage);
          return errorMessage;
        });
      } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Something went wrong with your submission. Please try again later or send me an email.';
        errorMessage.classList.add('form__message', 'form__message--isVisible', 'form__message--error');
        form.root.parentNode.appendChild(errorMessage);
      }
    }

    if (type === 'success') {
      const successMessage = document.createElement('p');
      successMessage.textContent = 'Ahoy there. I got your message. I will get back to you as soon as possible.';
      successMessage.classList.add('headline', 'form__message');
      form.root.parentNode.appendChild(successMessage);
      form.root.style.height = '0px';

      form.root.addEventListener('transitionend', (e) => {
        if (e.target === form.root) {
          successMessage.classList.add('form__message--isVisible');
        }
      });

      successMessage.addEventListener('transitionend', (e) => {
        if (e.target === form.root) {
          e.target.parentNode.removeChild(e.currentTarget);
          form.errors = [];
        }
      });

      form.root.classList.add('form__isSubmitted');
    }
  };

  const _showStatus = (res) => {
    if (form.errors.length > 0) {
      form.errors.map(item => item.parentNode.removeChild(item));
    }

    form.response = res;

    (res.status === 200)
      ? _createMessage('success')
      : _createMessage('error');
  };

  const _handleSubmit = (e) => {
    e.preventDefault();

    const nameVal = form.nameInput.value;
    const emailVal =  form.emailInput.value;
    const messageVal =  form.messageInput.value;

    form.submitButton.classList.add(form.processingClass);
    spinner.show(true);

    axios.post('/contact', {
      name: nameVal,
      email: emailVal,
      message: messageVal
    })
      .then((resp) => {
        spinner.show(false);

        form.submitButton.classList.remove(form.processingClass);

        _showStatus(resp);
      })
      .catch((err) => {
        spinner.show(false);
        form.submitButton.classList.remove(form.processingClass);
        _showStatus(err.response);
      });
  };

  const construct = () => {
    // Add 'check' if form field value is valid
    form.root = document.querySelector('[data-form="contact"]');
    form.nameInput = form.root.querySelector('[data-form-input="name"]');
    form.emailInput = form.root.querySelector('[data-form-input="email"]');
    form.messageInput = form.root.querySelector('[data-form-input="message"]');
    form.submitButton = form.root.querySelector('[data-form-button="submit"]');

    form.errors = [];
    form.processingClass = 'form__submit--isProcessing';
    form.root.style.height = `${form.root.offsetHeight}px`;

    form.root.addEventListener('submit', _handleSubmit);
  };

  return {
    init: construct
  };
})();

export default ContactController;