import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from "./pages/Hero/Hero";
import { Layout } from "./components/layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Hero />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
