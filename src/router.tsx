import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home/home";
import Layout from "./layout/layout";
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

export default function Router() {
  return (
        <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
