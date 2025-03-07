import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import renderWithProviders from '@/tests.helper.tsx';

import NotFound from '.';

describe('NotFound page tests', () => {
  it('loads and displays greeting', async () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByText('Ooops page not found')).toBeInTheDocument();
  });
});
