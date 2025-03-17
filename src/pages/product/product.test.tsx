import { screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import renderWithProviders from '@/tests.helper.tsx';

import Product from '.';

const { useQueryMock } = vi.hoisted(() => {
  return { useQueryMock: vi.fn() };
});

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual: object = await importOriginal();

  return {
    ...actual,
    useQuery: useQueryMock
  };
});

const dataFromApi = {
  title: 'Eyeshadow Palette with Mirror',
  description: 'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating.',
  price: 19.99,
  images: ['https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png']
};

describe('Product page', () => {
  afterEach(() => {
    useQueryMock.mockReset();
  });

  it('displays loading stub if query status is pending', () => {
    useQueryMock.mockImplementation(() => ({ isPending: true }));

    renderWithProviders(<Product />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error stub if query rejected', () => {
    useQueryMock.mockImplementation(() => ({ isPending: false, isError: true }));

    renderWithProviders(<Product />);

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });

  it('displays product data with bad rating', () => {
    const _dataFromApi = { ...dataFromApi, rating: 3.28 };

    useQueryMock.mockImplementation(() => ({
      isPending: false,
      isError: false,
      data: _dataFromApi
    }));

    renderWithProviders(<Product />);

    expect(screen.getByRole('img')).toHaveAttribute('alt', _dataFromApi.title);
    expect(screen.getByRole('img')).toHaveAttribute('src', _dataFromApi.images[0]);
    expect(screen.getByRole('heading')).toHaveTextContent(_dataFromApi.title);
    expect(screen.getByText(`${_dataFromApi.price} €`)).toBeInTheDocument();
    expect(screen.getByText(_dataFromApi.rating)).toBeInTheDocument();
    expect(screen.getByText(_dataFromApi.rating)).toHaveClass('text-orange-300');
    expect(screen.getByText(_dataFromApi.description)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('add to cart');
    expect(screen.getByRole('link')).toHaveTextContent('Back');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('displays product data with good rating', () => {
    const _dataFromApi = { ...dataFromApi, rating: 4 };

    useQueryMock.mockImplementation(() => ({
      isPending: false,
      isError: false,
      data: _dataFromApi
    }));

    renderWithProviders(<Product />);

    expect(screen.getByText(_dataFromApi.rating)).toHaveClass('text-green-600');
  });
});
