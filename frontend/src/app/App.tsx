import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from '@/components/ui/Header';
import { Hero } from '@/components/ui/Hero';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Hero />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
