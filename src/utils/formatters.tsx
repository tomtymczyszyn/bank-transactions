import { CURRENCY_SYMBOL } from '../constants/currency';

export function formatAmount(amount: number | undefined): string {
  if (!amount) {
    return '';
  }
  return `${amount} ${CURRENCY_SYMBOL}`;
}
