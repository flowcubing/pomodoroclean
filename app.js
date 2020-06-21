// nav start


document.onclick = function(showHideDropdown) {
    // Shows/hides profile dropdown and settings menu when user clicks on document.
    // Each of these processess (for the profile and settings seperated by the definition of the variables) is combination of two functions: 
    // showing/hiding dropdown when user clicks on button or image inside the button,
    // hiding when the user clicks elsewhere on the document (checks every time user clicks).
    // The only script in <nav>.

    // Old code for settings dropdown (replaced by cliking the settings button to show/hide dropdown in the showHideSettings function):

    // const id = showHideDropdown.target.id;
    // const list = ['gear-icon', 'gear-image', 'profile-icon', 'profile-image', 'settings', 'input-container', 'work-container', 'work-min-container', 'work-input', 'min-work-container', 'sec-work-conatiner', 'break-container', 'break-min-container', 'break-sec-container', 'work-minutes-label', 'work-seconds-label', 'break-minutes-label', 'break-seconds-label', 'work-min', 'work-sec', 'break-min', 'break-sec', 'apply', 'apply-button', 'start-button', 'stop-button', 'reset-button', 'clear-button'];  // contains all of the elemts in settings
    // // lists all of the elemnts inside settings so that when clicked on, settings doesn't dissapear
    // var settings = document.getElementById("settings-container");
    // if (!list.includes(id)) {
    //     if (!profile_dropdown) {
    //         settings.style.opacity = "0";
    //         setTimeout(function dissappear() {
    //             settings.style.display= "none";  // only hide settings div once opacity transition has passed (0.1 s)
    //         }, 100)
    //     }
    // }

    // else if ((showHideDropdown.target.id == "gear-icon") || (showHideDropdown.target.id == "gear-image")) {  // when settings button or settings image is clicked AND settings/profile is not clicked
    //     if (settings.style.opacity < '1') {  // if dropdown is hidden or is being hidden
    //         settings.style.display = "flex";  // display at opacity 0
    //         setTimeout(function appear() {
    //             settings.style.opacity = "1";  // wait one millisecond before changing the opacity to one to seperate 'display: inline' from 'opacity: 1'
    //         }, 1);
    //     }
    //     else {  // if dropdown is visible
    //         if (!profile_dropdown) {
    //             settings.style.opacity = "0";
    //             setTimeout(function dissappear() {
    //                 settings.style.display= "none";  // only hide settings div once opacity transition has passed (0.1 s)
    //             }, 100)
    //         }
    //     }
    // }

    var dropdown = document.getElementById("profile-dropdown");
    if ((showHideDropdown.target.id !== "profile-icon") && (showHideDropdown.target.id !== "profile-image")) {
        // when element clicked wasn't the profile button and wasn't the profile image
        dropdown.style.opacity = '0';
        dropdown.style.pointerEvents = "none";
        // hide dropdown and turn off pointer-events
    }

    else if ((showHideDropdown.target.id == "profile-icon") || (showHideDropdown.target.id == "profile-image")) {  // when profile button or profile image is clicked
        if (dropdown.style.opacity < '1') {  // if dropdown is hidden or is being hidden
            dropdown.style.opacity = '1';
            dropdown.style.pointerEvents = "all"
            // show dropdown and turn on pointer-events
        }
        else {  // if dropdown is visible
            dropdown.style.opacity = '0';
            dropdown.style.pointerEvents = "none";
            // hide dropdown and turn off pointer-events
        }
    }

    // // dropdown for plus button
    // var addDropdown = document.getElementById("add-dropdown");
    // if (showHideDropdown.target.id !== "add-button" && showHideDropdown.target.id !== "button1" && showHideDropdown.target.id !== "button2" && showHideDropdown.target.id !== "add-work-button" && showHideDropdown.target.id !== "add-break-button") {
    //     // when element clicked wasn't the add button
    //     addDropdown.style.opacity = '0';
    //     addDropdown.style.pointerEvents = "none";
    //     // hide dropdown and turn off pointer-events
    // }

    // else if (showHideDropdown.target.id == "add-button") {  // when add button is clicked
    //     if (addDropdown.style.opacity < '1') {  // if dropdown is hidden or is being hidden
    //         addDropdown.style.opacity = '1';
    //         addDropdown.style.pointerEvents = "all"
    //         // show dropdown and turn on pointer-events
    //     }
    //     else {  // if dropdown is visible
    //         addDropdown.style.opacity = '0';
    //         addDropdown.style.pointerEvents = "none";
    //         // hide dropdown and turn off pointer-events
    //     }
    // }
}

