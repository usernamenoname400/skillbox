export default function numberOfProducts() {
  const result = this.$store.state.cartProducts.length;
  if ([11, 12, 13].includes(result)) {
    return `${result} товаров`;
  }
  if (result % 10 === 1) {
    return `${result} товар`;
  }
  if ([2, 3, 4].includes(result % 10)) {
    return `${result} товара`;
  }
  return `${result} товаров`;
}
