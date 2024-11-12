let processes = [];

function addProcess() {
  const form = document.getElementById("processForm");
  const pid = form.elements["pid"].value;
  const arrivalTime = form.elements["arrivalTime"].value;
  const burstTime = form.elements["burstTime"].value;

  processes.push({
    pid: Number(pid),
    arrivalTime: Number(arrivalTime),
    burstTime: Number(burstTime),
  });

  form.reset();
  displayProcesses();
}

function displayProcesses() {
  const table = document.getElementById("processTable");
  table.innerHTML = `
    <tr>
      <th>Process ID</th>
      <th>Arrival Time</th>
      <th>Burst Time</th>
      <th>Completion Time</th>
      <th>Turnaround Time</th>
      <th>Waiting Time</th>
    </tr>
  `;

  processes.forEach((proc) => {
    const row = table.insertRow();
    row.insertCell(0).innerText = proc.pid;
    row.insertCell(1).innerText = proc.arrivalTime;
    row.insertCell(2).innerText = proc.burstTime;
    row.insertCell(3).innerText = proc.completionTime || "";
    row.insertCell(4).innerText = proc.turnaroundTime || "";
    row.insertCell(5).innerText = proc.waitingTime || "";
  });
}

function scheduleProcesses() {
  fetch("/api/schedule", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ processes }),
  })
    .then((response) => response.json())
    .then((data) => {
      processes = data.scheduledProcesses;
      displayProcesses();
    })
    .catch((error) => console.error("Error scheduling processes:", error));
}
