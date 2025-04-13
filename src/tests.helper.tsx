import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { StrictMode } from 'react';
import type { FC, PropsWithChildren, ReactElement } from 'react';
import { BrowserRouter } from 'react-router';

const queryClient = new QueryClient();

function renderWithProviders(ui: ReactElement, renderOptions?: RenderOptions) {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export default renderWithProviders;
