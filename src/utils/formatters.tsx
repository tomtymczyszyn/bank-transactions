import { CURRENCY_SYMBOL } from '../constants/currency';

/**
 *
 * @param amount
 * @returns formatted amount with currency code
 */
export function formatAmount(amount: number | undefined): string {
  if (!amount) {
    return '';
  }
  return `${amount} ${CURRENCY_SYMBOL}`;
}
