import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRoutes } from './routes/AppRoutes';
import { Layout } from './layout/Layout';
import { AuthProvider } from './context/AuthContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
