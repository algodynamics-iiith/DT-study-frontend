import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import Homepage from "./pages/Homepage";
import CodeEditor from "./pages/CodeEditor";
import CodeDebugger from "./pages/CodeDebugger";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div style={{ background: "blue", color: "white" }}>
      I am header
      <br />
    </div>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/code" element={<CodeEditor />} />
        <Route path="/debug" element={<CodeDebugger />} />
        {/* <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
      </Routes>
    </BrowserRouter>
    <div style={{ background: "blue", color: "white" }}>
      I am footer
      <br />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
