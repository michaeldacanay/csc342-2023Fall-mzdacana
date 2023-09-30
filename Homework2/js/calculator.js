const history = document.querySelector('.history-list-container')

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

