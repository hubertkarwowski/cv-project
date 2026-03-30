import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Foother } from '@/components/ui/Foother';
import { Header } from '@/components/ui/Header';
import { Hero } from '@/components/ui/Hero';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Hero />
      <Foother />
    </QueryClientProvider>
  );
}

export default App;
