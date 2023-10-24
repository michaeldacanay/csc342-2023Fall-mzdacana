const history = document.querySelector('.history-list-container')
let currentOperator = '+';
let previousValue = 0
let currentAction = null;
let hasDecimal = false;
let error = false;
let addedToHistory = false;

const clearHistoryBtn = document.querySelector('.history-clear');

clearHistoryBtn.addEventListener('click', e => {
    console.log('Button', e.target.textContent, 'was clicked!');
    while (history.firstChild) {
        history.removeChild(history.firstChild);
    }
    // remove focus
    e.target.blur();
});

const display = document.querySelector('.calc-grid-item-display')
const calcBtns = document.querySelectorAll('.calc-btn')

// numbers
// const numberBtns = document.querySelectorAll('.number');
// const btn1 = document.querySelector('.calc-grid-item-1');
// const btn2 = document.querySelector('.calc-grid-item-2');
// const btn3 = document.querySelector('.calc-grid-item-3');
// const btn4 = document.querySelector('.calc-grid-item-4');
// const btn5 = document.querySelector('.calc-grid-item-5');
// const btn6 = document.querySelector('.calc-grid-item-6');
// const btn7 = document.querySelector('.calc-grid-item-7');
// const btn8 = document.querySelector('.calc-grid-item-8');
// const btn9 = document.querySelector('.calc-grid-item-9');
// const btn0 = document.querySelector('.calc-grid-item-0');

// operators
// const operatorBtns = document.querySelectorAll('.operator')
// const divBtn = document.querySelector('.calc-grid-item-div')
// const mulBtn = document.querySelector('.calc-grid-item-mul')
// const subBtn = document.querySelector('.calc-grid-item-sub')
// const addBtn = document.querySelector('.calc-grid-item-add')

// special buttons
// const clearBtn = document.querySelector('.calc-grid-item-c')
// const eqBtn = document.querySelector('.calc-grid-item-eq')
// const decBtn = document.querySelector('.calc-grid-item-dec')
// const changeSignBtn = document.querySelector('.calc-grid-item-sign')

// finite state machine: number
function processNumber(num) {
    console.log('IN processNumber')
    if (error) {
        return
    }

    console.log('number', num);
    console.log('number-currentAction-before', currentAction);
    console.log('number-previousValue', previousValue);
    if (currentAction == null || currentAction == 'operator') {
        console.log('starting new number... hasDecimal:', hasDecimal);
        console.log('display the number again', num);
        display.textContent = num;
    } else if (currentAction == 'number') {
        display.textContent += num;
    }

    currentAction = 'number';
    addedToHistory = false;
    console.log('number-currentAction-after', currentAction)
}

calcBtns.forEach(calcBtn => {
    calcBtn.addEventListener('click', e => {
        console.log('Button', e.target.textContent, 'was clicked!');
        // flash display color
        const text = e.target.innerText;
        const operators = ['/', 'x', '-', '+'];

        // e.target.textContent and e.target.innerText are interchangeable for the most part in a button
        if (!isNaN(+text)) {
            processNumber(e.target.textContent);
        } else if (operators.includes(text)) {
            processOperator(e.target.textContent);
        } else {
            switch (text) {
                case 'C':
                    processC();
                    break;
                case '=':
                    processEquals();
                    break;
                case '.':
                    processDecimal();
                    break;
                case '+/-':
                    processChangeSign();
                    break;
                default:
                    break;
            }
        }

        // Remove focus from the button
        e.target.blur();
    });
});

// numberBtns.forEach(numberBtn => {
//     numberBtn.addEventListener('click', e => {
//         console.log('Button', e.target.textContent, 'was clicked!');
//         processNumber(e.target.textContent)

//         // Remove focus from the button
//         e.target.blur();
//     });
// });

function processOperator(op) {
    console.log('IN processOperator')
    if (error || op == 'Shift') {
        console.log('exiting...')
        return
    }
    // flash display color
    display.classList.add('flash');
    setTimeout(() => {
        display.classList.remove('flash');
    }, 100);

    // override operator action
    if (currentAction == 'operator') {
        currentOperator = op;
        return
    }

    // trigger update display value before processing new operator
    if (!previousValue) {
        previousValue = display.textContent;
    } else {
        // what happens when we have a previousValue and currentOperator is null
        if (currentOperator == null) {
            
        } else if (currentOperator == '+') {
            display.textContent = Number(previousValue) + Number(display.textContent);
        } else if (currentOperator == '-') {
            display.textContent = Number(previousValue) - Number(display.textContent);
        } else if (currentOperator == 'x' || currentOperator == '*') {
            display.textContent = Number(previousValue) * Number(display.textContent);
        } else if (currentOperator == '/') {
            if (display.textContent == '0') {
                display.textContent = 'Error';
                error = true;
                return
            }
            display.textContent = Number(previousValue) / Number(display.textContent);
        }

        previousValue = display.textContent;
        // add to history
        if (!addedToHistory && currentOperator) {
            const div = document.createElement("div");
            div.classList.add("history-item");
            div.id = "history-item" + (history.children.length + 1);
            div.textContent = display.textContent;
            history.appendChild(div);

            div.addEventListener('click', function () {
                processNumber(this.textContent);
            });
        }
        addedToHistory = true;
    }

    currentOperator = op;
    hasDecimal = false;
    currentAction = 'operator';
}

