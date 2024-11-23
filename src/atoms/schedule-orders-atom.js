import { atom } from "recoil";

export const scheduledOrderAtom = atom({
  key: "scheduled-order",
  default: { assignmentOrders: [] },
});
