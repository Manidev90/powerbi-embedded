import { MsalProvider } from "@azure/msal-react";
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./assets/eco-feedback.css";
import { msalInstance } from "./auth.config";
import "./bootstrap.scss";
import APP_ROUTES from "./routes";

const Root = () => (
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);

const router = createBrowserRouter(
  [{ element: <Root />, children: APP_ROUTES }],
  {
    // URL from which the application is served. All BrowserRouter URLs are
    // relative to this location.
    basename: process.env.REACT_APP_BASENAME,
  }
);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
