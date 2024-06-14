import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserPage from "./pages/userpage";
import Homepage from "./pages/homepage";
import Cadastro from "./pages/cadastro";
import Login from "./pages/login";
import { AuthProvider } from "./context/AuthContext";
import JobDetails from "./pages/jobdetails";

const router = createBrowserRouter([
  {
    path: "/userpage",
    element: <UserPage />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "vaga",
    element: <JobDetails />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
