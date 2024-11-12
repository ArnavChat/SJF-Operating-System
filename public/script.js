let orders = [];

function addOrder() {
  const form = document.getElementById("orderForm");
  const pid = Number(form.elements["pid"].value);
  const arrivalTime = Number(form.elements["arrivalTime"].value);
  const burstTime = Number(form.elements["burstTime"].value);

  orders.push({ pid, arrivalTime, burstTime });
  form.reset();
  displayOrders();
}

function displayOrders() {
  const tableBody = document.getElementById("orderTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";
  orders.forEach(order => {
    const row = tableBody.insertRow();
    row.insertCell(0).innerText = order.pid;
    row.insertCell(1).innerText = order.arrivalTime;
    row.insertCell(2).innerText = order.burstTime;
    row.insertCell(3).innerText = order.completionTime || "";
    row.insertCell(4).innerText = order.turnaroundTime || "";
    row.insertCell(5).innerText = order.waitingTime || "";
  });
}

function scheduleOrders() {
  orders.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime);
  let currentTime = 0;

  orders.forEach(order => {
    order.startTime = Math.max(currentTime, order.arrivalTime);
    order.completionTime = order.startTime + order.burstTime;
    order.turnaroundTime = order.completionTime - order.arrivalTime;
    order.waitingTime = order.turnaroundTime - order.burstTime;
    currentTime = order.completionTime;
  });

  displayOrders();
}

const chatbot = document.getElementById('chatbot');
const chatbotMessages = document.getElementById('chatbot-messages');

function toggleChatbot() {
  const chatbot = document.getElementById("chatbot");
  chatbot.classList.toggle("active");
}


const responses = {
  "what is sjf": "SJF (Shortest Job First) scheduling is a method where the process with the smallest execution time is selected first.",
  "how does sjf work": "SJF selects the process with the shortest burst time first, reducing the average waiting time.",
  "advantages of sjf": "The main advantage of SJF is that it minimizes the average waiting time, which makes it efficient.",
  "disadvantages of sjf": "SJF may cause starvation if shorter processes keep arriving, as longer processes may never get executed.",
  "is sjf preemptive": "SJF can be both preemptive and non-preemptive. In preemptive SJF (also called Shortest Remaining Time First), if a new process arrives with a shorter burst time than the current process, it preempts the current process.",
  "default": "I'm here to help with questions about SJF scheduling. Try asking about 'how SJF works' or its 'advantages'."
};

function sendMessage() {
  const userInput = document.getElementById('user-input').value.toLowerCase();
  displayMessage(userInput, 'user-message');
  document.getElementById('user-input').value = '';

  // Get response based on user input
  const response = responses[userInput] || responses["default"];
  displayMessage(response, 'bot-message');
}

function displayMessage(message, className) {
  const messageElement = document.createElement('div');
  messageElement.className = `chatbot-message ${className}`;
  messageElement.innerText = message;
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}