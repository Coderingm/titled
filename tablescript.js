
// Get the display input element
let input = document.getElementById("rawinput");
const result = document.getElementById("result");
let newstring = "";
// Listen for button clicks inside the calculator button area
document.getElementById("Lower-table").addEventListener("click", buttonClicked);

/**
 * Handles calculator button clicks:
 * - Appends numbers/symbols by default
 * - Executes expression on "="
 * - Deletes last character on "delete"
 * - Evaluates the expression using Math.js on "exe"
 * - Clears input on "clear"
 */
function buttonClicked(event) {
    if (event.target.tagName !== "BUTTON") return;

    const buttonid = event.target.getAttribute("id");
    let buttoninput = event.target.innerHTML;
    let valueinput = event.target.value;
    switch (buttonid) {
        case "exe":
            result.value = math.evaluate(newstring); // Use math.js to evaluate
            break;
        case "delete":
            input.value = input.value.slice(0, -1);
            newstring = newstring.slice(0,-1);// removes last char
            break;
        case "clear":
            input.value = "";
            result.value = "";
            newstring = "";
            break;
        default:
            input.value += buttoninput;
            newstring += valueinput;
            break;
    }
}
