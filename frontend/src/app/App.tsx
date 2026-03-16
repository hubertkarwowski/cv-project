import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl font-bold">Hello world</h1>
      <Button variant="outline">Click me</Button>
    </QueryClientProvider>
  );
}

export default App;
