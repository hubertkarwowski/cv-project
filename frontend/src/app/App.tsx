import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from '@/components/ui/Header';
import { Hero } from '@/components/ui/Hero';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Hero />
    </QueryClientProvider>
  );
}

export default App;
