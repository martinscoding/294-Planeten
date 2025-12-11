import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlanetList from "../components/PlanetList";
import PlanetDetail from "../components/PlanetDetail";
import AdminForm from "../components/AdminForm";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlanetList />} />
        <Route path="/planet/:id" element={<PlanetDetail />} />
        <Route path="/admin" element={<AdminForm />} />
      </Routes>
    </BrowserRouter>
  );
}
