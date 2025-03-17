import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import renderWithProviders from '@/tests.helper.tsx';

import Blog from '.';

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

const dataToTest = [
  {
    id: 12,
    title: 'She was aware that things could go wrong.',
    titleToBe: 'She was aware that things could go wrong',
    body: 'She was aware that things could go wrong. In fact, she had trained her entire life in anticipation.',
    bodyToBe: 'In fact, she had trained her entire life in anticipation.',
    tags: ['love', 'english']
  },
  {
    id: 14,
    title: 'The paper was blank.',
    titleToBe: 'The paper was blank',
    body: "The paper was blank. It shouldn't have been. There should have been writing on the paper, at least.",
    bodyToBe: "It shouldn't have been. There should have been writing on the paper, at least.",
    tags: ['mystery', 'english', 'love']
  },
  {
    id: 18,
    title: 'She had a terrible habit o comparing her life to others',
    titleToBe: 'She had a terrible habit o comparing her life to others',
    body: 'She had a terrible habit o comparing her life to others. She realized that their life experiences were.',
    bodyToBe: '. She realized that their life experiences were.',
    tags: ['history', 'french', 'love']
  },
  {
    id: 22,
    title: 'She has seen this scene before.',
    titleToBe: 'She has seen this scene before',
    body: 'She has seen this scene before. It had come to her in dreams many times before.',
    bodyToBe: 'It had come to her in dreams many times before.',
    tags: ['classic', 'love', 'history']
  }
];

describe('Blog component', () => {
  it('return null if data not provided', () => {
    useInfiniteQueryMock.mockImplementation(() => ({}));

    const view = renderWithProviders(<Blog />);

    expect(view.container).toBeEmptyDOMElement();
  });

  it('display text content', () => {
    useInfiniteQueryMock.mockImplementation(() => ({ data: dataToTest }));

    renderWithProviders(<Blog />);

    expect(screen.getByText('get to know yourself with touché')).toBeInTheDocument();

    screen.getAllByRole('link').forEach((link, index) => {
      const mockData = dataToTest[index];

      expect(link).toHaveAttribute('href', `/posts/${mockData.id}`);
      expect(screen.getByText(mockData.tags[0])).toBeInTheDocument();
      expect(screen.getByText(`${index + 2} min`)).toBeInTheDocument();
      expect(screen.getByText(mockData.titleToBe)).toBeInTheDocument();
      expect(screen.getByText(mockData.bodyToBe)).toBeInTheDocument();
    });
  });

  it('call fetch next page on click more button', async () => {
    const user = userEvent.setup();
    const fetchNextPageMock = vi.fn();

    useInfiniteQueryMock.mockImplementation(() => ({ data: [], hasNextPage: true, fetchNextPage: fetchNextPageMock }));

    renderWithProviders(<Blog />);

    await user.click(screen.getByRole('button'));

    expect(fetchNextPageMock).toHaveBeenCalledOnce();
  });

  it('not render button if no more data to fetch', () => {
    useInfiniteQueryMock.mockImplementation(() => ({ data: [], hasNextPage: false }));

    renderWithProviders(<Blog />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
