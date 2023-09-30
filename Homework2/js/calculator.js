const history = document.querySelector('.history-list-container')
let currentOperator = '+';
let currentDisplay = 0

for (let i = 0; i < 10; i++) {
    // Create new div element
    const div = document.createElement("div");
    
    // Add class, id, and text
    div.classList.add("history-item");
    div.id = "history-item" + (i + 1);
    div.textContent = "This is div number " + (i + 1);

    // Append the div to the history-list-container
    history.appendChild(div);
}

const display = document.querySelector('.calc-grid-item-display')

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

const operatorBtns = document.querySelectorAll('.operator')
const divBtn = document.querySelector('.calc-grid-item-div')
const mulBtn = document.querySelector('.calc-grid-item-mul')
const subBtn = document.querySelector('.calc-grid-item-sub')
const addBtn = document.querySelector('.calc-grid-item-add')

// special buttons
const cBtn = document.querySelector('.calc-grid-item-c')
const eqBtn = document.querySelector('.calc-grid-item-eq')
const decBtn = document.querySelector('.calc-grid-item-dec')


numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', e => {
        console.log('Button', e.target.textContent, 'was clicked!');
    });
});

operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', e => {
        console.log('Button', e.target.textContent, 'was clicked!');
    });
});

cBtn.addEventListener('click', e => {
    console.log('Button', e.target.textContent, 'was clicked!');
});

eqBtn.addEventListener('click', e => {
    console.log('Button', e.target.textContent, 'was clicked!');
});

decBtn.addEventListener('click', e => {
    console.log('Button', e.target.textContent, 'was clicked!');
});
