export default function numberFormat(value) {
  let result;

  try {
    result = new Intl.NumberFormat().format(value);
  } catch {
    result = 'Не число';
  }

  return result;
}