// operatorBtns.forEach(operatorBtn => {
//     operatorBtn.addEventListener('click', e => {
//         console.log('Button', e.target.textContent, 'was clicked!');
//         processOperator(e.target.textContent);
//         e.target.blur();
//     });
// });

// handle divide by 0
// btn0.addEventListener('click', e => {
//     console.log('Button', e.target.textContent, 'was clicked!');
//     if (currentOperator == '/') {
//         display.textContent = 'Error';
//         error = true;
//     }
// })

function processC() {
    // flash display color
    display.classList.add('flash');
    setTimeout(() => {
        display.classList.remove('flash');
    }, 100);

    display.textContent = 0;
    currentOperator = null;
    currentAction = null;
    previousValue = 0;
    hasDecimal = false;
    error = false;
}

// clearBtn.addEventListener('click', e => {
//     console.log('Button', e.target.textContent, 'was clicked!');
//     processC();

//     // Remove focus from the button
//     e.target.blur();
// });

function processEquals() {
    console.log('IN processEquals')
    if (error) {
        return
    }
    // flash display color
    display.classList.add('flash');
    setTimeout(() => {
        display.classList.remove('flash');
    }, 100);

    console.log('eq-display', display.textContent);
    console.log('eq-currentOperator', currentOperator);
    console.log('eq-prevValue', previousValue);
    
    // trigger update display value
    if (!previousValue) {
        previousValue = display.textContent;
    } else {
        if (currentOperator == null) {
            
        } else if (currentOperator == '+') {
            display.textContent = Number(previousValue) + Number(display.textContent);
        } else if (currentOperator == '-') {
            display.textContent = Number(previousValue) - Number(display.textContent);
        } else if (currentOperator == 'x' || currentOperator == '*') {
            display.textContent = Number(previousValue) * Number(display.textContent);
        } else if (currentOperator == '/') {
            console.log('HELLO');
            // handle divide by 0
            if (display.textContent == '0') {
                display.textContent = 'Error';
                error = true;
                return
            }
            display.textContent = Number(previousValue) / Number(display.textContent);
        }
        previousValue = display.textContent;
    }

    hasDecimal = false;
    currentAction = null;
    currentOperator = null;
    // add to history
    if (!addedToHistory) {
        const div = document.createElement("div");
        div.classList.add("history-item");
        div.id = "history-item" + (history.children.length + 1);
        div.textContent = display.textContent;
        history.appendChild(div);

        div.addEventListener('click', function () {
            processNumber(this.textContent);
        });
    }
    addedToHistory = true;
}

// eqBtn.addEventListener('click', e => {
//     console.log('Button', e.target.textContent, 'was clicked!');
//     processEquals();
//     e.target.blur();
// });

function processDecimal() {
    if (error) {
        return
    }
    
    // decimal can appear at 
    if (!hasDecimal) {
        if (currentAction == null || currentAction == 'operator') {
            display.textContent = '0.'
            hasDecimal = true;
            currentAction = 'number';
        } else if (currentAction == 'number') {
            display.textContent += '.'
            hasDecimal = true;
        }
    }
}

// decBtn.addEventListener('click', e => {
//     console.log('Button', e.target.textContent, 'was clicked!');
//     processDecimal();
//     e.target.blur();
// });

function processChangeSign() {
    if (error) {
        return
    }

    if (currentAction != 'operator') {
        display.textContent = display.textContent * -1;
        // flash display color
        display.classList.add('flash');
        setTimeout(() => {
            display.classList.remove('flash');
        }, 100);
    }
    
    addedToHistory = false;
}


// changeSignBtn.addEventListener('click', e => {
//     console.log('Button', e.target.textContent, 'was clicked!');
//     if (error) {
//         return
//     }

//     if (currentAction != 'operator') {
//         display.textContent = display.textContent * -1;
//         // flash display color
//         display.classList.add('flash');
//         setTimeout(() => {
//             display.classList.remove('flash');
//         }, 100);
//     }
    
//     addedToHistory = false;
//     e.target.blur();
// })



document.addEventListener('keyup', e => {
    // console.log('Key', e.key, 'was pressed!');
    const key = e.key;
    e.preventDefault();

    // number
    if (/^[0-9]$/.test(key)) {
        console.log('Key', e.key, 'was pressed!');
        processNumber(key);
    } else if (/^[/*+-]$/.test(key) || key === 'x') {
        console.log('Key', e.key, 'was pressed!');
        processOperator(key);
    } else if (key === '=' || key === 'Enter' || key === 'Return') {
        console.log('Key', e.key, 'was pressed!');
        processEquals();
    } else if (key === '.') {
        processDecimal();
    } else if (key === 'c') {
        processC();
    }
});