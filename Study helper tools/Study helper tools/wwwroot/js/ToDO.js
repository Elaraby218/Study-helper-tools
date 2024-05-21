let taskTitle = document.getElementById("taskTitle");
let taskDescription = document.getElementById("taskDescription");
/////////////////////////// show and hide validation tip

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

//////////////////////////////////////////////////////

let taskTitleValidation = function () {
    let taskTitleValue = taskTitle.value;
    let regex = /^[a-zA-Z0-9\s]{1,50}$/;

    if (taskTitleValue === "") {
        return "Task title cannot be empty";
    } else if (!regex.test(taskTitleValue)) {
        return "Task title can only contain letters, digits, and spaces";
    } else {
        return "";
    }
};


//////////////////////////////////////////////////////

let taskDescriptionValidation = function () {
let taskDescriptionValue = taskDescription.value;
        let regex = /^[a-zA-Z0-9\s]{1,200}$/;
    
        if (taskDescriptionValue == "") 
        {
        return "Task description cannot be empty" ;
        } else if (!regex.test(taskDescriptionValue)) {
    return "Task description can only contain letters, digits, and spaces" ;
        } else {
            return ""; 
        }
}


let validationFunctions = [
    { func: taskTitleValidation, element: taskTitle },
    { func: taskDescriptionValidation, element: taskDescription },
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

document.getElementById('uploadForm').onfocus = function (event) {
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

/////////////////////////// done submit button
