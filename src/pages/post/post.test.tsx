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

  it('displays product data', () => {
    const dataFromApi = {
      title: 'His mother had always taught him',
      body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind."
    };

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
