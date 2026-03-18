import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from '@/components/ui/Header';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />

      <main className="p-8"></main>
    </QueryClientProvider>
  );
}

export default App;
