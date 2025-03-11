import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Skeleton from '.';

describe('BestSellers Skeleton component', () => {
  it('displays elements with animate class', () => {
    render(<Skeleton />);

    expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse');
  });
});
