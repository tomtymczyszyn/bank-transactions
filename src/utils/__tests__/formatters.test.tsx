import { describe, it, expect } from 'vitest';
import { CURRENCY_SYMBOL } from '../../constants/currency';
import { formatAmount } from '../formatters';

describe('format amount', () => {
  it('formatting amount with currency symbol', () => {
    expect(formatAmount(1234)).toBe(`1234 ${CURRENCY_SYMBOL}`);
  });
});
