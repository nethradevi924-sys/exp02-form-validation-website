"use strict";

const form = document.querySelector("#registration-form");
const successSection = document.querySelector("#success-section");
const summaryList = document.querySelector("#registration-summary");
const registerAnotherButton = document.querySelector("#register-another");
const phoneInput = document.querySelector("#phone");
const pinInput = document.querySelector("#pin-code");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const strengthRow = document.querySelector("#password-strength");
const strengthValue = document.querySelector(".strength-value");

const validators = {
  fullName: validateName,
  email: validateEmail,
  phone: validatePhone,
  dateOfBirth: validateDateOfBirth,
  gender: validateGender,
  address: validateAddress,
  city: validateCity,
  state: validateState,
  pinCode: validatePin,
  password: validatePassword,
  confirmPassword: validateConfirmPassword
};

const validationFields = Object.keys(validators);

function getField(name) {
  return form.elements[name];
}

function getFieldContainer(name) {
  return name === "gender"
    ? document.querySelector(".gender-field")
    : getField(name).closest(".field");
}

function getErrorElement(name) {
  return document.querySelector(`#${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}-error`);
}

function showError(name, message) {
  const field = name === "gender" ? form.querySelector('input[name="gender"]') : getField(name);
  const container = getFieldContainer(name);
  const errorElement = getErrorElement(name);

  container.classList.toggle("is-invalid", Boolean(message));
  container.classList.toggle("is-valid", !message);
  errorElement.textContent = message;

  if (name === "gender") {
    container.querySelectorAll('input[name="gender"]').forEach((radio) => {
      radio.setAttribute("aria-invalid", String(Boolean(message)));
    });
  } else {
    field.setAttribute("aria-invalid", String(Boolean(message)));
  }

  return !message;
}

function validateName() {
  const value = getField("fullName").value.trim();
  if (!value) return "Please enter your full name.";
  if (value.length < 3) return "Full name must be at least 3 characters.";
  if (!/^[A-Za-z ]+$/.test(value)) return "Use letters and spaces only for your full name.";
  return "";
}

function validateEmail() {
  const value = getField("email").value.trim();
  if (!value) return "Please enter your email address.";
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/.test(value)) {
    return "Please enter a valid email address.";
  }
  return "";
}

function validatePhone() {
  const value = getField("phone").value;
  if (!value) return "Please enter your phone number.";
  if (!/^\d{10}$/.test(value)) return "Phone number must contain exactly 10 digits.";
  return "";
}

function validatePin() {
  const value = getField("pinCode").value;
  if (!value) return "Please enter your PIN code.";
  if (!/^\d{6}$/.test(value)) return "PIN code must contain exactly 6 digits.";
  return "";
}

function validatePassword() {
  const value = getField("password").value;
  if (!value) return "Please create a password.";
  if (value.length < 8 || !/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value) || !/[^A-Za-z0-9]/.test(value)) {
    return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.";
  }
  return "";
}

function validateConfirmPassword() {
  const value = getField("confirmPassword").value;
  if (!value) return "Please confirm your password.";
  if (value !== getField("password").value) return "Passwords do not match.";
  return "";
}

function validateDateOfBirth() {
  const value = getField("dateOfBirth").value;
  if (!value) return "Please enter your date of birth.";
  if (value > getToday()) return "Date of birth cannot be in the future.";
  return "";
}

function validateGender() {
  if (!form.querySelector('input[name="gender"]:checked')) return "Please select a gender option.";
  return "";
}

function validateAddress() {
  const value = getField("address").value.trim();
  if (!value) return "Please enter your address.";
  if (value.length < 10) return "Address must be at least 10 characters.";
  return "";
}

function validateCity() {
  if (!getField("city").value.trim()) return "Please enter your city.";
  return "";
}

function validateState() {
  if (!getField("state").value.trim()) return "Please enter your state.";
  return "";
}

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function validateField(name) {
  return showError(name, validators[name]());
}

function validateForm() {
  let isValid = true;
  validationFields.forEach((name) => {
    if (!validateField(name)) isValid = false;
  });
  return isValid;
}

function updatePasswordStrength() {
  const password = passwordInput.value;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password)
  ];
  const score = checks.filter(Boolean).length;
  let strength = "";
  let label = "Not set";

  if (password) {
    if (score <= 2) {
      strength = "weak";
      label = "Weak";
    } else if (score <= 4) {
      strength = "medium";
      label = "Medium";
    } else {
      strength = "strong";
      label = "Strong";
    }
  }

  strengthRow.dataset.strength = strength;
  strengthValue.textContent = label;
}

function showSuccess() {
  form.hidden = true;
  successSection.hidden = false;
  successSection.focus();
}

function displaySummary(formData) {
  const summaryFields = [
    ["Full Name", "fullName"],
    ["Email", "email"],
    ["Phone", "phone"],
    ["Date of Birth", "dateOfBirth"],
    ["Gender", "gender"],
    ["Address", "address"],
    ["City", "city"],
    ["State", "state"],
    ["PIN Code", "pinCode"]
  ];

  summaryList.replaceChildren();
  summaryFields.forEach(([label, name]) => {
    const item = document.createElement("div");
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    item.className = "summary-item";
    term.textContent = label;
    detail.textContent = formData.get(name).toString().trim();
    item.append(term, detail);
    summaryList.append(item);
  });
}

function clearValidationState() {
  validationFields.forEach((name) => {
    const container = getFieldContainer(name);
    container.classList.remove("is-invalid", "is-valid");
    getErrorElement(name).textContent = "";

    if (name === "gender") {
      container.querySelectorAll('input[name="gender"]').forEach((radio) => radio.removeAttribute("aria-invalid"));
    } else {
      getField(name).removeAttribute("aria-invalid");
    }
  });
}

function handleNumericInput(event, limit) {
  event.target.value = event.target.value.replace(/\D/g, "").slice(0, limit);
}

phoneInput.addEventListener("input", (event) => handleNumericInput(event, 10));
pinInput.addEventListener("input", (event) => handleNumericInput(event, 6));

form.querySelectorAll("input, textarea").forEach((input) => {
  const name = input.name === "gender" ? "gender" : input.name;
  if (!validators[name]) return;

  input.addEventListener("blur", () => validateField(name));
  input.addEventListener("input", () => {
    if (getFieldContainer(name).classList.contains("is-invalid") || getFieldContainer(name).classList.contains("is-valid")) {
      validateField(name);
    }
    if (name === "password") {
      updatePasswordStrength();
      if (confirmPasswordInput.value) validateField("confirmPassword");
    }
  });
  input.addEventListener("change", () => {
    if (name === "gender") validateField(name);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateForm()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const formData = new FormData(form);
  displaySummary(formData);
  showSuccess();
});

registerAnotherButton.addEventListener("click", () => {
  form.reset();
  clearValidationState();
  updatePasswordStrength();
  summaryList.replaceChildren();
  successSection.hidden = true;
  form.hidden = false;
  getField("fullName").focus();
});

document.querySelector("#date-of-birth").max = getToday();
updatePasswordStrength();
