export const convertShutter = (shutterSpeed: number) => {
  const gcd = (a: number, b: number): number => {
    if (b < 0.0000001) return a; // Since there is a limited precision we need to limit the value.

    return gcd(b, Math.floor(a % b)); // Discard any fractions due to limitations in precision.
  };

  const fraction = shutterSpeed;
  const len = fraction.toString().length - 2;

  let denominator = 10 ** len;
  let numerator = fraction * denominator;

  const divisor = gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;

  return `${Math.floor(numerator)}/${Math.floor(denominator)}`;
};
