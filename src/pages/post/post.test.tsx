import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import renderWithProviders from '@/tests.helper.tsx';

import Post from '.';

describe('Post page', () => {
  it('displays loading stub if query status is pending', () => {
    renderWithProviders(<Post />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it.skip('displays error stub if query rejected', () => {
    renderWithProviders(<Post />);

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });

  it.skip('displays product data', async () => {
    renderWithProviders(<Post />);

    const title = await screen.findByText('She was aware that things could go wrong');

    expect(title).toBeInTheDocument();
  });
});
