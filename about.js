document.onclick = function(showHideDropdown) {
    // Shows/hides profile dropdown and settings menu when user clicks on document.
    // Each of these processess (for the profile and settings seperated by the definition of the variables) is combination of two functions: 
    // showing/hiding dropdown when user clicks on button or image inside the button,
    // hiding when the user clicks elsewhere on the document (checks every time user clicks).
    // The only script in <nav>.

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
}

// nav end