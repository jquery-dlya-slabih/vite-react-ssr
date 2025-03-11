import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import renderWithProviders from '@/tests.helper.tsx';

import Main from '.';

describe('Main page', () => {
  it('displays text content', () => {
    renderWithProviders(<Main />);

    expect(screen.getByText('touché choice')).toBeInTheDocument();
  });
});
