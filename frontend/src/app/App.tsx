import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MainLayout } from '@/components/MainLayout';
import { Hero } from '@/components/ui/Hero';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Hero />
      </MainLayout>
    </QueryClientProvider>
  );
}

export default App;
