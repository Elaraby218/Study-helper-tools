const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});


function previewPhoto(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('photoPreview').style.backgroundImage = 'url(' + e.target.result + ')';
            document.getElementById('photoPath').value = e.target.result; 
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function showValidationTip(message) {
    const validationTip = document.getElementById("validationTip");
    validationTip.textContent = message;
    validationTip.style.display = "block";
}

function hideValidationTip() {
    const validationTip = document.getElementById("validationTip");
    validationTip.textContent = "";
    validationTip.style.display = "none";
}

////////////////////////////////////////////////////////// Elements of the signup form
let userName = document.getElementById("userName");
let submigbtn = document.getElementById("signupBtn");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let phoneNumber = document.getElementById("phoneNumber");
let password = document.getElementById("password");
////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////// Validate username
let userNameVali = function () {
    const userNameValue = userName.value.trim();
    const userNamePattern = /^[a-zA-Z0-9_]+$/;

    if (userNameValue === "") {
        return "Username cannot be empty";
    } else if (!userNamePattern.test(userNameValue)) {
        return "Username can only contain letters, digits, and underscores";
    } else {
        return "";
    }
};
////////////////////////////////////////////////////////////// Username validation end

////////////////////////////////////////////////////////////// Validate first name and last name
let firstNameVali = function () {
    const firstNameValue = firstName.value.trim();
    const regex = /^[a-zA-Z]{1,10}$/;

    if (firstNameValue === "") {
        return "First name cannot be empty";
    } else if (!regex.test(firstNameValue)) {
        return "First name can only contain letters and no more than 10 characters";
    } else {
        return "";
    }
};

let lastNameVali = function () {
    const lastNameValue = lastName.value.trim();
    const regex = /^[a-zA-Z]{1,10}$/;

    if (lastNameValue === "") {
        return "Last name cannot be empty";
    } else if (!regex.test(lastNameValue)) {
        return "Last name can only contain letters and no more than 10 characters";
    } else {
        return "";
    }
};
//////////////////////////////////////////////////////////////// End validate first name and last name

///////////////////////////////////////////////////////////// Start validate email
let emailVali = function () {
    const emailValue = email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        return "Email cannot be empty";
    } else if (!regex.test(emailValue)) {
        return "Invalid Email";
    } else {
        return "";
    }
};
///////////////////////////////////////////////////////////////////// End validate email

////////////////////////////////////////////////////////////////// Start validate phone number
let phoneNumberVali = function () {
    const phoneNumberValue = phoneNumber.value.trim();
    const regex = /^\d{11}$/;

    if (phoneNumberValue === "") {
        return "Phone number cannot be empty";
    } else if (!regex.test(phoneNumberValue)) {
        return "Invalid phone number";
    } else {
        return "";
    }
};
////////////////////////////////////////////////////////// End of phone number validation

////////////////////////////////////////////////////////// Start password validation 
let passwordValidate = function () {
    const passwordValue = password.value.trim();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordValue === "") {
        return "Password cannot be empty";
    } else if (!regex.test(passwordValue)) {
        return "Try a stronger password";
    } else {
        return "";
    }
};
////////////////////////////////////////////////////////// End password validation

// Array of validation functions
let validationFunctions = [
    { func: userNameVali, element: userName },
    { func: firstNameVali, element: firstName },
    { func: lastNameVali, element: lastName },
    { func: emailVali, element: email },
    { func: phoneNumberVali, element: phoneNumber },
    { func: passwordValidate, element: password }
];

document.getElementById('uploadForm').onsubmit = function (event) {
    let isValid = true;

    for (let { func, element } of validationFunctions) {
        let errorMessage = func();
        if (errorMessage) {
            showValidationTip(errorMessage);
            isValid = false;
            element.focus();
            break;
        }
    }

    if (!isValid) {
        event.preventDefault();
    } else {
        return;
    }
};

// Attach onblur and onmouseout events to input fields
validationFunctions.forEach(({ func, element }) => {
    element.addEventListener("blur", function () {
        let errorMessage = func();
        if (errorMessage) {
            showValidationTip(errorMessage);
        } else {
            hideValidationTip();
        }
    });
    element.addEventListener("mouseout", function () {
        let errorMessage = func();
        if (errorMessage) {
            showValidationTip(errorMessage);
        } else {
            hideValidationTip();
        }
    });
});

