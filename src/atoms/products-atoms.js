import { atom } from "recoil";

export const productsAtoms = atom({
  key: "products-atom",
  default: {
    questions: [],
    answers: [],
  },
});
