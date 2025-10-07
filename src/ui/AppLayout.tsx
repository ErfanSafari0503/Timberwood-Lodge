import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
