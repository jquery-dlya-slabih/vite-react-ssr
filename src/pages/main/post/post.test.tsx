import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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

const dataToTest = {
  posts: [
    {
      id: 5,
      title: 'Hopes and dreams were dashed that day.',
      titleToBe: 'Hopes and dreams were dashed that day',
      body: 'Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock.',
      bodyToBe: 'It should have been expected, but it still came as a shock.',
      tags: ['crime', 'mystery', 'love']
    }
  ]
};

describe('Post component', () => {
  it('display text content', () => {
    useQueryMock.mockImplementation(() => ({
      data: dataToTest
    }));

    renderWithProviders(<Post />);

    const expectingData = dataToTest.posts[0];

    expect(screen.getByRole('link')).toHaveAttribute('href', `/posts/${expectingData.id}`);
    expect(screen.getByText(expectingData.titleToBe)).toBeInTheDocument();
    expect(screen.getByText(expectingData.bodyToBe)).toBeInTheDocument();
    expect(screen.getByText('4 min')).toBeInTheDocument();

    expectingData.tags.forEach((tag) => {
      expect(screen.getByText(tag, { exact: false })).toBeInTheDocument();
    });
  });

  it('not display text content if data not provided', () => {
    useQueryMock.mockImplementation(() => ({}));

    const view = renderWithProviders(<Post />);

    expect(view.container).toBeEmptyDOMElement();
  });
});
