let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = null; 
let count = 59;
let paused = true;
let minCount = 24;
let taskStartTime; 
let isFocusMode = false; 

time.textContent = `${minCount + 1}:00`;


const calculateTimeSpent = () => {
    let currentTime = new Date();
    let elapsedTime = (currentTime - taskStartTime) / 1000; 
    let minutes = Math.floor(elapsedTime / 60); 
    console.log(`Time spent: ${minutes} minutes`); 
    return minutes;
};


const pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
    console.log("Timer paused"); 
};


const sendTimeSpentToServer = (timeSpent) => {
    console.log(`Task ID: ${taskId}`); 
  
    if (timeSpent === 0) {
        timeSpent = calculateTimeSpent();
    }
    let form = document.getElementById(`CompleteLater_${taskId}`);
    let timeInput = form.querySelector("input[name='timePerTask']");
    timeInput.value = timeSpent;
    console.log(`Form data: taskID=${taskId}, timePerTask=${timeSpent}`);
    form.submit(); 
};

const sendTimeSpentToServerPerMarkAsDone = (timeSpent) => {
    console.log(`Task ID: ${taskId}`);
    if (timeSpent === 0) {
        timeSpent = calculateTimeSpent();
    }
    let form = document.getElementById(`MarkDonee_${taskId}`);
    let timeInput = form.querySelector("input[name='timePerTask']");
    timeInput.value = timeSpent;
    console.log(`Form data: taskID=${taskId}, timePerTask=${timeSpent}`);
};


const pauseAndSubmit = () => {
    if (!paused) {
        pauseTimer(); 
        if (isFocusMode) {
            let timeSpent = calculateTimeSpent(); 
            sendTimeSpentToServer(timeSpent); 
        }
    }
};

focusButton.addEventListener("click", () => {
    isFocusMode = true; 
    active = "focus"; 
    buttons.forEach((btn) => {
        btn.classList.remove("btn-focus");
    });
    focusButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
    console.log("Focus mode selected"); 
});

shortBreakButton.addEventListener("click", () => {
    isFocusMode = false; 
    active = "short"; 
    buttons.forEach((btn) => {
        btn.classList.remove("btn-focus");
    });
    shortBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount + 1)}:00`;
    console.log("Short break selected"); 
});

longBreakButton.addEventListener("click", () => {
    isFocusMode = false; 
    active = "long"; 
    buttons.forEach((btn) => {
        btn.classList.remove("btn-focus");
    });
    longBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 14;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
    console.log("Long break selected"); 
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
        taskStartTime = new Date(); 
        console.log("Timer started"); 
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
    console.log("Timer reset"); 
});

function appendZero(value) {
    return value < 10 ? `0${value}` : value;
}
