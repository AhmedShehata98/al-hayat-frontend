export function createData({
  id,
  name,
  image,
  description,
  categoryName,
  discount,
  price,
  quantity,
  categoryOptions = {},
  discountOptions = {},
  actionButtons,
}) {
  return {
    id,
    image,
    name,
    description,
    categoryName,
    discount,
    price,
    quantity,
    categoryOptions,
    discountOptions,
    actionButtons,
  };
}
