import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RegisterForm />
    </QueryClientProvider>
  );
}

export default App;

import { Toaster } from '@/components/ui/sonner';

export function RegisterForm() {
  return (
    <>
      <Toaster />
    </>
  );
}
