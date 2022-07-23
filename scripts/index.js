const ac = document.getElementById("AC");
const display = document.getElementById("display");
const digits = document.querySelectorAll(".digit");
const backBtn = document.getElementById("backspace");
const operands = document.querySelectorAll('.operand');
const equalBtn = document.querySelector('.evaluate');
const plusMinusBtn = document.getElementById("plus-minus");

let displayValue = 0;
let op1 = 0;
let op2 = 0;
let secondOperand = false;
let operand = "";
let negValue = false;
let startFresh = false;

display.textContent = displayValue;

ac.addEventListener("click", clearBtn);

digits.forEach(btn => {
    btn.addEventListener("click", displayDigit);
}); 
backBtn.addEventListener("click", removeDigit);

operands.forEach(opBtn => {
    opBtn.addEventListener("click",
        function () {
            setOperand(opBtn.innerHTML);
        });
});
equalBtn.addEventListener("click",
    function () {
        evaluate();
});
plusMinusBtn.onclick = function () {
    display.textContent *= -1;
    displayValue = display.textContent;

    negValue = true;
    changeExpression();
};
function setOperand(op) {
    display.textContent = "";
    //displayValue =0;
    negValue = false;
    secondOperand = true;
    if (op === 'x<sup>y</sup>') operand = "^";
    else operand = op;

}
function evaluate() {
    if (op1 !== 0 && op2 !== 0 && operand !== "" && secondOperand === true) {
        let res = operate(operand, op1, op2);
        let op = [op1, operand, op2, res];
        clearBtn();
        display.textContent = `${op[0]} ${op[1]} ${op[2]} = ${op[3]}`
        displayValue = res;
        op1 = res;
    }
}
function changeDisplay() {
    display.textContent = "";
    displayValue = 0;
}
function removeDigit() {
    let displayContent = displayValue.toString();
    displayContent = displayContent.slice(0, -1);
    displayValue = displayContent;
    display.textContent = displayValue;

    changeExpression(); 
}

function addDigit(digit) {
    if ((document.getElementById('display').scrollWidth) > (document.getElementById('display').offsetWidth)) {
        return;
    }
    if ((display.textContent.includes('='))) display.textContent = ""; 
    if (display.textContent === "0") {
        display.textContent = "";
        displayValue = 0;
    }
    if ((display.textContent).includes('.') === false) {
        display.textContent += digit;
    }
    else if (display.textContent.includes('.') === true && digit !== '.')
        display.textContent += digit;
        displayValue = display.textContent;
    if ((document.getElementById('display').scrollWidth) > (document.getElementById('display').offsetWidth)) {
        removeDigit();
    }
}
function displayDigit(e) {
    addDigit(e.target.innerHTML);
    changeExpression(); 
}
function changeExpression() {
    if (secondOperand === false) {
        op1 = display.textContent;
    }
    if (op1 !== 0 && secondOperand === true) {
        op2 = display.textContent;
    }
}
function clearBtn() {
    display.textContent = "0";
    op1 = 0;
    op2 = 0;
    operand = "";
    secondOperand = false;
    displayValue = 0;
    negValue = false;
    startFresh = true;
}
function onKeyPress(e) {
    var keynum;
    if (window.event) { // IE                  
        keynum = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                 
        keynum = e.which;
    }
    if (e.key === 'Backspace') removeDigit();  
    else if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*' || e.key === '^') setOperand(e.key);
    else if (e.key === '=' || e.key === 'Enter') evaluate();
    else {
        let pressedKey = String.fromCharCode(keynum);
        if (pressedKey >= 0 && pressedKey <= 9) addDigit(pressedKey);
    }
    changeExpression(); 
}

window.addEventListener('keydown', onKeyPress);

function add(a, b) {
    return (Number(a) + Number(b)).toFixed(2);
}
function subtract(a, b) {
    return (Number(a) - Number(b)).toFixed(2);
}
function multiply(a, b) {
    return (Number(a) * Number(b)).toFixed(2);
}
function divide(a, b) {
    return (Number(a) / Number(b)).toFixed(2);;
}

function operate(operator, operand1 = 0, operand2 = 0) {
    let result = 0;
    switch (operator) {
        case "+":
            result = add(operand1, operand2);
            break;
        case "-":
            result = subtract(operand1, operand2);
            break;
        case "*":
            result = multiply(operand1, operand2);
            break;
        case "/":
            if (operand2 == 0) result = "Infinity&Beyond!";
            else result = divide(operand1, operand2);
            break;
        case "^":
            result = Math.pow(operand1, operand2);
            break;
        default:
            break;
    }
    return result;
}