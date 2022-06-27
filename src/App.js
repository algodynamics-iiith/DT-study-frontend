import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import CodeEditor from "./pages/CodeEditor";
import CodeDebugger from "./pages/CodeDebugger";
import QuizPage from "./pages/Quiz";
import { useEffect } from "react";
import client from "./pages/api";

const App = ({ element }) => {
  useEffect(() => {
    if (localStorage.getItem("userId") != null) {
      getAlgorithm(localStorage.getItem("userId"));
    } else {
      if (window.location.pathname.slice(18) !== "/home") {
        //Add swal and absolute address
        window.location.href = "./home";
      }
    }
  }, []);

  const getAlgorithm = async (input) => {
    let final = "/getAlgorithm/" + input;
    await client
      .get(final)
      .then((response) => {
        let desiredPath = JSON.parse(localStorage.getItem("path"))[
          parseInt(localStorage.getItem("current"))
        ];
        if (window.location.pathname.slice(18) !== desiredPath) {
          window.location.href = "." + desiredPath;
        }
      })
      .catch((error) => {
        if (window.location.pathname.slice(18) !== "/home") {
          //Add swal and absolute address
          window.location.href = "./home";
        }
      });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="bg-gray-800 flex justify-between py-4 px-2 text-md text-gray-100 font-bold">
        <h1 className="text-xl">Algodynamics Driving Test Study</h1>
      </div>
      {/* <div className="flex-grow flex overflow-hidden"> */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/code" element={<CodeEditor />} />
          <Route path="/debug" element={<CodeDebugger />} />
          <Route path="/quiz" element={<QuizPage />} />
          {/* <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
      {/* </div> */}
      <div id="footer" className="flex bg-gray-500 justify-center">
        <h3>
          Copyright © 2020-2022,
          <a href="https://www.algodynamics.io" className="text-blue-800">
            algodynamics.io
          </a>
        </h3>
      </div>
    </div>
  );
};

export default App;
