import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createLazyRoute } from "./utils/createLazyRoute";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles.ts";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        Component: () => <Navigate replace to="/dashboard" />,
      },
      {
        path: "/dashboard",
        ...createLazyRoute(() => import("./pages/Dashboard.tsx")),
      },
      {
        path: "/bookings",
        ...createLazyRoute(() => import("./pages/Bookings.tsx")),
      },
      {
        path: "/cabins",
        ...createLazyRoute(() => import("./pages/Cabins.tsx")),
      },
      {
        path: "/users",
        ...createLazyRoute(() => import("./pages/Users.tsx")),
      },
      {
        path: "/settings",
        ...createLazyRoute(() => import("./pages/Settings.tsx")),
      },
      {
        path: "/account",
        ...createLazyRoute(() => import("./pages/Account.tsx")),
      },
    ],
  },
  {
    path: "/login",
    ...createLazyRoute(() => import("./pages/Login.tsx")),
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