// nav end

// timer start

var work_time_min = 25;  // global variable of time in minutes for work periods that the timer will reset to - set as 25 for default
var work_time_sec = 0;   // global variable of time in seconds for work periods that the timer will reset to - set as 0 for default
var break_time_min = 5;  // global variable of time in minutes for break periods that the timer will reset to - set as 5 for default
var break_time_sec = 0;  // global variable of time in seconds for break periods that the timer will reset to - set as 0 for default
var time_min = 25;  // time left on timer in minutes - set as 25 for default
var time_sec = 0;  // time left on timer in seconds - set as 0 for default
var countdown;  // global variable 'countdown' that acts as an object containing the timer. true = running; false = not running
var timer_at_0 = false;
var work = true;  // work period
var paused = false; // differentiates paused time from initial start (unneccessary I think)
var pomodoros = 0;  // global variable for the amount of pomodoros completed
var fraction = 0;  // global variable that holds the fraction of the time completed relative to the total time on the timer
var progress_full = false;  // if true, progress bar is full and timer is at 0
// global variable that determines if the timer should reset to a work period (true - 25 min is default) or a break period (false - 5 min default)
// timer switches between work and break periods
var timer_beep = new Audio("audio/VibesMedium_9600-51.mp3");


function timer() {  // this function gets called when the start button is clicked
    document.getElementById("start-button").style.display = "none";  // hides start button and shows stop button once timer is started
    document.getElementById("stop-button").style.display = "block";

    // unneeded code (I think)

    // if (!paused) {
    //     if (work) {
    //         time_min = work_time_min;
    //         time_sec = work_time_sec;
    //     }
    //     else {
    //         time_min = break_time_min;
    //         time_sec = break_time_sec;
    //     }
    // }

    if (!timer_at_0) {  // makes sure that timer isn't at 0 so negative values aren't shown
        countdown = setInterval(updateTime, 1000);  // every second, update time
    }
}


function updateTime() {  // changes the time variables, but not the time on screen
    time_sec--;

    if (time_sec < 0) {  // BEFORE writing the time, check to see if time_sec is less than 0 - meaning 60 seconds have passed
        time_min--;
        time_sec = 59;
        // remove 1 min and add 60 to time_sec, making it 59
    }

    writeTime();  // actually changes the time on screen
    // note: writeTime() is a seperate function from updateTime() because it gets called by the reset/apply button and the code in updateTime() does not apply

    if ((time_min == 0) && (time_sec == 0)) {  // if timer hits 0
        clearInterval(countdown);
        timer_beep.play();  // play beeping noise
        countdown = false;
        timer_at_0 = true;

        if (work) {
            pomodoros++;  // adds 1 pomodoro if work period completed
        }

        const text = document.getElementById("total-text");
        text.innerHTML = "Total: " + pomodoros + " Pomodoros";

        // workBreak();  // switches to break period (unneccesary beacuse of + work/break buttons)

        // stopTimer() is not used here because it hides the start button which is not necessary

        progress_full = true;
    }

    // after text on screen is written, change fraction to change the amount of colored pixels on the work/break buttons
    if (work) {  // changes work_time and break_time based on work/break period
        fraction = 100 - ((((((time_min * 60) + time_sec) / ((work_time_min * 60) + work_time_sec)).toFixed(2))) * 100);  // the approximate fraction of time completed (if divided by 100)
    }
    else {
        fraction = 100 - ((((((time_min * 60) + time_sec) / ((break_time_min * 60) + break_time_sec)).toFixed(2))) * 100);
    }
    document.getElementById("new-progress").style.width = fraction + "%";  // set width of background div to match progress in pixels

    var button_frac = (fraction * 0.7797).toFixed(2);  // fraction relative to button - width of 77.97 pixels
    if (button_frac <= 10) {  // makes sure that the progress bar isnt super thin
        document.getElementById("new-progress").style.width = "10px";
    }

    if (progress_full) {
        document.getElementById("new-button").className = "completed";  // pomodoro is completed
    }

    //     var rounded_progress_height = ((27.33 + Math.sqrt(25 - Math.pow((button_frac - 5), 2))).toFixed(2)) + "px";
    //     document.getElementById("progress").style.height = rounded_progress_height;
    //     // changes height to match border radius height of original container and adds minimal height of progress bar
    //     // when x = progress, 32.33 = minimal height,
    //     // f(x) = 32.33 + 2(sqrt(25 - x^2))
    // }
    // else {
    //     document.getElementById("progress").style.height = "37.33px";  // resets height back to normal
    // }
    // corrects hight not neccessary?

    // document.getElementById("progress").style.borderRadius = (0.4073 * fraction) + "px";  // "corrects" border radius rounding but actually messes up
}


