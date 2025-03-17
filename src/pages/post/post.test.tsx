import { screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import renderWithProviders from '@/tests.helper.tsx';

import Post from '.';

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
  title: 'His mother had always taught him',
  body: 'His mother had always taught him not to ever think of himself as better than others.'
};

describe('Post page', () => {
  afterEach(() => {
    useQueryMock.mockReset();
  });

  it('displays loading stub if query status is pending', () => {
    useQueryMock.mockImplementation(() => ({ isPending: true }));

    renderWithProviders(<Post />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error stub if query rejected', () => {
    useQueryMock.mockImplementation(() => ({ isPending: false, isError: true }));

    renderWithProviders(<Post />);

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });

  it('displays post data', () => {
    useQueryMock.mockImplementation(() => ({
      isPending: false,
      isError: false,
      data: dataFromApi
    }));

    renderWithProviders(<Post />);

    expect(screen.getByRole('heading')).toHaveTextContent(dataFromApi.title);
    expect(screen.getByText(dataFromApi.body)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Back');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
