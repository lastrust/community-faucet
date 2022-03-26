export const inputHandler =
  (cb: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
    cb(e.target.value);

export const stopPropagation = (e: React.MouseEvent<HTMLElement>) =>
  e.stopPropagation();

export const usefulFixed = (v: string | number, fractionDigits?: number) => {
  const num = Number(v);
  return isNaN(num)
    ? Number(0).toFixed(fractionDigits)
    : num.toFixed(fractionDigits);
};
