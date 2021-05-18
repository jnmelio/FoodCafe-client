import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

      <React.Fragment>
      
        <CssBaseline />
        <App />
      </React.Fragment>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
