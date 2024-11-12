const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/api/schedule", (req, res) => {
  const processes = req.body.processes;
  const scheduledProcesses = findSJF(processes);
  res.json({ scheduledProcesses });
});

function findSJF(proc) {
  const n = proc.length;
  let remainingTime = Array.from(proc, (p) => p.burstTime);
  let currentTime = 0;
  let complete = 0;

  while (complete < n) {
    let minBurst = Number.MAX_SAFE_INTEGER;
    let shortest = -1;

    for (let i = 0; i < n; i++) {
      if (
        proc[i].arrivalTime <= currentTime &&
        remainingTime[i] < minBurst &&
        remainingTime[i] > 0
      ) {
        minBurst = remainingTime[i];
        shortest = i;
      }
    }

    if (shortest === -1) {
      currentTime++;
      continue;
    }

    remainingTime[shortest]--;
    if (remainingTime[shortest] === 0) {
      complete++;
      proc[shortest].completionTime = currentTime + 1;
      proc[shortest].turnaroundTime =
        proc[shortest].completionTime - proc[shortest].arrivalTime;
      proc[shortest].waitingTime =
        proc[shortest].turnaroundTime - proc[shortest].burstTime;
    }

    currentTime++;
  }
  return proc;
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
