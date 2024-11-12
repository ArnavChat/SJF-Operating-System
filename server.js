// server.js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/api/schedule", (req, res) => {
    const orders = req.body.orders;
    const scheduledOrders = findSJF(orders);
    res.json({ scheduledOrders });
});

function findSJF(orders) {
    const n = orders.length;
    let currentTime = 0;
    let complete = 0;
    orders.forEach(order => order.completed = false);

    while (complete < n) {
        let minBurst = Number.MAX_SAFE_INTEGER;
        let shortest = -1;

        for (let i = 0; i < n; i++) {
            if (
                orders[i].arrivalTime <= currentTime &&
                !orders[i].completed &&
                orders[i].burstTime < minBurst
            ) {
                minBurst = orders[i].burstTime;
                shortest = i;
            }
        }

        if (shortest === -1) {
            currentTime++;
            continue;
        }

        currentTime += orders[shortest].burstTime;
        orders[shortest].completionTime = currentTime;
        orders[shortest].turnaroundTime = orders[shortest].completionTime - orders[shortest].arrivalTime;
        orders[shortest].waitingTime = orders[shortest].turnaroundTime - orders[shortest].burstTime;
        orders[shortest].completed = true;
        complete++;
    }

    return orders;
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
