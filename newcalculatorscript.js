// Get the display input element
const input = document.getElementById("rawinput");
const result = document.getElementById("result");

// Listen for button clicks inside the calculator button area
document.getElementById("Lower-table").addEventListener("click", buttonClicked);

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
            input.value += event.target.value;
            break;
        case "exe":
            result.value = eval(input.value);
            break;
        case "delete":
            input.value = input.value.slice(0,-1); // removes last char
            break;
        case "clear":
            input.value = "";
            break;
    }
}

