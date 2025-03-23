import { Outlet } from "react-router";

import Header from "./Header";
import Footer from "./Footer";

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Main;
