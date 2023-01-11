import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { MainPage } from "./pages/Main";
import { PrepPage } from "./pages/Prep";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/prep" element={<PrepPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};