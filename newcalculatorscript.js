const inputresult = document.getElementById("result");
const allbutton = document.querySelector("button");
const buttonid = allbutton ? allbutton.getAttribute("id"):null;
document.getElementById("Lower-table").addEventListener("click", buttonClicked )
function buttonClicked(event) {
    if (!buttonid) {
        inputresult.value += event.target.value;
    }else{
        switch (buttonid) {
            case "exe":
                inputresult.value += eval(inputresult.value);
                break;
            case "delete":
                inputresult.value = inputresult.value.slice(1);
                break;
        }
    }

}
