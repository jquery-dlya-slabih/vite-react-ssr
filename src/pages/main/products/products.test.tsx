import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import renderWithProviders from '@/tests.helper.tsx';

import Products from '.';

const { useInfiniteQueryMock } = vi.hoisted(() => {
  return { useInfiniteQueryMock: vi.fn() };
});

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual: object = await importOriginal();

  return {
    ...actual,
    useInfiniteQuery: useInfiniteQueryMock
  };
});

describe('Products component', () => {
  it('return null if data not provided', () => {
    useInfiniteQueryMock.mockImplementation(() => ({}));

    const view = renderWithProviders(<Products />);

    expect(view.container).toBeEmptyDOMElement();
  });

  it('display text content', () => {
    const dataToTest = [
      {
        id: 4,
        title: 'Red Lipstick',
        price: 12.99,
        rating: 2.51,
        ratingToBe: 2,
        brand: 'Chic Cosmetics',
        images: ['https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png']
      },
      {
        id: 5,
        title: 'Red Nail Polish',
        price: 8.99,
        rating: 3.91,
        ratingToBe: 3,
        brand: undefined,
        images: ['https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png']
      },
      {
        id: 6,
        title: 'Calvin Klein CK One',
        price: 49.99,
        rating: 4.85,
        ratingToBe: 4,
        brand: 'Calvin Klein',
        images: [
          'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png',
          'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/2.png'
        ]
      },
      {
        id: 7,
        title: 'Chanel Coco Noir Eau De',
        price: 129.99,
        rating: 2.76,
        ratingToBe: 2,
        brand: 'Chanel',
        images: [
          'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png',
          'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/2.png'
        ]
      }
    ];

    useInfiniteQueryMock.mockImplementation(() => ({ data: dataToTest }));

    renderWithProviders(<Products />);

    expect(screen.getByText('Products')).toBeInTheDocument();

    screen.getAllByRole('link').forEach((link, index) => {
      const mockData = dataToTest[index];

      expect(link).toHaveAttribute('href', `/products/${mockData.id}`);
      expect(screen.getByAltText(mockData.title)).toHaveAttribute('src', `${mockData.images[0]}`);

      if (mockData.brand) {
        expect(screen.getByText(mockData.brand)).toBeInTheDocument();
      } else {
        expect(screen.getByText('brand not found')).toBeInTheDocument();
      }

      expect(screen.getAllByTestId(`star_${mockData.id}`).length).toEqual(mockData.ratingToBe);
      expect(screen.getByText(mockData.title)).toBeInTheDocument();
      expect(screen.getByText(`${mockData.price} €`)).toBeInTheDocument();
    });
  });

  it('call fetch next page on click more button', async () => {
    const user = userEvent.setup();
    const fetchNextPageMock = vi.fn();

    useInfiniteQueryMock.mockImplementation(() => ({ data: [], hasNextPage: true, fetchNextPage: fetchNextPageMock }));

    renderWithProviders(<Products />);

    await user.click(screen.getByRole('button'));

    expect(fetchNextPageMock).toHaveBeenCalledOnce();
  });

  it('not render button if no more data to fetch', () => {
    useInfiniteQueryMock.mockImplementation(() => ({ data: [], hasNextPage: false }));

    renderWithProviders(<Products />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
