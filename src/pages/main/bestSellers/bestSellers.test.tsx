import { screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import renderWithProviders from '@/tests.helper.tsx';

import BestSellers from '.';

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

const dataFromApi = [
  {
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    price: 19.99,
    brand: 'Glamour Beauty',
    images: ['https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png']
  },
  {
    id: 3,
    title: 'Powder Canister',
    price: 14.99,
    brand: 'Velvet Touch',
    images: ['https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png']
  }
];

describe('BestSellers component', () => {
  afterEach(() => {
    useQueryMock.mockReset();
  });

  it('displays skeletons if query status is pending', () => {
    useQueryMock.mockImplementation(() => ({ isPending: true }));

    renderWithProviders(<BestSellers />);

    expect(screen.getAllByTestId('skeleton').length).toEqual(2);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('displays skeletons if query rejected', () => {
    useQueryMock.mockImplementation(() => ({ isPending: false, isError: true }));

    renderWithProviders(<BestSellers />);

    expect(screen.getAllByTestId('skeleton').length).toEqual(2);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('displays products data', () => {
    useQueryMock.mockImplementation(() => ({
      isPending: false,
      isError: false,
      data: dataFromApi
    }));

    renderWithProviders(<BestSellers />);

    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', `/products/${dataFromApi[0].id}`);
    expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', `/products/${dataFromApi[1].id}`);
    expect(screen.getAllByText('best seller january 2025').length).toEqual(2);
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', dataFromApi[0].images[0]);
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', dataFromApi[1].images[0]);
    expect(screen.getByText(dataFromApi[0].title)).toBeInTheDocument();
    expect(screen.getByText(dataFromApi[1].title)).toBeInTheDocument();
    expect(screen.getByText(dataFromApi[0].brand)).toBeInTheDocument();
    expect(screen.getByText(dataFromApi[1].brand)).toBeInTheDocument();
    expect(screen.getAllByTestId('price')[0]).toHaveTextContent(dataFromApi[0].price + ' €');
    expect(screen.getAllByTestId('price')[1]).toHaveTextContent(dataFromApi[1].price + ' €');
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
  });
});
