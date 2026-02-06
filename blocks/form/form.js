export default async function decorate(block) {
  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Book Session';
  formTitle.className = 'form-title';

  const form = document.createElement('form');
  form.className = 'contact-form';
  form.id = 'book';
  form.noValidate = true;

  const formFields = {};
  const rows = [...block.children];
  
  // Parse form structure
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 3) {
      const field = cells[0].textContent.trim();
      const label = cells[1].textContent.trim();
      const type = cells[2].textContent.trim();

      if (field === 'Field') return;

      if (type === 'required') {
        if (formFields[field]) {
          formFields[field].required = true;
        }
      } else if (type === 'submit') {
        // Skip, we'll add submit button at the end
      } else {
        formFields[field] = {
          name: field,
          label: label,
          type: type,
          required: false
        };
      }
    }
  });

  // Create form fields
  Object.values(formFields).forEach(fieldData => {
    const wrapper = createFormField(fieldData);
    form.appendChild(wrapper);
  });

  // Add submit button at the end
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Submit';
  button.className = 'form-submit';
  form.appendChild(button);

  // Setup validation
  setupValidation(form);

  block.textContent = '';
  block.appendChild(formTitle);
  block.appendChild(form);
}

function createFormField(fieldData) {
  const wrapper = document.createElement('div');
  wrapper.className = 'form-field';

  let input;
  if (fieldData.type === 'textarea') {
    input = document.createElement('textarea');
    input.rows = 5;
    input.id = 'eventDetails';
  } else {
    input = document.createElement('input');
    input.type = fieldData.type;
    input.id = fieldData.name;
  }

  input.name = fieldData.name;
  input.placeholder = fieldData.label + (fieldData.required ? ' *' : '');
  
  if (fieldData.required) {
    input.required = true;
  }

  // Set min date for date input
  if (fieldData.type === 'date') {
    const today = new Date().toISOString().split("T")[0];
    input.setAttribute("min", today);
  }

  const errorMsg = document.createElement('span');
  errorMsg.className = 'error-message';
  errorMsg.id = fieldData.name + 'Error';

  wrapper.appendChild(input);
  wrapper.appendChild(errorMsg);

  return wrapper;
}

function setupValidation(form) {
  const nameInput = form.querySelector('#name');
  const phoneInput = form.querySelector('#phone');
  const emailInput = form.querySelector('#email');
  const dateInput = form.querySelector('#date');
  const eventDetails = form.querySelector('#eventDetails');

  // Phone number - only digits, max 10
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      // Remove non-digit characters
      this.value = this.value.replace(/\D/g, '');
      // Limit to 10 digits
      if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
      }
      phoneValidate();
    });
    phoneInput.addEventListener('blur', phoneValidate);
  }

  // Name validation
  if (nameInput) {
    nameInput.addEventListener('input', nameValidate);
    nameInput.addEventListener('blur', nameValidate);
  }

  // Email validation
  if (emailInput) {
    emailInput.addEventListener('input', emailValidate);
    emailInput.addEventListener('blur', emailValidate);
  }

  // Date validation
  if (dateInput) {
    dateInput.addEventListener('input', dateValidate);
    dateInput.addEventListener('blur', dateValidate);
  }

  // Event details validation
  if (eventDetails) {
    eventDetails.addEventListener('input', eventDetailsValidate);
    eventDetails.addEventListener('blur', eventDetailsValidate);
  }

  // Form submission
  form.addEventListener('submit', handleSubmit);

  // Validation functions
  function nameValidate() {
    let name = nameInput.value.trim();
    if (name === "") {
      showError("nameError", "Enter your name");
      return false;
    }
    if (!/^[A-Za-z\s]{3,}$/.test(name)) {
      showError("nameError", "Only letters, minimum 3 characters");
      return false;
    }
    clearError("nameError");
    return true;
  }

  function phoneValidate() {
    let phone = phoneInput.value.trim();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      showError("phoneError", "Enter valid 10 digit phone number");
      return false;
    }
    clearError("phoneError");
    return true;
  }

  function emailValidate() {
    let email = emailInput.value.trim();
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.match(emailPattern)) {
      showError("emailError", "Please enter valid mail");
      return false;
    }
    clearError("emailError");
    return true;
  }

  function dateValidate() {
    const date = dateInput.value.trim();
    if (date === "") {
      showError("dateError", "Please select date");
      return false;
    }
    clearError("dateError");
    return true;
  }

  function eventDetailsValidate() {
    const text = eventDetails.value.trim();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    if (text === "") {
      showError("eventError", "Event details cannot be empty");
      return false;
    }

    if (wordCount > 200) {
      showError("eventError", "Word limit is 200 words.");
      return false;
    }

    clearError("eventError");
    return true;
  }

  function showError(id, message) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
      errorElement.innerText = message;
      const input = errorElement.previousElementSibling;
      if (input) {
        input.classList.add('error');
      }
    }
  }

  function clearError(id) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
      errorElement.innerText = "";
      const input = errorElement.previousElementSibling;
      if (input) {
        input.classList.remove('error');
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      nameInput.value.trim() === "" ||
      phoneInput.value.trim() === "" ||
      emailInput.value.trim() === "" ||
      dateInput.value.trim() === "" ||
      eventDetails.value.trim() === ""
    ) {
      alert("Please fill all mandatory (*) fields");
      return;
    }

    // Validate event details first
    if (!eventDetailsValidate()) {
      eventDetails.focus();
      return;
    }

    // Validate all other fields
    const isValid =
      nameValidate() &&
      phoneValidate() &&
      emailValidate() &&
      dateValidate();

    if (!isValid) return;

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);

    alert("Form submitted successfully");
    form.reset();
    
    // Clear all errors
    clearError("nameError");
    clearError("phoneError");
    clearError("emailError");
    clearError("dateError");
    clearError("eventError");
  }
}