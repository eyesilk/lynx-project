import { MemoryRouter, Route, Routes } from 'react-router';
import { Welcomes } from '../pages/welcomes';
import { Home } from '../pages/home';
import './styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function() {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Welcomes />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}
