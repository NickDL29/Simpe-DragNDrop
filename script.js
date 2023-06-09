// Add event listeners to items for dragging
const items = document.querySelectorAll(".item");
items.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
});

// Store the initial items
const initialItems = Array.from(
    document.querySelectorAll(".container:nth-of-type(1) .item")
);

// Add event listeners to containers for dropping
const containers = document.querySelectorAll(".container");
containers.forEach((container) => {
    container.addEventListener("dragover", dragOver);
    container.addEventListener("dragenter", dragEnter);
    container.addEventListener("dragleave", dragLeave);
    container.addEventListener("drop", dragDrop);
    container.dataset.containerName = container.querySelector("h2").innerText;
});

// Store the dragged item
let draggedItem = null;

// Drag functions
function dragStart() {
    this.classList.add("dragging");
    draggedItem = this;
}

function dragEnd() {
    this.classList.remove("dragging");
}

// Drop functions
function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("hovered");
}

function dragLeave() {
    this.classList.remove("hovered");
}

function dragDrop() {
    this.classList.remove("hovered");
    this.appendChild(draggedItem);
    draggedItem = null;
    displayMessage("Item dropped successfully!");
}

// Reset function
function resetContainers() {
    const container1 = document.querySelector(".container:nth-of-type(1)");
    const container2 = document.querySelector(".container:nth-of-type(2)");

    // Reset containers
    container1.innerHTML = "<h2>Container 1</h2>";
    container2.innerHTML = "<h2>Container 2</h2>";

    // Append initial items back to container 1
    initialItems.forEach((item) => {
        container1.appendChild(item);
    });

    displayMessage("Containers reset!");
}

// displayMessage function
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'newdiv';
    messageElement.innerHTML = '<span class="msg">' + message + '</span>';
    document.querySelector('.btn_cont').appendChild(messageElement);
    setTimeout(function() {
        document.querySelector('.btn_cont').removeChild(messageElement);
    }, 2000);
}