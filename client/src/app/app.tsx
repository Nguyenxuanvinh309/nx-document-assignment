// Uncomment this line to use CSS modules
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { RouterProvider } from "@tanstack/react-router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from '../routers';
import { Container } from '@mantine/core';
import styles from './app.module.scss';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container fluid className={styles.wrapper}>
        <RouterProvider router={router} />
      </Container>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