function writeTime() {  // updates time on the screen; call this function whenever the time on screen needs to change to the current time_min and time_sec values
    timer_at_0 = false;  // resets this variable to be false so timer can start when prompted

    var timer_text = document.getElementById("timer-text")  // the text on screen

    // There are 4 options: time_min < 10 and time_sec < 10; time_min < 10 and time_sec >= 10; time_min > 10 and time_sec < 10; time_min > 10 and time_sec >= 10
    // To display each of these options correctly with a 0 in front when necessary, the following if/else statements are created:

    if (!countdown) {  // makes sure that the countdown does not go back to original time set every second this function is called
        // if no countdown:
        if (work) {
            time_min = work_time_min;
            time_sec = work_time_sec;
        }
        else {
            time_min = break_time_min;
            time_sec = break_time_sec;
        }    
    }

    if (time_min < 10) {
        if (time_sec < 10) {
            timer_text.innerHTML = "0" + time_min + ":0" + time_sec;
        }
        else {
            timer_text.innerHTML = "0" + time_min + ":" + time_sec;
        }
    }

    else {
        if (time_sec < 10) {
            timer_text.innerHTML = time_min + ":0" + time_sec;
        }
        else {
            timer_text.innerHTML = time_min + ":" + time_sec;
        }
    }
}


function workBreak() {  // switches between work and break periods when called / timer hits 0
    if (work) {  // if work period
        work = false;  // switch to break period
    }
    else {  // if break period
        work = true;  // switch to work period
    }
}


function stopTimer() {  // called when the 'stop' button is clicked or when timer needs to be stopped in another function
    timer_beep.pause();
    clearInterval(countdown);
    countdown = false;
    document.getElementById("stop-button").style.display = "none";  // hides stop button and shows start button once timer is stopped
    document.getElementById("start-button").style.display = "block";
    // paused = true; (unnecessary code from earlier)
}


function resetButton() {
    if (progress_full) {
        addButton();
    }
    stopTimer();
    writeTime();
    progress_full = false;
    document.getElementById('new-progress').style.width = '0';
}


function applyButton() {  // changes the time variables based on the values entered by the user, but also changes time on screen

// (comment from reset button function) the same function is used for work and break periods, but the input variable changes to match the 'work-input' or 'break-input' tags

    // paused = false;

    var work_min = document.getElementById("work-min").value;
    var work_sec = document.getElementById("work-sec").value;
    var break_min = document.getElementById("break-min").value;
    var break_sec = document.getElementById("break-sec").value;

    if (parseInt(work_min) >=0 && parseInt(work_sec) > 0) {  // if the time entered is a number and greater than 0
        work_time_min = parseInt(work_min);  // set time to time entered
        work_time_sec = parseInt(work_sec);
        resetButton();
    }    

    else if (work_min == "" && work_sec == "") {  // if both fields are blank
        work_time_min = 25;  // reset time to default
        work_time_sec = 0;
        resetButton();
    }

    else if (work_min == "" && parseInt(work_sec) > 0) {  // if only the amount of seconds is entered
        work_time_min = 0;
        work_time_sec = parseInt(work_sec);
        // set time_min to 0 and use only the amount of seconds entered
        resetButton();
    }

    else if (parseInt(work_min) > 0 && work_sec == "") {  // if only the amount of minutes is entered
        work_time_min = parseInt(work_min)
        work_time_sec = 0;
        // set time_sec to 0 and use only the amouunt of minutes entered
        resetButton();
    }

    else {  // if NaN's are entered, or time is otherwise invalid
        work_time_min = 25;  // set to default
        work_time_sec = 0;
        var invalid_time = true;  // tells the break-input that an invalid time has already been entered and an alert is not needed

        alert("Please enter a valid time");
    }

    if (parseInt(break_min) >=0 && parseInt(break_sec) > 0) {  // if the time entered is a number and greater than 0
        break_time_min = parseInt(break_min);  // set time to time entered
        break_time_sec = parseInt(break_sec);
        resetButton();
    }    

    else if (break_min == "" && break_sec == "") {  // if both fields are blank
        break_time_min = 5;  // reset time to default
        break_time_sec = 0;
        resetButton();
    }

    else if (break_min == "" && parseInt(break_sec) > 0) {  // if only the amount of seconds is entered
        break_time_min = 0;
        break_time_sec = parseInt(break_sec);
        // set time_min to 0 and use only the amount of seconds entered
        resetButton();
    }

    else if (parseInt(break_min) > 0 && break_sec == "") {  // if only the amount of minutes is entered
        break_time_min = parseInt(break_min)
        break_time_sec = 0;
        // set time_sec to 0 and use only the amouunt of minutes entered
        resetButton();
    }

    else {  // if NaN's are entered, or time is otherwise invalid
        break_time_min = 5;  // set to default
        break_time_sec = 0;

        if (!invalid_time) {
            alert("Please enter a valid time");
        }
    }
}


