export const roundUp = (numStr: string | undefined, places = 3): string => {
  const factor = Math.pow(10, places);
  const value = parseFloat(numStr || "0");

  if (isNaN(value)) {
    throw new Error("Invalid number string.");
  }

  return (Math.ceil(value * factor) / factor).toFixed(places);
};
