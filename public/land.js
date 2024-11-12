// Custom cursor effect
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

document.addEventListener('mousedown', () => {
    cursor.style.width = '30px';
    cursor.style.height = '30px';
});

document.addEventListener('mouseup', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
});

// Automated SJF Game Simulation
let totalTime = 0;
const totalTimeDisplay = document.getElementById("total-time");
const tasks = Array.from(document.querySelectorAll(".task"));

// Sort tasks by time for SJF order
tasks.sort((a, b) => a.getAttribute("data-time") - b.getAttribute("data-time"));

// Function to process tasks one by one
function processTasks(index = 0) {
    if (index < tasks.length) {
        const task = tasks[index];
        const time = parseInt(task.getAttribute("data-time"));

        // Mark task as "in-process"
        task.classList.add("in-process");

        // Set timeout to simulate task processing
        setTimeout(() => {
            // After task is processed
            task.classList.remove("in-process");
            task.classList.add("completed");
            totalTime += time;
            totalTimeDisplay.textContent = totalTime;

            // Process the next task
            processTasks(index + 1);
        }, time * 1000);  // Scale time duration as seconds for each task (1 min = 1 second)
    }
}

// Start processing tasks automatically
processTasks();
