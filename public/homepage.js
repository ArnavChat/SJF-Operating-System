let orders = [];

function addOrder() {
  const form = document.getElementById("orderForm");
  const pid = form.elements["pid"].value;
  const arrivalTime = form.elements["arrivalTime"].value;
  const burstTime = form.elements["burstTime"].value;

  orders.push({
    pid: Number(pid),
    arrivalTime: Number(arrivalTime),
    burstTime: Number(burstTime),
  });

  form.reset();
  displayOrders();
}

function displayOrders() {
  const table = document.getElementById("orderTable");
  table.innerHTML = `
    <tr>
      <th>Order ID</th>
      <th>Order Time</th>
      <th>Preparation Time</th>
      <th>Completion Time</th>
      <th>Total Time in Kitchen</th>
      <th>Waiting Time</th>
    </tr>
  `;

  orders.forEach((order) => {
    const row = table.insertRow();
    row.insertCell(0).innerText = order.pid;
    row.insertCell(1).innerText = order.arrivalTime;
    row.insertCell(2).innerText = order.burstTime;
    row.insertCell(3).innerText = order.completionTime || "";
    row.insertCell(4).innerText = order.turnaroundTime || "";
    row.insertCell(5).innerText = order.waitingTime || "";
  });
}

function scheduleOrders() {
  fetch("/api/schedule", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orders }), // Ensure we are sending "orders" here
  })
    .then((response) => response.json())
    .then((data) => {
      orders = data.scheduledOrders;
      displayOrders();
    })
    .catch((error) => console.error("Error scheduling orders:", error));
}
