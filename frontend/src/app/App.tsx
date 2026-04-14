import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import { Hero } from '@/components/ui/Hero';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <Hero />
        <Footer />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
