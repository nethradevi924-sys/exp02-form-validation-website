# Experiment 2: Client-Side Form Validation

A responsive account registration page built with HTML5, CSS3, and vanilla JavaScript. This college laboratory project demonstrates client-side validation, accessible error feedback, password strength indication, and a registration summary.

## Features

- Responsive registration form for personal and contact details
- Field validation on blur and while editing a field after it has been touched
- Clear inline errors and valid/invalid field styling
- Phone and PIN inputs that remove non-digits and enforce their required lengths
- Password requirements and a live strength indicator
- Future date-of-birth prevention
- Success state with a registration summary that never displays the password
- Register-another action that resets the form
- No framework, backend, database, or external API required

## Run the project

### Open directly

Open `index.html` in a modern web browser.

### Use VS Code Live Server

1. Open this project folder in VS Code.
2. Right-click `index.html`.
3. Select **Open with Live Server**.

Alternatively, use Python's built-in local web server from this directory:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Project files

```text
form-validation/
├── index.html   # Semantic registration form and success summary
├── style.css    # Responsive layout, styling, and validation states
├── script.js    # Validation, password strength, and form interactions
└── README.md    # Project overview and run instructions
```

## Validation rules

| Field | Rule |
| --- | --- |
| Full name | Required; at least 3 characters; letters and spaces only |
| Email | Required; must match a valid email format |
| Phone number | Required; exactly 10 digits |
| Date of birth | Required; cannot be in the future |
| Gender | A selection is required |
| Address | Required; at least 10 characters |
| City and state | Required |
| PIN code | Required; exactly 6 digits |
| Password | Required; at least 8 characters with uppercase, lowercase, number, and special character |
| Confirm password | Required; must match the password |

## Privacy note

This is a front-end demonstration only. Form data is processed in the browser and is not sent to or stored on a server.
