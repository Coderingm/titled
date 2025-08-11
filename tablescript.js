// Get the display input element and result display
let input = document.getElementById("rawinput");
const result = document.getElementById("result");
let newstring = ""; // Stores the raw input for evaluation

// Dictionary mapping characters to their Unicode superscript equivalents
const superscriptdict = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
    '+': '⁺',
    '-': '⁻',
    '=': '⁼',
    '(': '⁽',
    ')': '⁾',
    'n': 'ⁿ',
    'i': 'ⁱ'
};

// Listen for button clicks in the calculator and arrow areas
document.getElementById("Lower-table").addEventListener("click", buttonClicked);
document.getElementById("arrows").addEventListener("click", move);

let superscript = false; // Flag to indicate if next input should be superscript

/**
 * Sets the caret (cursor) position in the input field.
 * @param {number} pos - The position to set the cursor to.
 */
function cursor(pos) {
    input.focus();
    input.setSelectionRange(pos, pos);
}

/**
 * Handles calculator button clicks:
 * - Appends numbers/symbols by default
 * - Executes expression on "exe"
 * - Deletes last character on "delete"
 * - Clears input on "clear"
 * - Handles superscript input after "x10sup"
 * @param {Event} event - The click event.
 */
function buttonClicked(event) {
    if (event.target.tagName !== "BUTTON") return; // Ignore non-button clicks

    const startcursor = input.selectionStart; // Caret start position
    const endcursor = input.selectionEnd;     // Caret end position
    const buttonid = event.target.getAttribute("id"); // Button ID
    let buttoninput = event.target.innerHTML; // Button display value
    let valueinput = event.target.value;      // Button value (for raw input)

    switch (buttonid) {
        case "exe":
            // Evaluate the expression using math.js and display the result
            result.value = math.evaluate(newstring);
            break;
        case "delete":
            // Remove character before the caret and update input and raw string
            input.value = input.value.slice(0, startcursor - 1) + input.value.slice(endcursor);
            cursor(startcursor - 1);
            newstring = newstring.slice(0, startcursor - 1) + newstring.slice(endcursor);
            break;
        case "clear":
            // Clear both input and result displays
            input.value = "";
            result.value = "";
            newstring = "";
            break;
        case "x10sup":
            // Insert "x10" at caret and set superscript flag for next input
            input.value = input.value.slice(0, startcursor) + buttoninput + input.value.slice(endcursor);
            cursor(startcursor + buttoninput.length);
            newstring = newstring.slice(0, startcursor) + valueinput;
            superscript = true;
            break;
        default:
            // If superscript flag is set, convert input to superscript if possible
            if (superscript) {
                buttoninput = superscriptdict[buttoninput] || buttoninput;
            }
            // Insert button input at caret and update raw string
            input.value = input.value.slice(0, startcursor) + buttoninput + input.value.slice(endcursor);
            cursor(startcursor + buttoninput.length);
            newstring = newstring.slice(0, startcursor) + valueinput + newstring.slice(endcursor);
            break;
    }
}

/**
 * Handles arrow button clicks to move the caret in the input field.
 * @param {Event} event - The click event.
 */
function move(event) {
    if (event.target.tagName !== "BUTTON") return; // Ignore non-button clicks
    let startcursor = input.selectionStart; // Current caret position
    const buttonid = event.target.getAttribute("id"); // Button ID

    switch (buttonid) {
        case "left":
            // Move caret one position left
            startcursor = startcursor - 1;
            cursor(startcursor);
            break;
        case "right":
            // Move caret one position right
            startcursor = startcursor + 1;
            cursor(startcursor);
            break;
        case "up":
            cursor(0);
            break;
        case "down":
            cursor(input.value.length);
            break;
    }
}



