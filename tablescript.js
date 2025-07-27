// Get the display input element
let input = document.getElementById("rawinput");
const result = document.getElementById("result");
let newstring = "";
/*let superscriptdictionary = {
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "+": "⁺", "-": "⁻",
    "(": "⁽", ")": "⁾",
}
let subscriptdictionary = {
    "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉"
}
let superscript = false;
*/
// Listen for button clicks inside the calculator button area
document.getElementById("Lower-table").addEventListener("click", buttonClicked);
document.getElementById("arrows").addEventListener("click", move);

function cursor(pos) {
    input.focus();
    input.setSelectionRange(pos, pos);
}

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
    /*function superscriptinput(number) {
        input.value = event.target.innerHTML.replace(number, superscriptdictionary[number]);
    }*/
    const startcursor = input.selectionStart;
    const endcursor = input.selectionEnd;
    const buttonid = event.target.getAttribute("id");
    let buttoninput = event.target.innerHTML;
    let valueinput = event.target.value;
    switch (buttonid) {
        case "exe":
            result.value = math.evaluate(newstring); // Use math.js to evaluate
            break;
        case "delete":
            input.value = input.value.slice(0, startcursor - 1) + buttoninput + input.value.slice(endcursor);
            cursor(startcursor - 1);
            newstring = newstring.slice(0, startcursor - 1) + valueinput + newstring.slice(end);// removes last char
            break;
        case "clear":
            input.value = "";
            result.value = "";
            newstring = "";
            break;
        /*case "x10sup":
            superscript = true;
            break; */
        default:
            input.value = input.value.slice(0, startcursor) + buttoninput + input.value.slice(endcursor);
            cursor(startcursor + buttoninput.length);
            newstring = newstring.slice(0, startcursor) + valueinput + newstring.slice(endcursor);
            break;
    }
}
function move(event) {
    if (event.target.tagName !== "BUTTON") return;
    let startcursor = input.selectionStart;
    const buttonid = event.target.getAttribute("id");
    switch (buttonid) {
        case "left":
            startcursor = startcursor - 1;
            break;
        case "right":
            startcursor = startcursor + 1;
            break;
        case "up":
            cursor(0);
            break;
        case "down":
            cursor(input.value.length);
            break;
    }
}



