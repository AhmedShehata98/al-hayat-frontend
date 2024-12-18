export const ORDER_STATUS = new Map();
ORDER_STATUS.set(0, "Pending");
ORDER_STATUS.set(1, "On The Way");
ORDER_STATUS.set(2, "Delivered");
ORDER_STATUS.set(3, "Cancelled");
ORDER_STATUS.set(4, "Scheduled");

export const PAYMENT_STATUS = new Map();
PAYMENT_STATUS.set(0, "Pending");
PAYMENT_STATUS.set(1, "Accepted");
PAYMENT_STATUS.set(2, "Declined");

export function getOrderStatusColor(orderStatus) {
  switch (orderStatus) {
    case 0:
      return "#ff9800";
    case 1:
      return "#4dd0e1";
    case 2:
      return "#81c784";
    case 3:
      return "#e57373";
    case 4:
      return "#c4c4c4";

    default:
      return "#f6f6f6";
  }
}

export function autoAssignOrders(orders = [], employees = []) {
  let currentEmployeeIdx = -1;
  const assignedDrivers = new Set([]);

  for (const order in orders) {
    currentEmployeeIdx += 1;

    if (currentEmployeeIdx > employees.length - 1) {
      currentEmployeeIdx = 0;
    }

    assignedDrivers.add({
      orderId: orders[order].id,
      employeeId: employees[currentEmployeeIdx].id,
    });
  }

  return Array.from(assignedDrivers);
}
