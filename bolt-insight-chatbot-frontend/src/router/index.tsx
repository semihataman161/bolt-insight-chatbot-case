import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeRoute from "@/router/routes/Home";
import LoginRoute from "@/router/routes/Login";
import RegisterRoute from "@/router/routes/Register";
import MainPageRoute from "@/router/routes/MainPage";
import PageNotFound from "@/components/PageNotFound";
import Footer from "@/components/Footer";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login/*" element={<LoginRoute />} />
        <Route path="/register/*" element={<RegisterRoute />} />
        <Route path="/main-page/*" element={<MainPageRoute />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
