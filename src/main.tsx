import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { todoApiSlice } from "./api/mainApi.tsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Post from "./post.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'post/:todoId',
    element: <Post />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={todoApiSlice}>
      <RouterProvider router={router} />
    </ApiProvider>
  </React.StrictMode>
);
