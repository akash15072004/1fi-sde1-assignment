import { Navigate, Route, Routes } from "react-router-dom";
import { ProductPage } from "./pages/ProductPage";

export default function App() {
  return (
    <Routes>
      <Route path="/products/:slug" element={<ProductPage />} />
      <Route path="*" element={<Navigate to="/products/iphone-17-pro" replace />} />
    </Routes>
  );
}
