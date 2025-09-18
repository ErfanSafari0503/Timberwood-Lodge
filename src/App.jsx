import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles.jsx";

const createLazyRoute = (importFn) => {
  return {
    lazy: async () => {
      const { default: Component } = await importFn();

      return {
        Component: () => <Component />,
      };
    },
  };
};

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
        ...createLazyRoute(() => import("./pages/Dashboard.jsx")),
      },
      {
        path: "/bookings",
        ...createLazyRoute(() => import("./pages/Bookings.jsx")),
      },
      {
        path: "/cabins",
        ...createLazyRoute(() => import("./pages/Cabins.jsx")),
      },
      {
        path: "/users",
        ...createLazyRoute(() => import("./pages/Users.jsx")),
      },
      {
        path: "/settings",
        ...createLazyRoute(() => import("./pages/Settings.jsx")),
      },
      {
        path: "/account",
        ...createLazyRoute(() => import("./pages/Account.jsx")),
      },
    ],
  },
  {
    path: "/login",
    ...createLazyRoute(() => import("./pages/Login.jsx")),
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
