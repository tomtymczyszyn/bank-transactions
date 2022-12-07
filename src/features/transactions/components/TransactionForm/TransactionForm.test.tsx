import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionForm } from './TransactionForm';

describe('Transaction form', () => {
  it("submit without values won't trigger submit action", () => {
    const handleSubmit = vi.fn().mockImplementation(() => {
      return new Promise((resolve) => resolve({}));
    });
    render(<TransactionForm onSubmit={handleSubmit} />);
    fireEvent.click(screen.getByText(/Add/i, { selector: 'button' }));
    screen.logTestingPlaygroundURL();

    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });
});
