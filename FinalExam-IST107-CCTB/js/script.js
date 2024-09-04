/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
    // Array of colors for background change
    const colors = ['#F0E68C', '#FFDAB9', '#FFE4B5', '#D8BFD8', '#B0E0E6', '#AFEEEE', '#E0FFFF', '#98FB98', '#FFDEAD', '#F5DEB3'];

    let index = 0;

    // Function to change background color with a gradient effect
    const changeBackgroundColor = () => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Loop back to the start
    };

    // Change color every 2 seconds with a smooth transition
    setInterval(changeBackgroundColor, 2000);

    let enterButton = document.getElementById("addTask");
    let askUserButton = document.getElementById("askUser");
    let input = document.getElementById("userInput");
    let ul = document.querySelector("ul");
    let item = document.getElementsByTagName("li");

    function inputLength() {
        return input.value.length;
    }

    function listLength() {
        return item.length;
    }

    // Function to check if the task already exists (case-insensitive)
    function isDuplicate(task) {
        let itemsArray = Array.from(item).map(li => li.firstChild.textContent.toLowerCase());
        return itemsArray.includes(task.toLowerCase());
    }

    function createListElement(task) {
        if (isDuplicate(task)) {
            alert("Task already exists!");
            return;
        }

        let li = document.createElement("li");
        li.appendChild(document.createTextNode(task));
        ul.appendChild(li);
        input.value = "";

        function crossOut() {
            li.classList.toggle("done");
        }

        li.addEventListener("click", crossOut);

        let dBtn = document.createElement("button");
        dBtn.appendChild(document.createTextNode("X"));
        li.appendChild(dBtn);
        
        dBtn.addEventListener("click", function () {
            ul.removeChild(li);
        });
    }

    function addListAfterClick() {
        if (inputLength() > 0) {
            createListElement(input.value);
        }
    }

    function addListAfterKeypress(event) {
        if (inputLength() > 0 && event.which === 13) {
            createListElement(input.value);
        }
    }

    function askUserForTasks() {
        let task;
        do {
            task = prompt("Enter a new task:");
            if (task && task.trim()) {
                createListElement(task.trim());
            }
        } while (task && task.trim());
    }

    enterButton.addEventListener("click", addListAfterClick);
    input.addEventListener("keypress", addListAfterKeypress);
    askUserButton.addEventListener("click", askUserForTasks);
});
