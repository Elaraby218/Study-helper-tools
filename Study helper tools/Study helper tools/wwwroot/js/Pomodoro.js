let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = null; // Initially, no button is active
let count = 59;
let paused = true;
let minCount = 24;
let taskStartTime; // Variable to store the start time of the task
let isFocusMode = false; // Variable to check if focus mode is selected

time.textContent = `${minCount + 1}:00`;

// Function to calculate the time spent on the task
const calculateTimeSpent = () => {
    let currentTime = new Date();
    let elapsedTime = (currentTime - taskStartTime) / 1000; // Convert milliseconds to seconds
    let minutes = Math.floor(elapsedTime / 60); // Calculate minutes
    console.log(`Time spent: ${minutes} minutes`); // Debug
    return minutes;
};

// Function to pause the timer
const pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
    console.log("Timer paused"); // Debug
};

// Function to send time spent to the server
const sendTimeSpentToServer = (timeSpent) => {
    console.log(`Task ID: ${taskId}`); // Debug
    let form = document.getElementById(`MarkDone_${taskId}`);
    let timeInput = form.querySelector("input[name='timePerTask']");
    timeInput.value = timeSpent;
    console.log(`Form data: taskID=${taskId}, timePerTask=${timeSpent}`); // Debug
    form.submit(); // Submit the form to send time spent to the server
};

// Function to handle pausing the timer and submitting time spent when any button is clicked
const pauseAndSubmit = () => {
    if (!paused) {
        pauseTimer(); // Pause the timer
        if (isFocusMode) {
            let timeSpent = calculateTimeSpent(); // Calculate time spent on the task
            sendTimeSpentToServer(timeSpent); // Send time spent to the server
        }
    }
};

focusButton.addEventListener("click", () => {
    isFocusMode = true; // Set focus mode to true
    active = "focus"; // Set active mode to focus
    buttons.forEach((btn) => {
        btn.classList.remove("btn-focus");
    });
    focusButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
    console.log("Focus mode selected"); // Debug
});

shortBreakButton.addEventListener("click", () => {
    isFocusMode = false; // Set focus mode to false
    active = "short"; // Set active mode to short
    buttons.forEach((btn) => {
        btn.classList.remove("btn-focus");
    });
    shortBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount + 1)}:00`;
    console.log("Short break selected"); // Debug
});

longBreakButton.addEventListener("click", () => {
    isFocusMode = false; // Set focus mode to false
    active = "long"; // Set active mode to long
    buttons.forEach((btn) => {
        btn.classList.remove("btn-focus");
    });
    longBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 14;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
    console.log("Long break selected"); // Debug
});

pause.addEventListener("click", pauseAndSubmit);
reset.addEventListener("click", pauseAndSubmit);
startBtn.addEventListener("click", () => {
    if (taskId === 0) {
        alert("You should Select Task First");
        return;
    }
    if (!active) {
        alert("Please select a mode (Focus, Short Break, Long Break) before starting the timer.");
        return;
    }

    reset.classList.add("show");
    pause.classList.add("show");
    startBtn.classList.add("hide");
    startBtn.classList.remove("show");

    if (paused) {
        paused = false;
        taskStartTime = new Date(); // Set the start time of the task
        console.log("Timer started"); // Debug
        console.log(`Task id = ${taskId}`);
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        set = setInterval(() => {
            count--;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
            if (count == 0) {
                if (minCount != 0) {
                    minCount--;
                    count = 60;
                } else {
                    let timeSpent = calculateTimeSpent();
                    sendTimeSpentToServer(timeSpent);
                    clearInterval(set);

                }
            }
        }, 1000);
    }
});


reset.addEventListener("click", () => {
    pauseTimer();
    switch (active) {
        case "long":
            minCount = 14;
            break;
        case "short":
            minCount = 4;
            break;
        case "focus":
            minCount = 24;
            break;
        default:
            minCount = 24;
            break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
    console.log("Timer reset"); // Debug
});

function appendZero(value) {
    return value < 10 ? `0${value}` : value;
}
