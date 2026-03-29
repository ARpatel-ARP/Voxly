import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import useGetAuthUser from "./hooks/useGetAuthUser";

// ✅ router defined outside component (only created once)
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

// ✅ single App function
const App = () => {
  useGetAuthUser();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;