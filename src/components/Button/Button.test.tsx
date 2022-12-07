import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, VariantOptions } from './Button';

describe('Button', () => {
  it('content is being displayed', () => {
    render(<Button variant={VariantOptions.Primary}>Button label</Button>);
    expect(screen.getByText(/Button label/i)).toBeDefined();
  });

  it('onClick event is being fired', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Button label</Button>);
    fireEvent.click(screen.getByText(/Button label/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText(/Button label/i));
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
