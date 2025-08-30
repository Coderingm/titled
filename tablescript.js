// Initialize the expression parser
// Get the display input element and result display
import { create,all } from 'mathjs';

const math = create(all);

function calc( ) {
    let input = document.getElementById("rawinput");
    const result = document.getElementById("result");
    let newstring = ""; // Stores the raw input for evaluation
    let newstringCursor = 0;
    let superscript = false;
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

    function cursor(pos) {
        input.focus();
        input.setSelectionRange(pos, pos);
    }

    function buttonClicked(event) {
        if (event.target.tagName !== "BUTTON") return;

        const startcursor = input.selectionStart;
        const endcursor = input.selectionEnd;
        const buttonid = event.target.getAttribute("id");
        let buttoninput = event.target.innerHTML;
        let valueinput = event.target.value;

        newstringCursor = startcursor;

        switch (buttonid) {
            case "exe":
                try {
                    result.value = math.evaluate(newstring);
                } catch (error) {
                    result.value = "Error";
                }
                break;
            case "delete":
                input.value = input.value.slice(0, startcursor - 1) + input.value.slice(endcursor);
                cursor(startcursor - 1);
                newstring = newstring.slice(0, newstringCursor - 1) + newstring.slice(newstringCursor);
                newstringCursor = math.max(0, newstringCursor - 1); // Changed from Parser.parse
                break;
            case "clear":
                input.value = "";
                result.value = "";
                newstring = "";
                newstringCursor = 0;
                superscript = false;
                break;
            case "x10sup":
                const newx10sup = "x10^("; // Fixed declaration
                input.value = input.value.slice(0, startcursor) + buttoninput + input.value.slice(endcursor);
                cursor(startcursor + buttoninput.length);
                newstring = newstring.slice(0, newstringCursor) + newx10sup + newstring.slice(newstringCursor);
                newstringCursor += newx10sup.length;
                superscript = true;
                break;
            default:
                if (superscript) {
                    buttoninput = superscriptdict[buttoninput] || buttoninput;
                    newstringCursor += 1; // Account for added parentheses in raw string
                }
                input.value = input.value.slice(0, startcursor) + buttoninput + input.value.slice(endcursor);
                cursor(startcursor + buttoninput.length);
                newstring = newstring.slice(0, newstringCursor) + valueinput + newstring.slice(newstringCursor);
                newstringCursor += valueinput.length;
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
                superscript = false;
                break;
            case "up":
                cursor(0);
                break;
            case "down":
                cursor(input.value.length);
                break;
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    calc();
});


