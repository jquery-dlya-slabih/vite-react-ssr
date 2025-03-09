import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import renderWithProviders from '@/tests.helper.tsx';

import NotFound from '.';

describe('NotFound page', () => {
  it('displays text content and link to main page', () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByRole('heading')).toHaveTextContent('404');
    expect(screen.getByText('Ooops page not found')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('To main page...');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
