import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
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

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
