const history = document.querySelector('.history-list-container')
let currentOperator = '+';
let previousValue = 0
let currentAction = null;
let hasDecimal = false;
let error = false;
let addedToHistory = false;

// for (let i = 0; i < 10; i++) {
//     // Create new div element
//     const div = document.createElement("div");
    
//     // Add class, id, and text
//     div.classList.add("history-item");
//     div.id = "history-item" + (i + 1);
//     div.textContent = "This is div number " + (i + 1);

//     // Append the div to the history-list-container
//     history.appendChild(div);
// }

const display = document.querySelector('.calc-grid-item-display')

// numbers
const numberBtns = document.querySelectorAll('.number')
const btn1 = document.querySelector('.calc-grid-item-1')
const btn2 = document.querySelector('.calc-grid-item-2')
const btn3 = document.querySelector('.calc-grid-item-3')
const btn4 = document.querySelector('.calc-grid-item-4')
const btn5 = document.querySelector('.calc-grid-item-5')
const btn6 = document.querySelector('.calc-grid-item-6')
const btn7 = document.querySelector('.calc-grid-item-7')
const btn8 = document.querySelector('.calc-grid-item-8')
const btn9 = document.querySelector('.calc-grid-item-9')
const btn0 = document.querySelector('.calc-grid-item-0')

// operators
const operatorBtns = document.querySelectorAll('.operator')
const divBtn = document.querySelector('.calc-grid-item-div')
const mulBtn = document.querySelector('.calc-grid-item-mul')
const subBtn = document.querySelector('.calc-grid-item-sub')
const addBtn = document.querySelector('.calc-grid-item-add')

// special buttons
const clearBtn = document.querySelector('.calc-grid-item-c')
const eqBtn = document.querySelector('.calc-grid-item-eq')
const decBtn = document.querySelector('.calc-grid-item-dec')
const changeSignBtn = document.querySelector('.calc-grid-item-sign')


numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', e => {
        console.log('Button', e.target.textContent, 'was clicked!');
        if (error) {
            return
        }

        num = e.target.textContent;
        console.log(num)
        console.log('number-currentAction', currentAction)
        if (currentAction == null || currentAction == 'operator') {
            // new number
            if (currentOperator == '-')
                display.textContent = -1 * num;

            display.textContent = num;
        } else if (currentAction == 'number') {
            display.textContent += num;
        }

        currentAction = 'number';
        addedToHistory = false;
    });
});

operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', e => {
        console.log('Button', e.target.textContent, 'was clicked!');
        if (error) {
            return
        }
        // flash display color
        display.classList.add('flash');
        setTimeout(() => {
            display.classList.remove('flash');
        }, 100);

        // override operator action
        if (currentAction == 'operator') {
            currentOperator = e.target.textContent;
            return
        }

        // trigger update display value before processing new operator
        if (!previousValue) {
            previousValue = display.textContent;
        } else {
            if (currentOperator == null) {

            } else if (currentOperator == '+') {
                display.textContent = Number(previousValue) + Number(display.textContent);
            } else if (currentOperator == '-') {
                display.textContent = Number(previousValue) - Number(display.textContent);
            } else if (currentOperator == 'x') {
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
            if (!addedToHistory) {
                const div = document.createElement("div");
                div.classList.add("history-item");
                div.id = "history-item" + (history.children.length + 1);
                div.textContent = display.textContent;
                history.appendChild(div);
            }
            addedToHistory = true;
        }

        currentOperator = e.target.textContent;
        hasDecimal = false;
        currentAction = 'operator';
    });
});

// handle divide by 0
// btn0.addEventListener('click', e => {
//     console.log('Button', e.target.textContent, 'was clicked!');
//     if (currentOperator == '/') {
//         display.textContent = 'Error';
//         error = true;
//     }
// })

clearBtn.addEventListener('click', e => {
    console.log('Button', e.target.textContent, 'was clicked!');
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
});

eqBtn.addEventListener('click', e => {
    console.log('Button', e.target.textContent, 'was clicked!');
    if (error) {
        return
    }
    // flash display color
    display.classList.add('flash');
    setTimeout(() => {
        display.classList.remove('flash');
    }, 100);

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
        } else if (currentOperator == 'x') {
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
    }
    addedToHistory = true;
});

decBtn.addEventListener('click', e => {
    console.log('Button', e.target.textContent, 'was clicked!');
    if (error) {
        return
    }
    
    // decimal can appear at 
    if ((currentAction === null || currentAction == 'number') && !hasDecimal) {
        display.textContent += '.'
        hasDecimal = true;
    }
});


changeSignBtn.addEventListener('click', e => {
    console.log('Button', e.target.textContent, 'was clicked!');
    if (error) {
        return
    }
    // flash display color
    display.classList.add('flash');
    setTimeout(() => {
        display.classList.remove('flash');
    }, 100);

    // console.log('change-button', error)
    display.textContent = display.textContent * -1;
})

