// Get the display input element
const input = document.getElementById("rawinput");
const result = document.getElementById("result");

// Listen for button clicks inside the calculator button area
document.getElementById("Lower-table").addEventListener("click", buttonClicked);
newinput = input.value.replace("&#10761;", "*");
newinput.replace("&#x00F7", "/");

/**
 * Handles calculator button clicks:
 * - Appends numbers/symbols by default
 * - Executes expression on "="
 * - Deletes first character on "delete"
 * - Clears input on "clear"
 */
function buttonClicked(event) {
    if (event.target.tagName !== "BUTTON") return;

    const buttonid = event.target.getAttribute("id");

    switch (buttonid) {
        default:
            input.value += event.target.innerHTML;
            break;
        case "exe":
            result.value = eval(newinput);
            break;
        case "delete":
            input.value = input.value.slice(0,-1); // removes last char
            break;
        case "clear":
            input.value = "";
            result.value = "";
            break;
    }
}

