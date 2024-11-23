import { manufacturerMap } from "../../../utils/parts-helpers";
import { hyundai } from "../../../constants/parts/Hyundai_data";
import { toyota } from "../../../constants/parts/Toyota_data";
import { kia } from "../../../constants/parts/Kia_data";

export const manufacturingOptions = Array.from(manufacturerMap).map((m) => ({
  label: m[1],
  value: m[0],
}));
export const carsList = {
  Toyota: toyota,
  Hyundai: hyundai,
  Kia: kia,
};
