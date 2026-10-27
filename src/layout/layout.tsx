import { Outlet } from "react-router";
import Navbar from "../pages/home/components/navbar";
import Footer from "@/pages/home/components/footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-svh">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
