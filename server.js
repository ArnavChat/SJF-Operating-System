function findSJF(orders) {
  const n = orders.length;
  let currentTime = 0;
  let complete = 0;
  let scheduledOrders = [];

  // Track completion status for each order
  orders.forEach(order => {
    order.completed = false;
  });

  while (complete < n) {
    let minBurst = Number.MAX_SAFE_INTEGER;
    let shortest = -1;

    // Find the non-completed order with the shortest burst time and has arrived
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

    // If no order is ready, increment time
    if (shortest === -1) {
      currentTime++;
      continue;
    }

    // Process the order fully (non-preemptive)
    currentTime += orders[shortest].burstTime;
    orders[shortest].completionTime = currentTime;
    orders[shortest].turnaroundTime = orders[shortest].completionTime - orders[shortest].arrivalTime;
    orders[shortest].waitingTime = orders[shortest].turnaroundTime - orders[shortest].burstTime;
    orders[shortest].completed = true;

    scheduledOrders.push(orders[shortest]);
    complete++;
  }
  return scheduledOrders;
}