function clearButton() {
    document.getElementById("work-min").value = "";
    document.getElementById("work-sec").value = "";
    document.getElementById("break-min").value = "";
    document.getElementById("break-sec").value = "";
}

function showHideSettings() {  // called when the gear icon is clicked
    var settings = document.getElementById("settings-container");  // settings div
    if (settings.style.opacity != "1") {  // if settings div is hidden
        settings.style.display = "flex";  // display
        settings.style.opacity = "1";
    }
    else if (settings.style.opacity == "1"){  // if settings div is shown
        settings.style.opacity = "0";
        settings.style.display = "none";
    }
}

function addButton() {
    stopTimer();
    writeTime();

    // creates all of the elements inside the Work button
    var new_button = document.createElement("button");  // create new "work" button
    var new_progress = document.createElement("div");  // create progress bar
    var new_hover = document.createElement("hover");  // creates div that will show when hovered
    var new_x = document.createElement("img");  // creates x in new_hover
    var new_button_text = document.createElement("div");  // create button text where "work" will be written
    var new_p = document.createElement("p");  // contains the work text

    // places all child elements of button and replaces old ids
    new_button.appendChild(new_progress);
    document.getElementById("new-progress").className = "old-progress";
    document.getElementById("new-progress").id = "";
    new_progress.id = "new-progress"
    new_progress.className = "old-progress";

    new_button.appendChild(new_hover);
    new_hover.className = "x-hover";

    new_hover.appendChild(new_x);
    new_x.src = "/images/x-icon.png";
    new_x.alt = "x";
    new_x.style = "height: 15px; width: 15px;";

    new_button.appendChild(new_button_text);
    new_button_text.className = "button-text";

    new_button_text.appendChild(new_p)
    if (work) {
        new_p.innerHTML="Work";  // sets text of button to be "Work"
    }
    else {
        new_p.innerHTML="Break";
    }

    var button_target = document.getElementById("new-button");  // find the right button to place the new button before it
    button_target.before(new_button);  // inserts element before the button target
    button_target.className = "old-button";
    new_button.setAttribute("onclick", "style.display = 'none'; removePomodoro(this);");
    new_button.id = "new-button";
    // sets id to new button to insert the next button before that

    // new_work.style.opacity = "0";  // set opacity to 0 for transition
    // new_work.style.opacity = "1";  // transitions to opacity 1
    // transitions don't work?
}


function removePomodoro(el) {  // removes pomodoro from total if it is completed and is called when a button is removed
    if (el.className == "completed" && el.getElementsByTagName("p")[0].innerHTML == "Work") {
        pomodoros--;
        const text = document.getElementById("total-text");
        text.innerHTML = "Total: " + pomodoros + " Pomodoros";
    }
    if (el.id = 'new-button') {
        time_min = 0;
        time_sec = 0;
        timer_at_0 = true;
        writeTime();
        stopTimer();
    }
}

// timer end
