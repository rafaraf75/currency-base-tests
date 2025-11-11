export const convertPLNToUSD = (PLN) => {
  // 1) Brak argumentu → NaN
  if (PLN === undefined) return NaN;

  // 2) Tekst → NaN (nawet jeśli wygląda jak liczba)
  if (typeof PLN === 'string') return NaN;

  // 3) Inny typ niż number/ string → błąd
  if (typeof PLN !== 'number') {
    throw new Error('Invalid input type');
  }

  // 4) Liczba < 0 → $0.00
  if (PLN < 0) return '$0.00';

  // 5) Poprawna liczba → przelicz i sformatuj
  const PLNtoUSD = PLN / 3.5;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
};