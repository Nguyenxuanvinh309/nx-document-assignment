// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { RouterProvider } from "@tanstack/react-router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from '../routers';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

